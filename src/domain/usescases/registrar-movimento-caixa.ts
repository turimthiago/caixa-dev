import { Movimentacao } from "../models";

export interface RegistrarMovimentoModel {
  idUsuario: string;
  data: Date;
  idCategoria: string;
  tipo: string;
}

export interface RegistrarMovimentoCaixa {
  registrarMovimento(
    registrarMovimentoModel: RegistrarMovimentoModel
  ): Promise<Movimentacao>;
}
