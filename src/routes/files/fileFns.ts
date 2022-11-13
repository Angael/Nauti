import { IFile } from '../../models/models.js';
import FileModel from '../../db/models/FileModel.js';

export async function listFiles(): Promise<IFile[]> {
  return FileModel.find({});
}

export async function findFile(id: string): Promise<IFile> {
  return FileModel.findById(id);
}
