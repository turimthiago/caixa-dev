import { Controller, Middleware } from "../../presentation/protocols";

export const RouteHelper = {
  buildRoute(controller: Controller) {
    return (req, res) => {
      return controller.handle(req, res);
    };
  },
  buildMiddleware(middleware: Middleware) {
    return (req, res, next) => {
      return middleware.handle(req, res, next);
    };
  },
};
