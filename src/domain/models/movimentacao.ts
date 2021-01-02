import { Categoria } from "./categoria";
import { Usuario } from "./usuario";

export interface Movimentacao {
  usuario: Usuario;
  data: Date;
  categoria: Categoria;
  tipo: TipoMovimentacao;
  valor: number;
}

enum TipoMovimentacao {
  ENTRADA,
  SAIDA,
}
