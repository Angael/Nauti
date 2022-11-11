import express from 'express';
import DB from '../db/db.js';
import loadJSON from '../utils/loadJSON.js';

const { version } = loadJSON('../../package.json');

const router = express();
const PORT = process.env.PORT || 4000;

router.get('/', (req, res, next) => {
  res.json(version);
});

router.get('/directories', (req, res) => {
  res.json(DB.collections.map((d) => d.name));
});

router.put('/directory', (req, res, next) => {
  res.send('papa');
});

router.listen(PORT, () => console.log(`http://localhost:${PORT}/`));

export default router;
