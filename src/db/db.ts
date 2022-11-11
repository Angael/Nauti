import loki from 'lokijs';
import { DBS, IDirectory } from '../models/models.js';

const onLoad = (err) => {
  if (err) {
    console.error('Autoload error', err);
  }
};

export const DB = new loki('nauti.db', {
  autoload: true,
  autoloadCallback: onLoad,
  autosave: true,
  autosaveInterval: 4000,
});

export const directoryDB = DB.addCollection<IDirectory>(DBS.directory, {
  indices: ['path'],
  unique: ['path'],
});

export const fileDB = DB.addCollection(DBS.files, {
  indices: ['path'],
  unique: ['path'],
});
