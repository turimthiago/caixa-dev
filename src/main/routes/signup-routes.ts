import { Router } from "express";
import { DdAutenticacao } from "../../data/db/autenticacao/db-autenticacao";
import { DbRegistrarUsuario } from "../../data/db/usuario/db-registrar-usuario";
import { BcryptAdapter } from "../../infra/criptografia/bcrypt-adapter";
import { JwtCrypter } from "../../infra/criptografia/jwt-crypter";
import { UsuarioMongoRepository } from "../../infra/usuario-repository/usuario-repository";
import { LoginController } from "../../presentation/controllers/login-controller";
import { SignUpController } from "../../presentation/controllers/signup-controller";
import { Controller } from "../../presentation/protocols/controller";
import env from "../config/env";

export default (router: Router): void => {
  router.post("/signup", buildRoute(makeSignUpController()));
  router.post("/login", buildRoute(makeLoginController()));
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

const makeLoginController = (): Controller => {
  const usuarioMongoRepository = new UsuarioMongoRepository();
  const hasher = new BcryptAdapter(12);
  const crypter = new JwtCrypter(env.jwtSecret);
  const dbAutenticacao = new DdAutenticacao(
    usuarioMongoRepository,
    hasher,
    crypter
  );
  const controller = new LoginController(dbAutenticacao);

  return controller;
};
