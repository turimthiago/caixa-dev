import { Usuario } from "../../domain/models";

export interface BuscarUsuarioPorEmailRepository {
  buscarPorEmail(email: string): Promise<Usuario>;
}
