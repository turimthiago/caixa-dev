import { Usuario } from "../../../domain/models/usuario";
import {
  RegistrarUsuario,
  UsuarioModel,
} from "../../../domain/usescases/registrar-usuario";
import { RegistrarUsuarioRepository } from "../../protocols";
import bcrypt from "bcrypt";

export class DbRegistrarUsuario implements RegistrarUsuario {
  private readonly registrarUsuarioRepository: RegistrarUsuarioRepository;

  constructor(registrarUsuarioRepository: RegistrarUsuarioRepository) {
    this.registrarUsuarioRepository = registrarUsuarioRepository;
  }

  async registrar(usuario: UsuarioModel): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(usuario.password, 12);
    return await this.registrarUsuarioRepository.registrar(
      Object.assign({}, usuario, { password: hashedPassword })
    );
  }
}
