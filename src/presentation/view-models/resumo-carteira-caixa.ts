import { TipoDeMovimentacaoInvalidaError } from "../../domain/errors/tipo-movimentacao-invalida-error";
import { Movimentacao } from "../../domain/models";
import { TipoMovimentacao } from "../../domain/models/tipo-movimentacao";
import { ResumoCarteira } from "../../domain/usescases/buscar-resumo-carteira";
import { CategoriaViewModel } from "./categoria";

interface MovimentacaoViewModel {
  data: Date;
  id: string;
  descricao: string;
  valor: number;
  categoria: CategoriaViewModel;
}

export class ResumoCartiraCaixaViewModel {
  saldoTotal: string;
  movimentacoes: MovimentacaoViewModel[];

  static async map(
    resumo: ResumoCarteira
  ): Promise<ResumoCartiraCaixaViewModel> {
    const movimentacoes = resumo.movimentacoes.map((item) => ({
      data: item.data,
      id: item.id,
      descricao: item.descricao,
      valor: item.valor,
      tipo: item.tipo,
      categoria: CategoriaViewModel.map(item.categoria),
    }));
    return { saldoTotal: resumo.saldoTotal.toFixed(2), movimentacoes };
  }
}
