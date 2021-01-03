import { Movimentacao } from "../../domain/models";

export interface BuscarListaMovimentacaoRepository {
  buscarMovimentacoes(
    data: string,
    idUsuario: string
  ): Promise<Movimentacao[]>;
}
