import { Request, Response } from "express";
import { BuscarResumoCarteira } from "../../domain/usescases";
import { ParamError } from "../errors/param-error";
import { DateHelper } from "../helpers/date-helper";
import { Controller } from "../protocols";
import { ResumoCartiraCaixaViewModel } from "../view-models";

export class BuscarMovimentacaoDataController implements Controller {
  constructor(private readonly buscarResumoCarteira: BuscarResumoCarteira) {}

  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    try {
      let data = httpRequest.query.data as string;

      if (!data) throw new ParamError("data");

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
