import { Movimentacao } from "../models";
export interface BuscarMovimentacaoDiaResumo {
  buscar(idUsuario: string, data: string): Promise<Movimentacao[]>;
}
