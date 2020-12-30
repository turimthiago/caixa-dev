import { Usuario } from "../../../domain/models/usuario";
import { RegistrarUsuario } from "../../../domain/usescases/registrar-usuario";
import { RegistrarUsuarioRepository } from "../../protocols";

export class DbRegistrarUsuario implements RegistrarUsuario {
  private readonly registrarUsuarioRepository: RegistrarUsuarioRepository;

  async registrar(usuario: Usuario): Promise<Usuario> {
    throw new Error("Method not implemented.");
  }
}
