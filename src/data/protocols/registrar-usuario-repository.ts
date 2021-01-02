import { Usuario } from "../../domain/models";
import { RegistrarUsuarioModel } from "../../domain/usescases/registrar-usuario";

export interface RegistrarUsuarioRepository {
  registrar(registrarUsuario: RegistrarUsuarioModel): Promise<Usuario>;
}
