import { TipoMovimentacao } from "../../../src/domain/models";

export const fakeMovimentacoes = [
  {
    id: "any_id",
    data: new Date(),
    categoria: {
      id: "any_categoria",
      nome: "any_name",
    },
    tipo: TipoMovimentacao.ENTRADA,
    valor: 100,
    descricao: "any_descricao",
  },
  {
    id: "any_id",
    data: new Date(),
    categoria: {
      id: "any_categoria",
      nome: "any_name",
    },
    tipo: TipoMovimentacao.SAIDA,
    valor: 0.1,
    descricao: "any_descricao",
  },
];
