import { MyRoute } from '../express-helpers.js';
import { DB } from '../../db/db.js';

export const statsRoutes: MyRoute[] = [
  {
    method: 'get',
    path: '/collections',
    handler: async (req, res, next) => {
      res.json(DB.listCollections());
    },
  },
];
