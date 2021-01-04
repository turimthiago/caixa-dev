import { Hasher } from "../../../src/data/criptografia";
import { RegistrarUsuarioRepository } from "../../../src/data/protocols";
import { DbRegistrarUsuario } from "../../../src/data/usecases";
import { Usuario } from "../../../src/domain/models";
import { RegistrarUsuarioModel } from "../../../src/domain/usescases";

class RegistrarUsuarioReposityStub implements RegistrarUsuarioRepository {
  registrar(registrarUsuario: RegistrarUsuarioModel): Promise<Usuario> {
    return Promise.resolve({
      id: "valid_id",
      email: "valid_email@email.com",
      password: "valid_hashed_password",
    });
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

    await sut.registrar({ email: "any_email", password: "any_password" });

    expect(registrarSpy).toHaveBeenCalledWith({
      email: "any_email",
      password: "hashed_password",
    });
  });

  test("Deve retornar um usuário registrado com sucesso", async () => {
    const repository = new RegistrarUsuarioReposityStub();
    const hahserStub = new HahserStub();
    const sut = new DbRegistrarUsuario(repository, hahserStub);

    const fakeUsuarioData = {
      email: "valid_email@email.com",
      password: "valid_password",
    };

    const fakeUsuario = {
      id: "valid_id",
      email: "valid_email@email.com",
      password: "valid_hashed_password",
    };

    const usuario = await sut.registrar(fakeUsuarioData);

    expect(usuario).toEqual(fakeUsuario);
  });
});
