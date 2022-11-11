import { directoriesRoutes } from './directories/routes.js';
import { MyRoute } from './express-helpers.js';

const routes: MyRoute[] = [...directoriesRoutes];

export default routes;
