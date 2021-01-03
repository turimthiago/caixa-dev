import { Movimentacao } from "../../domain/models";
import { CategoriaViewModel } from "./categoria";

interface MovimentacaoViewModel {
  data: Date;
  id: number;
  descricao: string;
  valor: number;
  categoria: CategoriaViewModel;
}

export class ResumoCartiraCaixaViewModel {
  saldoTotal: string;
  movimentacoes: MovimentacaoViewModel[];

  static async map(
    movimentacoesModel: Movimentacao[]
  ): Promise<ResumoCartiraCaixaViewModel> {
    const sum = await movimentacoesModel
      .map((a) => Number(a.valor))
      .reduce((a, b) => a + b);
    const movimentacoes = movimentacoesModel.map((item) => ({
      data: item.data,
      id: item.id,
      descricao: item.descricao,
      valor: item.valor,
      categoria: CategoriaViewModel.map(item.categoria),
    }));
    return { saldoTotal: sum.toFixed(2), movimentacoes };
  }
}
