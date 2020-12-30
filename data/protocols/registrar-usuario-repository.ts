import { Usuario } from "../../domain/models/usuario";

export interface RegistrarUsuarioRepository {
  registrar(usuario: Usuario);
}
