import { Movimentacao } from "../../../domain/models";
import { RegistrarMovimentoModel } from "../../../domain/usescases";
import {
  BuscarListaMovimentacaoRepository,
  RegistrarMovimentacaoCaixaRepository,
} from "../../../data/protocols";
import { MongoHelper } from "../../helpers";

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

    return result && await result.map(MongoHelper.map);
  }

  async registrarMovimentacao(
    data: RegistrarMovimentoModel
  ): Promise<Movimentacao> {
    const movimentacoesCollection = await MongoHelper.getCollection(
      "movimentacoes"
    );
    const result = await movimentacoesCollection.insertOne(data);
    return result && MongoHelper.map(result.ops[0]);
  }
}
