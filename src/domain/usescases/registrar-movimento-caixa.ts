import { Categoria, Movimentacao } from "../models";
export interface RegistrarMovimentoModel {
  usuarioId: string;
  data: Date;
  categoria: Categoria;
  tipo: string;
  valor: string;
  descricao: string;
}
export interface RegistrarMovimentoCaixa {
  registrarMovimento(
    registrarMovimentoModel: RegistrarMovimentoModel
  ): Promise<Movimentacao>;
}
