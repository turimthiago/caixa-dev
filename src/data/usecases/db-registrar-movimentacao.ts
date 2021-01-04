import { CategoriaNaoExisteError } from "../../domain/errors/categoria-nao-existe-error";
import { UsuarioNaoExisteError } from "../../domain/errors/usuario-nao-existe-error";
import { TipoDeMovimentacaoInvalidaError } from "../../domain/errors/tipo-movimentacao-invalida-error";
import { Movimentacao, TipoMovimentacao } from "../../domain/models";
import {
  RegistrarMovimentoCaixa,
  RegistrarMovimentoModel,
} from "../../domain/usescases/registrar-movimento-caixa";
import { BuscarCategoriaPorIdRepository } from "../protocols/buscar-categoria-repository";
import { BuscarUsuarioPorIdRepository } from "../protocols/buscar-usuario-id-repository";
import { RegistrarMovimentacaoCaixaRepository } from "../protocols/registrar-movimentacao-caixa-repository";

export class DbRegistrarMovimentacao implements RegistrarMovimentoCaixa {
  constructor(
    private readonly registrarMovimentacaoRepository: RegistrarMovimentacaoCaixaRepository,
    private readonly buscarUsuarioPorIdRepository: BuscarUsuarioPorIdRepository,
    private readonly buscarCategoriaPorIdRepository: BuscarCategoriaPorIdRepository
  ) {}

  async registrarMovimento(
    data: RegistrarMovimentoModel
  ): Promise<Movimentacao> {
    const usuario = await this.buscarUsuarioPorIdRepository.buscarPorId(
      data.usuarioId
    );
    if (!usuario) {
      throw new UsuarioNaoExisteError();
    }

    const categoria = await this.buscarCategoriaPorIdRepository.buscarPorId(
      data.categoria.id
    );

    if (!categoria) {
      throw new CategoriaNaoExisteError();
    }
    data.categoria = categoria;

    if (data.tipo !== "ENTRADA" && data.tipo !== "SAIDA") {
      throw new TipoDeMovimentacaoInvalidaError();
    }

    const result = await this.registrarMovimentacaoRepository.registrarMovimentacao(
      data
    );

    return Object.assign({}, result, {
      id: result.id,
      data: result.data,
      categoria,
      tipo:
        result.tipo == "SAIDA"
          ? TipoMovimentacao.SAIDA
          : TipoMovimentacao.ENTRADA,
      valor: result.valor,
      descricao: result.descricao,
    });
  }
}
