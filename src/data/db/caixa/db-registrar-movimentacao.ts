import { CategoriaNaoExisteError } from "../../../domain/errors/categoria-nao-existe-error";
import { UsuarioNaoExisteError } from "../../../domain/errors/usuario-nao-existe-error";
import { TipoDeMovimentacaoInvalidaError } from "../../../domain/errors/tipo-movimentacao-invalida-error";
import { Movimentacao } from "../../../domain/models";
import {
  RegistrarMovimentoCaixa,
  RegistrarMovimentoModel,
} from "../../../domain/usescases/registrar-movimento-caixa";
import { BuscarCategoriaPorIdRepository } from "../../protocols/buscar-categoria-repository";
import { BuscarUsuarioPorIdRepository } from "../../protocols/buscar-usuario-id-repository";
import { RegistrarMovimentacaoCaixaRepository } from "../../protocols/registrar-movimentacao-caixa-repository";

export class DbRegistrarMovimentacao implements RegistrarMovimentoCaixa {
  constructor(
    private readonly registrarMovimentacaoRepository: RegistrarMovimentacaoCaixaRepository,
    private readonly buscarUsuarioPorIdRepository: BuscarUsuarioPorIdRepository,
    private readonly buscarCategoriaPorIdRepository: BuscarCategoriaPorIdRepository
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

    const categoria = await this.buscarCategoriaPorIdRepository.buscarPorId(
      registrarMovimentoModel.idCategoria
    );
    if (!categoria) {
      throw new CategoriaNaoExisteError();
    }

    if (
      registrarMovimentoModel.tipo !== "ENTRADA" &&
      registrarMovimentoModel.tipo !== "SAIDA"
    ) {
      throw new TipoDeMovimentacaoInvalidaError();
    }

    return await this.registrarMovimentacaoRepository.registrarMovimentacao(
      Object.assign({}, registrarMovimentoModel, {
        data: new Date(registrarMovimentoModel.data),
        valor: Number(registrarMovimentoModel.valor),
        categoria,
      })
    );
  }
}
