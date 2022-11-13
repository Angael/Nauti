import { MyRoute } from '../express-helpers.js';
import { findFile, listFiles } from './fileFns.js';

export const filesRoutes: MyRoute[] = [
  {
    method: 'get',
    path: '/files',
    handler: async (req, res) => {
      res.json(await listFiles());
    },
  },
  {
    method: 'get',
    path: '/file/:id',
    handler: async (req, res) => {
      const id = req.params.id;
      if (typeof id !== 'string') {
        res.sendStatus(400);
        return;
      }

      res.json(await findFile(id));
    },
  },
  {
    method: 'post',
    path: '/file/:id/rate',
    handler: async (req, res) => {
      // WIP
      const { id, rating } = req.params;
      if (typeof id !== 'string' && typeof id !== 'number') {
        res.sendStatus(400);
        return;
      }

      console.log(id, rating);

      res.json(await findFile(id));
    },
  },
];
