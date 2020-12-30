import { Usuario } from "../../../domain/models/usuario";
import { RegistrarUsuario } from "../../../domain/usescases/registrar-usuario";
import { RegistrarUsuarioRepository } from "../../protocols";

export class DbRegistrarUsuario implements RegistrarUsuario {
  private readonly registrarUsuarioRepository: RegistrarUsuarioRepository;

  constructor(registrarUsuarioRepository: RegistrarUsuarioRepository) {
    this.registrarUsuarioRepository = registrarUsuarioRepository;
  }

  async registrar(usuario: Usuario): Promise<Usuario> {
    return await this.registrarUsuarioRepository.registrar(usuario);
  }
}
