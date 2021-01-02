import { Categoria } from "../../domain/models";
import { RegistrarCategoriaModel } from "../../domain/usescases/registrar-categoria";

export interface RegistrarCategoriRepository {
  registrarCategoria(
    registrarCategoria: RegistrarCategoriaModel
  ): Promise<Categoria>;
}
