import { Usuario } from "../../domain/models";
import { UsuarioModel } from "../../domain/usescases/registrar-usuario";

export class UsuarioViewModel {
  id: number;
  email: string;

  static map(entity: Usuario): UsuarioViewModel {
    return {
      id: entity.id,
      email: entity.email,
    };
  }
}
