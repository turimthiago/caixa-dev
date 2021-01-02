import { Categoria, Usuario } from "../models";

export interface RegistrarCategoriaModel {
  nome: string;
}

export interface RegistrarCategoria {
  registrar(registrarCategoria: RegistrarCategoriaModel): Promise<Categoria>;
}
