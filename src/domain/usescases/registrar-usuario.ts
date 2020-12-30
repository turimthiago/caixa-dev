import { Usuario } from "../models";

export interface UsuarioModel {
  email: string;
  password: string;
}

export interface RegistrarUsuario {
  registrar(usuario: UsuarioModel): Promise<Usuario>;
}
