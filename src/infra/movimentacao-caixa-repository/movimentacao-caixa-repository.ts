import { BuscarListaMovimentacaoRepository } from "../../data/protocols/buscar-lista-movimentacao-repository";
import { RegistrarMovimentacaoCaixaRepository } from "../../data/protocols/registrar-movimentacao-caixa-repository";
import { Movimentacao } from "../../domain/models";
import { RegistrarMovimentoModel } from "../../domain/usescases/registrar-movimento-caixa";
import { MongoHelper } from "../helpers";

export class MovimentacaoMongoRepository
  implements
    RegistrarMovimentacaoCaixaRepository,
    BuscarListaMovimentacaoRepository {
  async buscarMovimentacoes(
    data: string,
    idUsuario: string
  ): Promise<Movimentacao[]> {
    const movimentacoesCollection = await MongoHelper.getCollection(
      "movimentacoes"
    );

    const result = await movimentacoesCollection
      .find({
        idUsuario: idUsuario,
        data: new Date(data),
      })
      .toArray();

    return await result.map(MongoHelper.map);
  }
  async registrarMovimentacao(
    registrarMovimentacao: RegistrarMovimentoModel
  ): Promise<Movimentacao> {
    const movimentacoesCollection = await MongoHelper.getCollection(
      "movimentacoes"
    );
    const result = await movimentacoesCollection.insertOne(
      registrarMovimentacao
    );
    return MongoHelper.map(result.ops[0]);
  }
}
