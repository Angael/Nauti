import loki from 'lokijs';
import { DBS, IDirectory, IFile } from '../models/models.js';
import log from '../utils/log.js';

const onLoad = (err) => {
  if (err) {
    console.error('Autoload error', err);
  } else {
    log.debug('Loki db loaded ');
  }
};

const onSave = (err) => {
  if (err) {
    console.error('Autoload error', err);
  } else {
    log.debug('Loki db saved');
  }
};

export let DB: loki;
export const LoadDB = new Promise<void>((resolve, reject) => {
  DB = new loki('nauti.db', {
    verbose: false,
    autoload: true,
    autoloadCallback: onLoad,
    autosave: true,
    autosaveCallback: onSave,
    autosaveInterval: 1000,
    // persistenceMethod: 'fs',
    throttledSaves: false,
  });

  DB.addCollection<IDirectory>(DBS.directory, {
    indices: ['path'],
    unique: ['path'],
  });

  DB.addCollection<IFile>(DBS.files, {
    indices: ['path'],
    unique: ['path', 'dirId'],
  });

  DB.loadDatabase({}, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  });
});

export const directoryDB = () => DB.getCollection<IDirectory>(DBS.directory);
export const fileDB = () => DB.getCollection<IFile>(DBS.files);
