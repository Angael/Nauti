import { FileData, IFile, Preview } from '../../models/models.js';
// import fg from 'fast-glob';
// import { join } from 'path';

export class MyFile implements IFile {
  id: string;
  path: string;
  size: number;
  processed: 'no' | 'v1';
  addedISO: string; // iso date
  lastSeenISO: string; // iso date
  preview?: Preview;
  data?: FileData;
  tags: string[];

  // constructor(id, path) {
  //   this.id = id;
  //   this.path = path;
  // }
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
