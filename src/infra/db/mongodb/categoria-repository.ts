import { ObjectId } from "mongodb";
import { Categoria } from "../../../domain/models";
import { RegistrarCategoriaModel } from "../../../domain/usescases";
import {
  BuscarCategoriaPorIdRepository,
  RegistrarCategoriRepository,
} from "../../../data/protocols";
import { MongoHelper } from "../../helpers";

export class CategoriaMongoRepository
  implements RegistrarCategoriRepository, BuscarCategoriaPorIdRepository {
  async buscarPorId(id: string): Promise<Categoria> {
    const categoriasCollection = await MongoHelper.getCollection("categorias");
    const categoria = await categoriasCollection.findOne({
      _id: new ObjectId(id),
    });
    return categoria && MongoHelper.map(categoria);
  }
  async registrarCategoria(
    registrarCategoria: RegistrarCategoriaModel
  ): Promise<Categoria> {
    const categoriasCollection = await MongoHelper.getCollection("categorias");
    const categoria = await categoriasCollection.insertOne(registrarCategoria);
    return categoria && MongoHelper.map(categoria.ops[0]);
  }
}
