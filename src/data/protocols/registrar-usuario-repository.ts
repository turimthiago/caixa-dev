import { Usuario } from "../../domain/models";
import { UsuarioModel } from "../../domain/usescases/registrar-usuario";

export interface RegistrarUsuarioRepository {
  registrar(usuario: UsuarioModel): Promise<Usuario>;
}
