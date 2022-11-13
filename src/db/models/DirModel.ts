import { Schema, model } from 'mongoose';
import { IDirectory } from '../../models/models.js';
// import log from '../../utils/log.js';

const schema = new Schema<IDirectory>({
  path: { type: String, required: true, unique: true },
});

const DirModel = model<IDirectory>('Dir', schema);

export default DirModel;
