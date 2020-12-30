import { Router } from "express";
import { DbRegistrarUsuario } from "../../data/db/usuario/db-registrar-usuario";
import { UsuarioMongoRepository } from "../../infra/usuario-repository/usuario-repository";
import { RegistrarUsuarioController } from "../../presentation/controllers/registrar-usuario-controller";
import { Controller } from "../../presentation/protocols/controller";

export default (router: Router): void => {
  router.post("/signup", buildRoute(makeSignUpController()));
};

const buildRoute = (controller) => {
  return (req, res) => {
    return controller.handle(req, res);
  };
};

const makeSignUpController = (): Controller => {
  console.log("makeSignUpController");
  const usuarioMongoRepository = new UsuarioMongoRepository();
  const dbRegistrarUsuario = new DbRegistrarUsuario(usuarioMongoRepository);
  const controller = new RegistrarUsuarioController(dbRegistrarUsuario);

  return controller;
};
