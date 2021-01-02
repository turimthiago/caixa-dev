import { Usuario } from "../../domain/models";

export interface BuscarUsuarioPorIdRepository {
  buscarPorId(id: string): Promise<Usuario>;
}
