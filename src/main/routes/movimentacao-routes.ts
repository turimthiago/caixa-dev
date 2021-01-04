import { Router } from "express";
import {
  DbBuscarResumoCarteira,
  DbRegistrarMovimentacao,
} from "../../data/usecases";
import {
  CategoriaMongoRepository,
  MovimentacaoMongoRepository,
  UsuarioMongoRepository,
} from "../../infra/db/mongodb";
import {
  BuscarMovimentacaoDataController,
  RegistrarMovimentacaoController,
} from "../../presentation/controllers";
import { Controller } from "../../presentation/protocols";
import { autenticationMiddleware } from "../middlewares/aut";

export default (router: Router): void => {
  router.post(
    "/movimentacoes",
    buildMiddleware(autenticationMiddleware),
    buildRoute(makeRegistrarMovimentacao())
  );
  router.get(
    "/movimentacoes",
    buildMiddleware(autenticationMiddleware),
    buildRoute(makebuscarMovimentacoes())
  );
};

const buildRoute = (controller) => {
  return (req, res) => {
    return controller.handle(req, res);
  };
};

const buildMiddleware = (middleware) => {
  return (req, res, next) => {
    return middleware.handle(req, res, next);
  };
};

const makeRegistrarMovimentacao = (): Controller => {
  const categoriaMongoRepository = new CategoriaMongoRepository();
  const usuarioMongoRepository = new UsuarioMongoRepository();
  const movimentacaoMongoRepository = new MovimentacaoMongoRepository();
  const dbRegistrarMovimentacao = new DbRegistrarMovimentacao(
    movimentacaoMongoRepository,
    usuarioMongoRepository,
    categoriaMongoRepository
  );
  const controller = new RegistrarMovimentacaoController(
    dbRegistrarMovimentacao
  );

  return controller;
};

const makebuscarMovimentacoes = (): Controller => {
  const usuarioMongoRepository = new UsuarioMongoRepository();
  const movimentacaoMongoRepository = new MovimentacaoMongoRepository();
  const buscarMovimentacaoDiaResumo = new DbBuscarResumoCarteira(
    usuarioMongoRepository,
    movimentacaoMongoRepository
  );
  const controller = new BuscarMovimentacaoDataController(
    buscarMovimentacaoDiaResumo
  );

  return controller;
};
