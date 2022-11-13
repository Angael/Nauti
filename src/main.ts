import './db/db.js';
import MyRouter from './routes/MyRouter.js';
import SynchFilesInDirs from './auto-services/SyncDirs.js';

MyRouter.start();
SynchFilesInDirs.start();
