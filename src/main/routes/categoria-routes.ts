import { Router } from "express";
import { DbRegistrarCategoria } from "../../data/usecases";
import { CategoriaMongoRepository } from "../../infra/db/mongodb";
import { RegistrarCategoriController } from "../../presentation/controllers";
import { Controller } from "../../presentation/protocols";

export default (router: Router): void => {
  router.post("/categorias", buildRoute(makeRegistrarCategoriaController()));
};

const buildRoute = (controller) => {
  return (req, res) => {
    return controller.handle(req, res);
  };
};

const makeRegistrarCategoriaController = (): Controller => {
  const dbRegistrarCategoriaRepository = new CategoriaMongoRepository();
  const dbRegistrarCategoria = new DbRegistrarCategoria(
    dbRegistrarCategoriaRepository
  );
  const controller = new RegistrarCategoriController(dbRegistrarCategoria);

  return controller;
};
