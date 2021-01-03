import { Categoria } from "./categoria";
import { TipoMovimentacao } from "./tipo-movimentacao";
export interface Movimentacao {
  id: number;
  idUsuario: string;
  data: Date;
  categoria: Categoria;
  tipo: TipoMovimentacao;
  valor: number;
  descricao: string;
}
