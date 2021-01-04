import { Movimentacao } from "../../domain/models";
import { MovimentacaoEntity } from "../entities/movimentacao-entity";

export interface BuscarListaMovimentacaoRepository {
  buscarMovimentacoes(
    data: Date,
    idUsuario: string
  ): Promise<Movimentacao[]>;
}
