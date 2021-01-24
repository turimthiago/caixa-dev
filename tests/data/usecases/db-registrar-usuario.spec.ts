import { Hasher } from "../../../src/data/criptografia";
import { RegistrarUsuarioRepository } from "../../../src/data/protocols";
import { DbRegistrarUsuario } from "../../../src/data/usecases";
import { Usuario } from "../../../src/domain/models";
import { RegistrarUsuarioModel } from "../../../src/domain/usescases";
import { UsuarioBuilder } from "../../data-builders/usuario-builder";
class RegistrarUsuarioReposityStub implements RegistrarUsuarioRepository {
  registrar(registrarUsuario: RegistrarUsuarioModel): Promise<Usuario> {
    return Promise.resolve(
      UsuarioBuilder.usuario()
        .comId()
        .emailValido()
        .senhaValidaCriptografada()
        .build()
    );
  }
}
class HahserStub implements Hasher {
  compare(value: string, hash: string): Promise<Boolean> {
    return Promise.resolve(true);
  }
  hash(value: string): Promise<string> {
    return Promise.resolve("hashed_password");
  }
}

describe("DbRegistrarUsuario", () => {
  test("Deve chamar registrar no repositório com valores corretos", async () => {
    const repository = new RegistrarUsuarioReposityStub();
    const hahserStub = new HahserStub();
    const registrarSpy = jest.spyOn(repository, "registrar");
    const sut = new DbRegistrarUsuario(repository, hahserStub);

    const usuario = UsuarioBuilder.usuario().semId().build();

    await sut.registrar(usuario);

    expect(registrarSpy).toHaveBeenCalledWith(
      UsuarioBuilder.usuario().semId().comSenhaCriptografada().build()
    );
  });

  test("Deve retornar um usuário registrado com sucesso", async () => {
    const repository = new RegistrarUsuarioReposityStub();
    const hahserStub = new HahserStub();
    const sut = new DbRegistrarUsuario(repository, hahserStub);

    const usuario = await sut.registrar(
      UsuarioBuilder.usuario().semId().emailValido().senhaValida().build()
    );

    expect(usuario).toEqual(
      UsuarioBuilder.usuario()
        .comId()
        .emailValido()
        .senhaValidaCriptografada()
        .build()
    );
  });
});
