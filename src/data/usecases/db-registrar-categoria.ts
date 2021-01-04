import { Categoria } from "../../domain/models";
import {
  RegistrarCategoria,
  RegistrarCategoriaModel,
} from "../../domain/usescases/registrar-categoria";
import { RegistrarCategoriRepository } from "../protocols/registrar-categoria-repository";

export class DbRegistrarCategoria implements RegistrarCategoria {
  constructor(
    private readonly registrarCategoriaRepository: RegistrarCategoriRepository
  ) {}

  async registrar(
    registrarCategoria: RegistrarCategoriaModel
  ): Promise<Categoria> {
    return await this.registrarCategoriaRepository.registrarCategoria(
      registrarCategoria
    );
  }
}
