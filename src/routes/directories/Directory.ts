import { IDirectory, IFile } from '../../models/models.js';
import fg from 'fast-glob';
import { directoryDB } from '../../db/db.js';
import { MyFile } from '../files/MyFile.js';

export class Directory implements IDirectory {
  path: string;

  constructor(path) {
    this.path = path;
  }

  get(): IDirectory & LokiObj {
    return directoryDB().findOne({
      path: this.path,
    });
  }

  exists(): boolean {
    const searchResult = directoryDB().find({
      path: this.path,
    });

    return searchResult.length > 0;
  }

  async scanPath(): Promise<IFile[]> {
    let files: string[];

    try {
      files = await fg('*', {
        onlyFiles: true,
        markDirectories: false,
        deep: 1,
        cwd: this.path,
      });
    } catch (e) {
      console.error('failed to scanPath', this.path);
    }

    const dir = this.get();

    return files.map((path) => new MyFile(dir, path));
  }
}
