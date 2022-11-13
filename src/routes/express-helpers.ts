import { Router, Request, Response, NextFunction } from 'express';
import log from '../utils/log.js';

type Handler = (req: Request, res: Response, next: NextFunction) => any;

export interface MyRoute {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  middleware?: Handler[];
  handler: Handler;
}

export const applyRoutes = (router: Router, routes: MyRoute[]) => {
  for (const route of routes) {
    const { method, path, handler } = route;

    const errorProtectedHandler = (req, res, next) => {
      try {
        return handler(req, res, next);
      } catch (e) {
        log.error('Error in handler', e);
      }
    };

    router[method](path, errorProtectedHandler);
  }
};
