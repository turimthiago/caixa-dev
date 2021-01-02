import { Usuario } from "../../domain/models";

export class UsuarioViewModel {
  id: string;
  email: string;

  static map(entity: Usuario): UsuarioViewModel {
    return {
      id: entity.id,
      email: entity.email,
    };
  }
}
