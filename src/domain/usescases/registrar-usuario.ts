import { Usuario } from "../models";

export interface RegistrarUsuarioModel {
  email: string;
  password: string;
}

export interface RegistrarUsuario {
  registrar(registrarUsuario: RegistrarUsuarioModel): Promise<Usuario>;
}
