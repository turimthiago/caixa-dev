import { Usuario } from "../../../domain/models/usuario";
import {
  RegistrarUsuario,
  RegistrarUsuarioModel,
} from "../../../domain/usescases/registrar-usuario";
import { RegistrarUsuarioRepository } from "../../protocols";
import bcrypt from "bcrypt";
import { Hasher } from "../../criptografia/hasher";

export class DbRegistrarUsuario implements RegistrarUsuario {
  constructor(
    private readonly registrarUsuarioRepository: RegistrarUsuarioRepository,
    private readonly haser: Hasher
  ) {}

  async registrar(usuario: RegistrarUsuarioModel): Promise<Usuario> {
    const hashedPassword = await this.haser.hash(usuario.password);
    const n = { email: usuario.email, password: hashedPassword };
    return await this.registrarUsuarioRepository.registrar(n);
  }
}

//{ email: 'any_email', password: 'hashed_password' }
//{"email": "any_email", "password": "hashed_password"}

//{ email: 'any_email', password: 'hashed_password' }
//{"email": "any_email", "password": "hashed_password"}
