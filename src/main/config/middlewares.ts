import { Express, json, Request, Response, NextFunction } from "express";

export default (app: Express): void => {
  app.use(json());
  app.use((request: Request, response: Response, next: NextFunction) => {
    response.set("access-control-allowed-origin", "*");
    response.set("access-control-allowed-headers", "*");
    response.set("access-control-allowed-methods", "*");
    next();
  });
  app.use((request: Request, response: Response, next: NextFunction) => {
    response.type("json");
    next();
  });
};
