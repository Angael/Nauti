import { IFile } from '../../models/models.js';
import FileModel from '../../db/models/FileModel.js';

export async function listFiles(): Promise<IFile[]> {
  return FileModel.find({});
}

export async function findFile(id: string): Promise<IFile> {
  return FileModel.findById(id);
}

export async function rateFile(id: string, rating: number): Promise<any> {
  return FileModel.updateOne({ _id: id }, { rating });
}

export async function markSeen(id: string): Promise<any> {
  return FileModel.updateOne({ _id: id }, { lastSeen: new Date() });
}

export async function addTag(id: string, tag: string): Promise<any> {
  return FileModel.updateOne({ _id: id }, { $push: { tags: tag } });
}

export async function removeTag(id: string, tag: string): Promise<any> {
  return FileModel.updateOne({ _id: id }, { $pull: { tags: tag } });
}
