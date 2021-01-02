import { Router } from "express";
import { DbRegistrarUsuario } from "../../data/db/usuario/db-registrar-usuario";
import { BcryptAdapter } from "../../infra/criptografia/bcrypt-adapter";
import { UsuarioMongoRepository } from "../../infra/usuario-repository/usuario-repository";
import { SignUpController } from "../../presentation/controllers/signup-controller";
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
  const usuarioMongoRepository = new UsuarioMongoRepository();
  const hasher = new BcryptAdapter(12);
  const dbRegistrarUsuario = new DbRegistrarUsuario(
    usuarioMongoRepository,
    hasher
  );
  const controller = new SignUpController(dbRegistrarUsuario);

  return controller;
};
