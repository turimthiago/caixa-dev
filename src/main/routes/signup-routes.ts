import { Router } from "express";
import { DbRegistrarUsuario, DdAutenticacao } from "../../data/usecases";
import { BcryptAdapter, JwtCrypter } from "../../infra/criptografia";
import { UsuarioMongoRepository } from "../../infra/db/mongodb";
import {
  LoginController,
  SignUpController,
} from "../../presentation/controllers";
import { Controller } from "../../presentation/protocols";
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
