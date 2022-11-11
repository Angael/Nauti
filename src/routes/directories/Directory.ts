import { IDirectory, IFile } from '../../models/models.js';
import fg from 'fast-glob';
import { join } from 'path';
import { directoryDB } from '../../db/db.js';

export class Directory implements IDirectory {
  id: string;
  path: string;

  constructor(id, path) {
    this.id = id;
    this.path = path;
  }

  exists(): boolean {
    const searchResult = directoryDB.find({
      path: this.path,
    });

    return !!searchResult;
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

      files = files.map((name) => join(this.path, name));
    } catch (e) {
      console.error('failed to scanPath', this.path);
    }

    console.log(files);
    return [];
  }
}
