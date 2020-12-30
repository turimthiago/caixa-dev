import { UsuarioModel } from "../../../domain/usescases/registrar-usuario";
import { RegistrarUsuarioRepository } from "../../protocols";
import { DbRegistrarUsuario } from "./db-registrar-usuario";

class RegistrarUsuarioRepositoryStub implements RegistrarUsuarioRepository {
  registrar(usuario: UsuarioModel): Promise<UsuarioModel> {
    return Promise.resolve(null);
  }
}

describe("DbRegistrarUsuario", () => {
  test("Deve chamar registrar no repositório com valores corretos", () => {
    const repository = new RegistrarUsuarioRepositoryStub();
    const registrarSpy = jest.spyOn(repository, "registrar");
    const sut = new DbRegistrarUsuario(repository);

    sut.registrar({ email: "any_email", password: "any_password" });

    expect(registrarSpy).toHaveBeenCalledWith({
      email: "any_email",
      password: "any_password",
    });
  });
});
