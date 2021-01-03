import { Categoria, Movimentacao } from "../models";

export interface ResumoCarteira {
  saldoTotal: number;
  movimentacoes: Movimentacao[];
}

export interface BuscarResumoCarteira {
  buscar(idUsuario: string, data: string): Promise<ResumoCarteira>;
}
