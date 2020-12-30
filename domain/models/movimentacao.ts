import { Categoria } from "./categoria";

export interface Movimentacao {
  data: Date;
  categoria: Categoria;
  tipo: TipoMovimentacao;
}

enum TipoMovimentacao {
  ENTRADA,
  SAIDA,
}
