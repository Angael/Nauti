import express from 'express';
import loadJSON from '../utils/loadJSON.js';
import { applyRoutes } from './express-helpers.js';
import routes from './routes.js';
const { version } = loadJSON('../../package.json');

const router = express();
router.use(express.json());
router.get('/', (req, res) => res.json(version));

applyRoutes(router, routes);

export default router;
