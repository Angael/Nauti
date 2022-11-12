import { MyRoute } from '../express-helpers.js';
import { directoryDB } from '../../db/db.js';
import { Directory } from './Directory.js';
import SynchFilesInDirs from '../../auto-services/SyncDirs.js';

export const directoriesRoutes: MyRoute[] = [
  {
    method: 'get',
    path: '/directories',
    handler: async (req, res) => {
      res.json(directoryDB().find());
    },
  },
  {
    method: 'put',
    path: '/directory',
    handler: async (req, res) => {
      const newDic = new Directory(req.body.path);

      if (newDic.exists()) {
        res.sendStatus(409);
        return;
      }

      try {
        directoryDB().insert(newDic);
        await SynchFilesInDirs.updateFilesInDir(newDic);
        res.send(req.body);
      } catch (e) {
        res.sendStatus(500);
      }
    },
  },
  {
    method: 'get',
    path: '/directory/:lokiId',
    handler: async (req, res) => {
      if (!req.params.lokiId) {
        res.sendStatus(400);
        return;
      }

      const lokiId = Number(req.params.lokiId);

      res.json(directoryDB().findOne({ $loki: lokiId }));
    },
  },
];
