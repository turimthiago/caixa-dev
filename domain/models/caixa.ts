import { Movimentacao } from "./movimentacao";
import { Usuario } from "./usuario";

export interface Caixa {
  usuario: Usuario;
  movimentacoes: Movimentacao[];
}
