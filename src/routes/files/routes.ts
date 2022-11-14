import { addTag, findFile, listFiles, markSeen, rateFile, removeTag } from './fileFns.js';
import { Express } from 'express';
import logger from '../../utils/log.js';
import { validId, validRating, validTag } from '../../utils/req-validators.js';

export default (router: Express) => {
  router.get('/files', async (req, res) => {
    try {
      res.json(await listFiles());
    } catch (e) {
      logger.error('Error: %O', e);
      res.sendStatus(500);
    }
  });

  router.get('/file/:id', validId, async (req, res) => {
    try {
      res.json(await findFile(req.params.id));
    } catch (e) {
      logger.error('Error: %O', e);
      res.sendStatus(500);
    }
  });

  router.post('/file/:id/rate', validId, validRating, async (req, res) => {
    try {
      await rateFile(req.params.id, req.body.rating);
      res.sendStatus(204);
    } catch (e) {
      logger.error('Error: %O', e);
      res.sendStatus(500);
    }
  });

  router.post('/file/:id/seen', validId, async (req, res) => {
    try {
      await markSeen(req.params.id);
      res.sendStatus(204);
    } catch (e) {
      logger.error('Error: %O', e);
      res.sendStatus(500);
    }
  });

  router.post('/file/:id/tag', validId, validTag, async (req, res) => {
    try {
      await addTag(req.params.id, req.body.tag as string);
      res.sendStatus(204);
    } catch (e) {
      logger.error('Error: %O', e);
      res.sendStatus(500);
    }
  });

  router.delete('/file/:id/tag', validId, validTag, async (req, res) => {
    try {
      await removeTag(req.params.id, req.body.tag as string);
      res.sendStatus(204);
    } catch (e) {
      logger.error('Error: %O', e);
      res.sendStatus(500);
    }
  });
};
