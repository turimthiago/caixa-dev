import { Categoria } from "../../domain/models";

export class CategoriaViewModel {
  id: string;
  name: string;

  static map(categoria: Categoria): CategoriaViewModel {
    return {
      id: categoria.id,
      name: categoria.nome,
    };
  }
}
