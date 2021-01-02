import { Categoria } from "../../domain/models";

export interface BuscarCategoriaPorIdRepository {
  buscarPorId(id: string): Promise<Categoria>;
}
