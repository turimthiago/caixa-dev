import { Categoria } from "../../../domain/models";
import {
  RegistrarCategoria,
  RegistrarCategoriaModel,
} from "../../../domain/usescases/registrar-categoria";

export class DbResitrarCategoria implements RegistrarCategoria {
    

  async registrar(registrarUsuario: RegistrarCategoriaModel): Promise<Categoria> {
    throw new Error("Method not implemented.");
  }
}
