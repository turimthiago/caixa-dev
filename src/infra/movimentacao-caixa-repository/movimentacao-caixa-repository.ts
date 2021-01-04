import { ObjectId } from "mongodb";
import { MovimentacaoEntity } from "../../data/entities/movimentacao-entity";
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
    data: Date,
    usuarioId: string
  ): Promise<Movimentacao[]> {
    const movimentacoesCollection = await MongoHelper.getCollection(
      "movimentacoes"
    );

    const result = await movimentacoesCollection
      .find({
        usuarioId,
        data,
      })
      .toArray();

    return await result.map(MongoHelper.map);
  }

  async registrarMovimentacao(
    data: RegistrarMovimentoModel
  ): Promise<Movimentacao> {
    const movimentacoesCollection = await MongoHelper.getCollection(
      "movimentacoes"
    );
    const result = await movimentacoesCollection.insertOne(data);
    return MongoHelper.map(result.ops[0]);
  }
}
