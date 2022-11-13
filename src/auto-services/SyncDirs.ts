import fs from 'fs-extra';
import PQueue from 'p-queue';
import log from '../utils/log.js';
import DirModel from '../db/models/DirModel.js';
import { IDirectory } from '../models/models.js';
import { getFilesInDir } from '../routes/directories/dirFns.js';
import { Document } from 'mongoose';
import { join } from 'path';
import FileModel from '../db/models/FileModel.js';

class SyncDirs {
  dirQueue = new PQueue({
    concurrency: 1,
  });

  newFileQueue = new PQueue({
    concurrency: 1,
  });

  checkOldFilesQueue = new PQueue({
    concurrency: 1,
  });

  // scheduler = new Scheduler(this.queueUpdates, this.delay, {
  //   concurrency: this.concurrency,
  //   maxPending: this.maxPending,
  //   startImmediate: true,
  // });

  // scheduler: Scheduler;
  // delay = 4000;
  // concurrency = 1;
  // maxPending = 1;

  constructor() {
    fs.mkdir('./temp/preview/xs/', { recursive: true });
  }

  start() {
    this.queueUpdates();
  }

  async queueUpdates() {
    log.debug(`[queueUpdates]`);
    const dirs: IDirectory[] = await DirModel.find();
    dirs.forEach((dir) => this.queueDirUpdate(dir.path));
    log.debug(`[queueUpdates] ${dirs.length} dirs`);
  }

  async queueDirUpdate(path: string) {
    const dir = await DirModel.findOne({ path });

    if (dir) {
      this.dirQueue.add(() => this.updateFilesInDir(path, dir));
    } else {
      log.error('[queueDirUpdate] Dir doesnt exist:', path);
      throw new Error('dir not found');
    }
  }

  async updateFilesInDir(path: string, dir: IDirectory & Document) {
    log.debug('[updateFilesInDir] ', path);

    const filesInDir = await getFilesInDir(path);

    filesInDir.forEach((filePath) => {
      this.newFileQueue.add(() => this.updateDir(filePath, dir));
    });
    // const Dir = new Directory(path).get();
    // log.info('[SyncDirs] Updating scannedFiles for ', path);
    //
    // const scannedFiles = await new Directory(path).scanPath();
    // log.info(`[SyncDirs] found ${scannedFiles.length} files`);
    //
    // const newFiles = scannedFiles.filter(
    //   (file) => !fileDB().findOne({ dirId: Dir.$loki, path: file.path }),
    // );
    // log.info(`[SyncDirs] ${newFiles.length} newFiles`);
    //
    // const removedFiles = fileDB().find({
    //   dirId: Dir.$loki,
    //   path: { $nin: scannedFiles.map((f) => f.path) },
    // });
    // log.info(`[SyncDirs] ${removedFiles.length} removedFiles`);
    //
    // newFiles.forEach((file) => {
    //   try {
    //     fileDB().insert(file);
    //   } catch (e) {
    //     log.trace(e.message);
    //   }
    // });
    //
    // removedFiles.forEach((file) => {
    //   try {
    //     fileDB().remove(file);
    //   } catch (e) {
    //     log.trace(e.message);
    //   }
    // });
    //
    // DB.saveDatabase();
  }

  async updateDir(path: string, dir: IDirectory & Document) {
    this.newFileQueue.add(async () => {
      log.debug(join(dir.path, path));

      const exists = await FileModel.exists({
        path,
        dirId: dir._id,
      });

      log.debug(`exists: ${exists}`);
      if (!exists) {
        await FileModel.create({
          path,
          dirId: dir._id,
        });
      }
    });
  }
}

export default new SyncDirs();
