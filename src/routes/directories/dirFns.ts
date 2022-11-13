import fg from 'fast-glob';
import DirModel from '../../db/models/DirModel.js';
import { Document } from 'mongoose';
import { IDirectory } from '../../models/models.js';
import SyncDirs from '../../auto-services/SyncDirs.js';

export async function insertDir(path: string): Promise<Document> {
  if (await DirModel.exists({ path })) {
    throw new Error('Dir already created');
  }

  const document = await DirModel.create({
    path,
  });

  SyncDirs.queueDirUpdate(path);

  return document;
}

export async function listDirs(): Promise<IDirectory[]> {
  return DirModel.find({});
}

export async function findDir(id: string): Promise<IDirectory> {
  return DirModel.findById(id);
}

export async function getFilesInDir(path: string): Promise<string[]> {
  let files: string[];

  try {
    files = await fg('*', {
      onlyFiles: true,
      markDirectories: false,
      deep: 1,
      cwd: path,
    });
  } catch (e) {
    console.error('failed to scanPath', path, e);
  }

  return files;
}
