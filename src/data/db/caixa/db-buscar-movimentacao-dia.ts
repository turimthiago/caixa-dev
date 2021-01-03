import { UsuarioNaoExisteError } from "../../../domain/errors/usuario-nao-existe-error";
import { Movimentacao } from "../../../domain/models";
import { BuscarMovimentacaoDiaResumo } from "../../../domain/usescases/buscar-movimentacao-dia";
import { BuscarListaMovimentacaoRepository } from "../../protocols/buscar-lista-movimentacao-repository";
import { BuscarUsuarioPorIdRepository } from "../../protocols/buscar-usuario-id-repository";

export class DbBuscarMovimentacaoDiaResumo
  implements BuscarMovimentacaoDiaResumo {
  constructor(
    private readonly buscarUsuarioPorIdRepository: BuscarUsuarioPorIdRepository,
    private readonly buscarListaMovimentacaoRepository: BuscarListaMovimentacaoRepository
  ) {}

  async buscar(idUsuario: string, data: string): Promise<Movimentacao[]> {
    const usuario = await this.buscarUsuarioPorIdRepository.buscarPorId(
      idUsuario
    );
    if (!usuario) {
      throw new UsuarioNaoExisteError();
    }

    return await this.buscarListaMovimentacaoRepository.buscarMovimentacoes(
      data,
      idUsuario
    );
  }
}
