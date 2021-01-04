import { ObjectId } from "mongodb";
import { Usuario } from "../../../domain/models";
import { RegistrarUsuarioModel } from "../../../domain/usescases";
import {
  BuscarUsuarioPorEmailRepository,
  BuscarUsuarioPorIdRepository,
  RegistrarUsuarioRepository,
} from "../../../data/protocols";
import { MongoHelper } from "../../helpers";

export class UsuarioMongoRepository
  implements
    RegistrarUsuarioRepository,
    BuscarUsuarioPorEmailRepository,
    BuscarUsuarioPorIdRepository {
  async buscarPorId(id: string): Promise<Usuario> {
    const isPkValid = ObjectId.isValid(id);
    if (!isPkValid) throw new Error("Chave para busca inválida");
    const usuariosCollection = await MongoHelper.getCollection("usuarios");
    const usuario = await usuariosCollection.findOne({ _id: new ObjectId(id) });
    return usuario && MongoHelper.map(usuario);
  }

  async buscarPorEmail(email: string): Promise<Usuario> {
    const usuariosCollection = await MongoHelper.getCollection("usuarios");
    const usuario = await usuariosCollection.findOne(
      {
        email,
      },
      {
        projection: {
          _id: 1,
          name: 1,
          password: 1,
        },
      }
    );
    return usuario && MongoHelper.map(usuario);
  }
  async registrar(usuario: RegistrarUsuarioModel): Promise<Usuario> {
    const usuariosCollection = await MongoHelper.getCollection("usuarios");
    const result = await usuariosCollection.insertOne(usuario);
    return result && MongoHelper.map(result.ops[0]);
  }
}
