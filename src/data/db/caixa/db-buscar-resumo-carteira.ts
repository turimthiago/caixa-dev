import { UsuarioNaoExisteError } from "../../../domain/errors/usuario-nao-existe-error";
import { TipoMovimentacao } from "../../../domain/models/tipo-movimentacao";
import {
  BuscarResumoCarteira,
  ResumoCarteira,
} from "../../../domain/usescases/buscar-resumo-carteira";
import { BuscarListaMovimentacaoRepository } from "../../protocols/buscar-lista-movimentacao-repository";
import { BuscarUsuarioPorIdRepository } from "../../protocols/buscar-usuario-id-repository";

export class DbBuscarResumoCarteira implements BuscarResumoCarteira {
  constructor(
    private readonly buscarUsuarioPorIdRepository: BuscarUsuarioPorIdRepository,
    private readonly buscarListaMovimentacaoRepository: BuscarListaMovimentacaoRepository
  ) {}

  async buscar(idUsuario: string, data: string): Promise<ResumoCarteira> {
    const usuario = await this.buscarUsuarioPorIdRepository.buscarPorId(
      idUsuario
    );
    if (!usuario) {
      throw new UsuarioNaoExisteError();
    }

    const movimentacoes = await this.buscarListaMovimentacaoRepository.buscarMovimentacoes(
      data,
      idUsuario
    );

    const sum = await movimentacoes
      .map((a) => {
        if (a.tipo == TipoMovimentacao.SAIDA) {
          return Number(a.valor) * -1;
        } else {
          return Number(a.valor);
        }
      })
      .reduce((a, b) => a + b);

    return { saldoTotal: sum, movimentacoes };
  }
}
