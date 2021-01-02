import { Router } from "express";
import { DbRegistrarMovimentacao } from "../../data/db/caixa/db-registrar-movimentacao";
import { CategoriaMongoRepository } from "../../infra/categoria-repository/categoria-repository";
import { MovimentacaoMongoRepository } from "../../infra/movimentacao-caixa-repository/movimentacao-caixa-repository";
import { UsuarioMongoRepository } from "../../infra/usuario-repository/usuario-repository";
import { RegistrarMovimentacaoController } from "../../presentation/controllers/registrar-movimentacao-controller";
import { Controller } from "../../presentation/protocols/controller";

export default (router: Router): void => {
  router.post("/movimentacoes", buildRoute(makeRegistrarMovimentacao()));
};

const buildRoute = (controller) => {
  return (req, res) => {
    return controller.handle(req, res);
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
