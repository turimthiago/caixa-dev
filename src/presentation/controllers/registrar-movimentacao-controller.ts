import { Request, Response } from "express";
import { RegistrarMovimentoCaixa } from "../../domain/usescases/registrar-movimento-caixa";
import { ParamError } from "../errors/param-error";
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
      const { idUsuario, idCategoria, data, tipo, valor } = httpRequest.body;

      if (!idUsuario) throw new ParamError("Identificador do Usuário");
      if (!idCategoria) throw new ParamError("Categoria");
      if (!data) throw new ParamError("Data");
      if (!tipo) throw new ParamError("Tipo de Movimentação");
      if (!valor) throw new ParamError("valor");

      const movimentacao = await this.registrarMovimentacao.registrarMovimento({
        idUsuario,
        data,
        idCategoria,
        tipo,
        valor,
      });

      return httpResponse.status(200).json(movimentacao);
    } catch (error) {
      return httpResponse.status(500).json({ erro: error.message });
    }
  }
}
