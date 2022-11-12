import { MyRoute } from '../express-helpers.js';
import { fileDB } from '../../db/db.js';

export const filesRoutes: MyRoute[] = [
  {
    method: 'get',
    path: '/files',
    handler: async (req, res) => {
      res.json(fileDB().find());
    },
  },
];
