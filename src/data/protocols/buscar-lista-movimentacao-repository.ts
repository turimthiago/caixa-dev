import { Movimentacao } from "../../domain/models";
export interface BuscarListaMovimentacaoRepository {
  buscarMovimentacoes(
    data: Date,
    idUsuario: string
  ): Promise<Movimentacao[]>;
}
