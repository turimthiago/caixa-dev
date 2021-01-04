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
import { RouteHelper } from "../helpers/route-helper";
import { autenticationMiddleware } from "../middlewares/aut";

export default (router: Router): void => {
  router.post(
    "/movimentacoes",
    RouteHelper.buildMiddleware(autenticationMiddleware),
    RouteHelper.buildRoute(makeRegistrarMovimentacao())
  );
  router.get(
    "/movimentacoes",
    RouteHelper.buildMiddleware(autenticationMiddleware),
    RouteHelper.buildRoute(makebuscarMovimentacoes())
  );
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
