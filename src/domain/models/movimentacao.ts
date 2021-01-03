import { Categoria } from "./categoria";
export interface Movimentacao {
  id: number;
  idUsuario: string;
  data: Date;
  categoria: Categoria;
  tipo: string;
  valor: number;
  descricao: string;
}
