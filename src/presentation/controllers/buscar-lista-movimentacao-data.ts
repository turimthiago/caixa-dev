import { Request, response, Response } from "express";
import { BuscarCategoriaPorIdRepository } from "../../data/protocols/buscar-categoria-repository";
import { BuscarMovimentacaoDiaResumo } from "../../domain/usescases/buscar-movimentacao-dia";
import { BuscarResumoCarteira } from "../../domain/usescases/buscar-resumo-carteira";
import { Controller } from "../protocols/controller";
import { ResumoCartiraCaixaViewModel } from "../view-models/resumo-carteira-caixa";

export class BuscarMovimentacaoDataController implements Controller {
  constructor(
    private readonly buscarResumoCarteira: BuscarResumoCarteira
  ) {}

  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    try {
      const data = httpRequest.query.data;
      const idUsuario = httpRequest.query.idUsuario;

      const resumoCarteira = await this.buscarResumoCarteira.buscar(
        idUsuario as string,
        data as string
      );

      return httpResponse
        .status(200)
        .json(await ResumoCartiraCaixaViewModel.map(resumoCarteira));
    } catch (error) {
      return response.status(500).json({ erro: error.message });
    }
  }
}
