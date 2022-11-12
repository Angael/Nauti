import { Scheduler } from 'modern-async';
import fs from 'fs-extra';
import PQueue from 'p-queue';
import log from '../utils/log.js';
import { DB, directoryDB, fileDB } from '../db/db.js';
import { IDirectory } from '../models/models.js';
import { Directory } from '../routes/directories/Directory.js';

class SyncDirs {
  queue: PQueue;

  scheduler: Scheduler;
  delay = 4000;
  concurrency = 1;
  maxPending = 1;

  constructor() {
    fs.mkdir('./temp/preview/xs/', { recursive: true });

    this.scheduler = new Scheduler(this.findTasks, this.delay, {
      concurrency: this.concurrency,
      maxPending: this.maxPending,
      startImmediate: true,
    });

    this.queue = new PQueue({
      concurrency: 1,
    });
  }

  start() {
    // log.info('[SyncDirs] start');
    // this.scheduler.start();
    this.findTasks();
  }

  private async findTasks() {
    const dirs = directoryDB().find();
    log.trace(`[SyncDirs] found ${dirs.length} dirs`);
    dirs.forEach((dir) => {
      this.queue.add(() => this.updateFilesInDir(dir));
    });
  }

  async updateFilesInDir({ path }: IDirectory) {
    const Dir = new Directory(path).get();
    log.info('[SyncDirs] Updating scannedFiles for ', path);

    const scannedFiles = await new Directory(path).scanPath();
    log.info(`[SyncDirs] found ${scannedFiles.length} files`);

    const newFiles = scannedFiles.filter(
      (file) => !fileDB().findOne({ dirId: Dir.$loki, path: file.path }),
    );
    log.info(`[SyncDirs] ${newFiles.length} newFiles`);

    const removedFiles = fileDB().find({
      dirId: Dir.$loki,
      path: { $nin: scannedFiles.map((f) => f.path) },
    });
    log.info(`[SyncDirs] ${removedFiles.length} removedFiles`);

    newFiles.forEach((file) => {
      try {
        fileDB().insert(file);
      } catch (e) {
        log.trace(e.message);
      }
    });

    removedFiles.forEach((file) => {
      try {
        fileDB().remove(file);
      } catch (e) {
        log.trace(e.message);
      }
    });

    DB.saveDatabase();
  }
}

export default new SyncDirs();
