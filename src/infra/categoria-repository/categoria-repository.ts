import { ObjectId } from "mongodb";
import { BuscarCategoriaPorIdRepository } from "../../data/protocols/buscar-categoria-repository";
import { RegistrarCategoriRepository } from "../../data/protocols/registrar-categoria-repository";
import { Categoria } from "../../domain/models";
import { RegistrarCategoriaModel } from "../../domain/usescases/registrar-categoria";
import { MongoHelper } from "../helpers";

export class CategoriaMongoRepository
  implements RegistrarCategoriRepository, BuscarCategoriaPorIdRepository {
  async buscarPorId(id: string): Promise<Categoria> {
    const categoriasCollection = await MongoHelper.getCollection("categorias");
    return await categoriasCollection.findOne({ _id: new ObjectId(id) });
  }
  async registrarCategoria(
    registrarCategoria: RegistrarCategoriaModel
  ): Promise<Categoria> {
    const categoriasCollection = await MongoHelper.getCollection("categorias");
    const result = await categoriasCollection.insertOne(registrarCategoria);
    return MongoHelper.map(result.ops[0]);
  }
}
