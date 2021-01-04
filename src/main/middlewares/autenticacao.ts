import { JwtCrypter } from "../../infra/criptografia/jwt-crypter";
import { UsuarioMongoRepository } from "../../infra/db/mongodb/usuario-repository";
import { AutenticationMiddleware } from "../../presentation/middlewares/autentication-middleware";
import { Middleware } from "../../presentation/protocols/middleware";
import env from "../config/env";

export const buildAutenticationMiddleware = (): Middleware => {
  const jwtAdapter = new JwtCrypter(env.jwtSecret);
  const usuarioMongoRepository = new UsuarioMongoRepository();
  return new AutenticationMiddleware(usuarioMongoRepository, jwtAdapter);
};
