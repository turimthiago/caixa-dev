import { Request, response, Response } from "express";
import { request } from "http";
import { BuscarResumoCarteira } from "../../domain/usescases/buscar-resumo-carteira";
import { DateHelper } from "../helpers/date-helper";
import { Controller } from "../protocols/controller";
import { ResumoCartiraCaixaViewModel } from "../view-models/resumo-carteira-caixa";

export class BuscarMovimentacaoDataController implements Controller {
  constructor(private readonly buscarResumoCarteira: BuscarResumoCarteira) {}

  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    try {
      let data = httpRequest.query.data as string;
      if (!data) data = new Date().toISOString();

      const usuarioId = (httpRequest as any).id as string;

      const resumoCarteira = await this.buscarResumoCarteira.buscar(
        usuarioId,
        DateHelper.stringToDate(data)
      );

      return httpResponse
        .status(200)
        .json(await ResumoCartiraCaixaViewModel.map(resumoCarteira));
    } catch (error) {
      return httpResponse.status(500).json({ erro: error.message });
    }
  }
}
