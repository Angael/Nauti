import { findFile, listFiles, rateFile } from './fileFns.js';
import { Express } from 'express';
import { body, param } from 'express-validator';

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
    body('rating').isNumeric().isLength({ min: 0, max: 9 }),
    async (req, res) => {
      await rateFile(req.params.id, req.body.rating);

      res.json(await findFile(req.params.id));
    },
  );
};
