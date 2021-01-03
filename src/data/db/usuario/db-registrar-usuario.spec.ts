import { Usuario } from "../../../domain/models";
import { RegistrarUsuarioModel } from "../../../domain/usescases/registrar-usuario";
import { Hasher } from "../../criptografia/hasher";
import { RegistrarUsuarioRepository } from "../../protocols";
import { DbRegistrarUsuario } from "./db-registrar-usuario";

class RegistrarUsuarioReposityStub implements RegistrarUsuarioRepository {
  registrar(registrarUsuario: RegistrarUsuarioModel): Promise<Usuario> {
    return Promise.resolve({
      id: "any_id",
      email: "any_email",
      password: "hashed_password",
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
});
