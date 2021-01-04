import { Categoria, TipoMovimentacao } from ".";
export interface Movimentacao {
  id: string;
  data: Date;
  categoria: Categoria;
  tipo: TipoMovimentacao;
  valor: number;
  descricao: string;
}
