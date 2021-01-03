import { Movimentacao } from "../models";

export interface RegistrarMovimentoModel {
  idUsuario: string;
  data: string;
  idCategoria: string;
  tipo: string;
  valor: string;
  descricao: string;
}



export interface RegistrarMovimentoCaixa {
  registrarMovimento(
    registrarMovimentoModel: RegistrarMovimentoModel
  ): Promise<Movimentacao>;
}
