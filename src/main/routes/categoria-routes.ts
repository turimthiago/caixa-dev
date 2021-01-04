import { Router } from "express";
import { DbRegistrarCategoria } from "../../data/usecases";
import { CategoriaMongoRepository } from "../../infra/db/mongodb";
import { RegistrarCategoriController } from "../../presentation/controllers";
import { Controller } from "../../presentation/protocols";
import { RouteHelper } from "../helpers/route-helper";
import { autenticationMiddleware } from "../middlewares/aut";

export default (router: Router): void => {
  router.post(
    "/categorias",
    RouteHelper.buildMiddleware(autenticationMiddleware),
    RouteHelper.buildRoute(makeRegistrarCategoriaController())
  );
};

const makeRegistrarCategoriaController = (): Controller => {
  const dbRegistrarCategoriaRepository = new CategoriaMongoRepository();
  const dbRegistrarCategoria = new DbRegistrarCategoria(
    dbRegistrarCategoriaRepository
  );
  const controller = new RegistrarCategoriController(dbRegistrarCategoria);

  return controller;
};
