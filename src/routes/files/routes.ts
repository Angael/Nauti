import { MyRoute } from '../express-helpers.js';
import { fileDB } from '../../db/db.js';
import { nanoid } from 'nanoid';
import { IDirectory } from '../../models/models.js';

export const filesRoutes: MyRoute[] = [
  {
    method: 'get',
    path: '/files',
    handler: async (req, res, next) => {
      res.json(fileDB.find());
    },
  },
  {
    method: 'put',
    path: '/directory',
    handler: async (req, res, next) => {
      const newDic: IDirectory = {
        id: nanoid(),
        path: req.body.path,
      };

      fileDB.insert(newDic);
      res.send(req.body);
    },
  },
];
