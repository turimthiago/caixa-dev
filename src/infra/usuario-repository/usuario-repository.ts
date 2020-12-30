import { RegistrarUsuarioRepository } from "../../data/protocols";
import { Usuario } from "../../domain/models";
import { UsuarioModel } from "../../domain/usescases/registrar-usuario";
import { MongoHelper } from "../helpers";

export class UsuarioMongoRepository implements RegistrarUsuarioRepository {
  async registrar(usuario: UsuarioModel): Promise<Usuario> {
    const usuariosCollection = await MongoHelper.getCollection("usuarios");
    const result = await usuariosCollection.insertOne(usuario);
    return MongoHelper.map(result.ops[0]);
  }
}
