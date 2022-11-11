import { MyRoute } from '../express-helpers.js';
import DB from '../../db/db.js';

export const directoriesRoutes: MyRoute[] = [
  {
    method: 'get',
    path: '/directories',
    handler: async (req, res, next) => {
      res.json(DB.getCollection('directories').find());
    },
  },
  {
    method: 'get',
    path: '/directory/:id',
    handler: async (req, res, next) => {
      res.send(req.query.id);
    },
  },
  {
    method: 'put',
    path: '/directory',
    handler: async (req, res, next) => {
      DB.getCollection('directories').insert({
        path: req.body.path,
      });
      res.send(req.body);
    },
  },
];
