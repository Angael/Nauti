import { MyRoute } from '../express-helpers.js';
import { directoryDB } from '../../db/db.js';
import { nanoid } from 'nanoid';
import { Directory } from './Directory.js';

export const directoriesRoutes: MyRoute[] = [
  {
    method: 'get',
    path: '/directories',
    handler: async (req, res, next) => {
      res.json(directoryDB.find());
    },
  },
  {
    method: 'put',
    path: '/directory',
    handler: async (req, res, next) => {
      const newDic = new Directory(nanoid(), req.body.path);

      if (newDic.exists()) {
        res.sendStatus(409);
        return;
      }

      newDic.scanPath().then((files) => {
        console.log('files', files);
      });

      try {
        directoryDB.insert(newDic);
        res.send(req.body);
      } catch (e) {
        res.sendStatus(500);
        return;
      }
    },
  },
];
