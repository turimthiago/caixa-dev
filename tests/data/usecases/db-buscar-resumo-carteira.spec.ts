import {
  BuscarCategoriaPorIdRepository,
  BuscarListaMovimentacaoRepository,
  BuscarUsuarioPorIdRepository,
} from "../../../src/data/protocols";
import { DbBuscarResumoCarteira } from "../../../src/data/usecases";
import { UsuarioNaoExisteError } from "../../../src/domain/errors";
import { Categoria, Movimentacao, Usuario } from "../../../src/domain/models";

class BuscarUsuarioPorIdRepositoryStub implements BuscarUsuarioPorIdRepository {
  buscarPorId(id: string): Promise<Usuario> {
    return Promise.resolve({
      id: "any_id",
      email: "any_email",
      password: "any_password",
    });
  }
}

class BuscarListaMovimentacaoRepositoryStub
  implements BuscarListaMovimentacaoRepository {
  buscarMovimentacoes(data: Date, idUsuario: string): Promise<Movimentacao[]> {
    return Promise.resolve([]);
  }
}

describe("DbBuscarResumoCarteira", () => {
  test("deve disparar UsuarioNaoExisteError se usuário informado não existir", async () => {
    const buscarUsuarioPorIdRepositoryStub = new BuscarUsuarioPorIdRepositoryStub();
    jest
      .spyOn(buscarUsuarioPorIdRepositoryStub, "buscarPorId")
      .mockResolvedValueOnce(null);
    const buscarListaMovimentacaoRepositoryStub = new BuscarListaMovimentacaoRepositoryStub();
    const sut = new DbBuscarResumoCarteira(
      buscarUsuarioPorIdRepositoryStub,
      buscarListaMovimentacaoRepositoryStub
    );

    const promise = sut.buscar("any_id", new Date());
    expect(promise).rejects.toThrow(new UsuarioNaoExisteError());
  });

  test("deve chamar BuscarUsuarioPorIdRepository.buscarPorId com id correto", async () => {
    const buscarUsuarioPorIdRepositoryStub = new BuscarUsuarioPorIdRepositoryStub();
    const buscarPorIdSpy = jest.spyOn(
      buscarUsuarioPorIdRepositoryStub,
      "buscarPorId"
    );
    const buscarListaMovimentacaoRepositoryStub = new BuscarListaMovimentacaoRepositoryStub();
    const sut = new DbBuscarResumoCarteira(
      buscarUsuarioPorIdRepositoryStub,
      buscarListaMovimentacaoRepositoryStub
    );

    await sut.buscar("any_id", new Date());
    expect(buscarPorIdSpy).toHaveBeenCalledWith("any_id");
  });
});
