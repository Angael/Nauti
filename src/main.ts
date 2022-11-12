import MyRouter from './routes/MyRouter.js';
import SynchFilesInDirs from './auto-services/SyncDirs.js';
import { LoadDB } from './db/db.js';

await LoadDB;

MyRouter.start();
SynchFilesInDirs.start();
