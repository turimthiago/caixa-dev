import { Movimentacao } from "../../domain/models";
import {
  RegistrarMovimentoModel,
} from "../../domain/usescases/registrar-movimento-caixa";

export interface RegistrarMovimentacaoCaixaRepository {
  registrarMovimentacao(
    registrarMovimentacao: RegistrarMovimentoModel
  ): Promise<Movimentacao>;
}
