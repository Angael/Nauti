import express, { Express } from 'express';
import loadJSON from '../utils/loadJSON.js';
import { applyRoutes, MyRoute } from './express-helpers.js';
import { directoriesRoutes } from './directories/routes.js';
import { filesRoutes } from './files/routes.js';
import { statsRoutes } from './stats/routes.js';

const { version } = loadJSON('../../package.json');

const routes: MyRoute[] = [directoriesRoutes, filesRoutes, statsRoutes].flat();

class MyRouter {
  router: Express;
  port = process.env.PORT ?? 4000;

  constructor(_routes: MyRoute[]) {
    this.router = express();
    this.router.use(express.json());
    this.router.get('/', (req, res) => res.json(version));

    applyRoutes(this.router, _routes);
  }

  start() {
    this.router.listen(this.port, () =>
      console.log(`http://localhost:${this.port}/`),
    );
  }
}

export default new MyRouter(routes);
