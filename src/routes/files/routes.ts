import { findFile, listFiles } from './fileFns.js';
import { Express } from 'express';
import { param, body } from 'express-validator';
import FileModel from '../../db/models/FileModel.js';

export default (router: Express) => {
  router.get('/files', async (req, res) => {
    res.json(await listFiles());
  });

  router.get('/file/:id', async (req, res) => {
    const id = req.params.id;
    if (typeof id !== 'string') {
      res.sendStatus(400);
      return;
    }

    res.json(await findFile(id));
  });

  router.post(
    '/file/:id/rate',
    param('id').isString(),
    body('rating').isNumeric(),
    async (req, res) => {
      const { id } = req.params;
      const { rating } = req.body;
      console.log(id, rating);

      await FileModel.findOneAndUpdate(
        { _id: id },
        {
          rating,
        },
      );

      res.json(await findFile(id));
    },
  );
};
