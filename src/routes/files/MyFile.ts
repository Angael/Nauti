import { FileData, IFile, Preview } from '../../models/models.js';
import { join } from 'path';
import { directoryDB } from '../../db/db.js';

export class MyFile implements IFile {
  path: string;
  dirId: LokiObj['$loki'];
  size?: number;
  lastSeen?: number; // Date.now()
  preview?: Preview;
  data?: FileData;
  tags?: string[];

  get fullPath() {
    const dirPath = directoryDB().findOne({ $loki: this.dirId }).path;
    return join(dirPath, this.path);
  }

  constructor(dirId: LokiObj, path: string) {
    this.dirId = dirId.$loki;
    this.path = path;
  }

  //
  // async scanPath(): Promise<IFile[]> {
  //   let files: string[];
  //
  //   try {
  //     files = await fg('*', {
  //       onlyFiles: true,
  //       markDirectories: false,
  //       deep: 1,
  //       cwd: this.path,
  //     });
  //
  //     files = files.map((name) => join(this.path, name));
  //   } catch (e) {
  //     console.error('failed to scanPath', this.path);
  //   }
  //
  //   console.log(files);
  //   return [];
  // }
}
