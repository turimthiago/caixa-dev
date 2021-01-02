import { Router } from "express";
import { DbRegistrarCategoria } from "../../data/db/categoria/db-registrar-categoria";
import { CategoriaMongoRepository } from "../../infra/categoria-repository/categoria-repository";
import { RegistrarCategoriController } from "../../presentation/controllers/registrar-categoria-controller";
import { Controller } from "../../presentation/protocols/controller";

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
