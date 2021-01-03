import { Usuario } from "../../../domain/models/usuario";
import {
  RegistrarUsuario,
  RegistrarUsuarioModel,
} from "../../../domain/usescases/registrar-usuario";
import { RegistrarUsuarioRepository } from "../../protocols";
import { Hasher } from "../../criptografia/hasher";

export class DbRegistrarUsuario implements RegistrarUsuario {
  constructor(
    private readonly registrarUsuarioRepository: RegistrarUsuarioRepository,
    private readonly haser: Hasher
  ) {}

  async registrar(usuario: RegistrarUsuarioModel): Promise<Usuario> {
    const hashedPassword = await this.haser.hash(usuario.password);
    return await this.registrarUsuarioRepository.registrar(
      Object.assign({}, usuario, { password: hashedPassword })
    );
  }
}

//{ email: 'any_email', password: 'hashed_password' }
//{"email": "any_email", "password": "hashed_password"}

//{ email: 'any_email', password: 'hashed_password' }
//{"email": "any_email", "password": "hashed_password"}
