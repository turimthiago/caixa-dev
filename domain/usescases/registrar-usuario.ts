import { Usuario } from "../models/usuario";

export interface RegistrarUsuario {
  registrar(usuario: Usuario): Promise<Usuario>;
}
