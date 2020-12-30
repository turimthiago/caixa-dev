import { Categoria } from "./categoria";
import { Usuario } from "./usuario";

export interface Movimentacao {
  usuario : Usuario;
  data: Date;
  categoria: Categoria;
  tipo: TipoMovimentacao;
}

enum TipoMovimentacao {
  ENTRADA,
  SAIDA,
}
