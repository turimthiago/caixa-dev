import { RegistrarUsuarioRepository } from "../../data/protocols";
import { BuscarUsuarioPorEmailRepository } from "../../data/protocols/buscar-usuario-email-repository";
import { Usuario } from "../../domain/models";
import { RegistrarUsuarioModel } from "../../domain/usescases/registrar-usuario";
import { MongoHelper } from "../helpers";

export class UsuarioMongoRepository
  implements RegistrarUsuarioRepository, BuscarUsuarioPorEmailRepository {
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
    return MongoHelper.map(result.ops[0]);
  }
}
