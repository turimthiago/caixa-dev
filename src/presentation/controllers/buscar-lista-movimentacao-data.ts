import { Request, response, Response } from "express";
import { BuscarCategoriaPorIdRepository } from "../../data/protocols/buscar-categoria-repository";
import { BuscarMovimentacaoDiaResumo } from "../../domain/usescases/buscar-movimentacao-dia";
import { Controller } from "../protocols/controller";
import { ResumoCartiraCaixaViewModel } from "../view-models/resumo-carteira-caixa";

export class BuscarMovimentacaoDataController implements Controller {
  constructor(
    private readonly buscarMovimentacaoDiaResumo: BuscarMovimentacaoDiaResumo
  ) {}

  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    try {
      const data = httpRequest.query.data;
      const idUsuario = httpRequest.query.idUsuario;

      const movimentacoes = await this.buscarMovimentacaoDiaResumo.buscar(
        idUsuario as string,
        data as string
      );

      return httpResponse
        .status(200)
        .json(await ResumoCartiraCaixaViewModel.map(movimentacoes));
    } catch (error) {
      return response.status(500).json({ erro: error.message });
    }
  }
}
