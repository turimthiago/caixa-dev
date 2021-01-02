import { UsuarioModel } from "../../domain/usescases/registrar-usuario";

export interface BuscarUsuarioPorEmail {
  buscarPorEmail(email: string): Promise<UsuarioModel>;
}
