import { Request, Response } from "express";
import { RegistrarMovimentoCaixa } from "../../domain/usescases/registrar-movimento-caixa";
import { ParamError } from "../errors/param-error";
import { DateHelper } from "../helpers/date-helper";
import { Controller } from "../protocols/controller";

export class RegistrarMovimentacaoController implements Controller {
  constructor(
    private readonly registrarMovimentacao: RegistrarMovimentoCaixa
  ) {}

  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    try {
      const { categoria, data, tipo, valor, descricao } = httpRequest.body;
      const usuarioId = (httpRequest as any).id as string;

      if (!usuarioId) throw new ParamError("Identificador do Usuário");
      if (!categoria.id) throw new ParamError("Categoria");
      if (!data) throw new ParamError("Data");
      if (!tipo) throw new ParamError("Tipo de Movimentação");
      if (!valor) throw new ParamError("valor");
      if (!descricao) throw new ParamError("descrição");

      const movimentacao = await this.registrarMovimentacao.registrarMovimento({
        usuarioId,
        data: DateHelper.stringToDate(data),
        categoria,
        tipo,
        valor,
        descricao,
      });

      return httpResponse.status(200).json(movimentacao);
    } catch (error) {
      return httpResponse.status(500).json({ erro: error.message });
    }
  }
}
