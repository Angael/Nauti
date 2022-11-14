import { MyRoute } from '../express-helpers.js';
import { findDir, insertDir, listDirs } from './dirFns.js';
import logger from '../../utils/log.js';

export const directoriesRoutes: MyRoute[] = [
  {
    method: 'get',
    path: '/directories',
    handler: async (req, res) => {
      res.json(await listDirs());
    },
  },
  {
    method: 'put',
    path: '/directory',
    handler: async (req, res) => {
      if (typeof req.body.path !== 'string') {
        res.sendStatus(400);
        return;
      }

      try {
        await insertDir(req.body.path);
        res.sendStatus(204);
      } catch (e) {
        logger.error('Error: %O', e);
        res.sendStatus(500);
      }
    },
  },
  {
    method: 'get',
    path: '/directory/:id',
    handler: async (req, res) => {
      const id = req.params.id;
      if (typeof id !== 'string') {
        res.sendStatus(400);
        return;
      }

      res.json(await findDir(id));
    },
  },
];
