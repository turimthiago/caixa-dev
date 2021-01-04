import { Categoria, Movimentacao } from "../models";

export interface ResumoCarteira {
  saldoTotal: number;
  movimentacoes: Movimentacao[];
}

export interface BuscarResumoCarteira {
  buscar(usuarioId: string, data: Date): Promise<ResumoCarteira>;
}
