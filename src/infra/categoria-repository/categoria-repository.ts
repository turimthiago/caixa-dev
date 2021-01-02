import { RegistrarCategoriRepository } from "../../data/protocols/registrar-categoria-repository";
import { Categoria } from "../../domain/models";
import { RegistrarCategoriaModel } from "../../domain/usescases/registrar-categoria";
import { MongoHelper } from "../helpers";

export class CategoriaMongoRepository implements RegistrarCategoriRepository {
  async registrarCategoria(
    registrarCategoria: RegistrarCategoriaModel
  ): Promise<Categoria> {
    const categoriasCollection = await MongoHelper.getCollection("categorias");
    const result = await categoriasCollection.insertOne(registrarCategoria);
    return MongoHelper.map(result.ops[0]);
  }
}
