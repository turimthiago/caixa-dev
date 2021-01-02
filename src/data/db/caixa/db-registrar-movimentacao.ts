import { Movimentacao } from "../../../domain/models";
import {
  RegistrarMovimentoCaixa,
  RegistrarMovimentoModel,
} from "../../../domain/usescases/registrar-movimento-caixa";
import { RegistrarMovimentacaoCaixaRepository } from "../../protocols/registrar-movimentacao-caixa-repository";

export class DbRegistrarMovimentacao implements RegistrarMovimentoCaixa {
  constructor(
    private readonly registrarMovimentacaoRepository: RegistrarMovimentacaoCaixaRepository
  ) {}

  async registrarMovimento(
    registrarMovimentoModel: RegistrarMovimentoModel
  ): Promise<Movimentacao> {
    return await this.registrarMovimentacaoRepository.registrarMovimentacao(
      registrarMovimentoModel
    );
  }
}
