import { UsuarioNaoExisteError } from "../../../domain/errors/usuario-nao-existe-error";
import { Movimentacao } from "../../../domain/models";
import {
  RegistrarMovimentoCaixa,
  RegistrarMovimentoModel,
} from "../../../domain/usescases/registrar-movimento-caixa";
import { BuscarUsuarioPorIdRepository } from "../../protocols/buscar-usuario-id-repository";
import { RegistrarMovimentacaoCaixaRepository } from "../../protocols/registrar-movimentacao-caixa-repository";

export class DbRegistrarMovimentacao implements RegistrarMovimentoCaixa {
  constructor(
    private readonly registrarMovimentacaoRepository: RegistrarMovimentacaoCaixaRepository,
    private readonly buscarUsuarioPorIdRepository: BuscarUsuarioPorIdRepository
  ) {}

  async registrarMovimento(
    registrarMovimentoModel: RegistrarMovimentoModel
  ): Promise<Movimentacao> {
    const usuario = await this.buscarUsuarioPorIdRepository.buscarPorId(
      registrarMovimentoModel.idUsuario
    );

    if (!usuario) {
      throw new UsuarioNaoExisteError();
    }

    return await this.registrarMovimentacaoRepository.registrarMovimentacao(
      registrarMovimentoModel
    );
  }
}
