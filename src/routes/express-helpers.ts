import { Router, Request, Response, NextFunction } from 'express';

type Handler = (req: Request, res: Response, next: NextFunction) => any;

export interface MyRoute {
  method: 'get' | 'post' | 'put' | 'delete';
  path: string;
  middleware?: Handler[];
  handler: Handler | Handler[];
}

export const applyRoutes = (router: Router, routes: MyRoute[]) => {
  for (const route of routes) {
    const { method, path, handler } = route;

    router[method](path, handler);
  }
};
