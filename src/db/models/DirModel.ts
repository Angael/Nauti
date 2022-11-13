import { Schema, model, now } from 'mongoose';
import { IDirectory } from '../../models/models.js';
// import log from '../../utils/log.js';

const schema = new Schema<IDirectory>({
  path: { type: String, required: true, unique: true },
  lastUpdated: { type: Date, required: true, default: now },
});

const DirModel = model<IDirectory>('Dir', schema);

export default DirModel;
