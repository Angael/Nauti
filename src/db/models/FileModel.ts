import { model, Schema, SchemaTypes } from 'mongoose';
import { IFile } from '../../models/models.js';

const schema = new Schema<IFile>({
  path: { type: String, required: true },
  dirId: { type: SchemaTypes.ObjectId, required: true },
  data: {
    duration: Number,
    bitrate: Number,
    width: Number,
    height: Number,
  },
  preview: {
    xs: String,
    md: String,
  },
  lastSeen: Date,
  size: Number,
  tags: [String],
  rating: Number,
});
schema.index({ path: 1, dirId: 1 }, { unique: true });

const FileModel = model<IFile>('File', schema);

export default FileModel;
