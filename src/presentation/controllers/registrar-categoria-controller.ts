import { Request, Response } from "express";
import { RegistrarCategoria } from "../../domain/usescases";
import { Controller } from "../protocols";

export class RegistrarCategoriController implements Controller {
  constructor(private readonly registrarCategoria: RegistrarCategoria) {}

  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    try {
      const { nome } = httpRequest.body;

      const categoria = await this.registrarCategoria.registrar({ nome });
      return httpResponse.status(200).json(categoria);
    } catch (error) {
      return httpResponse.status(500).json({ erro: error.message });
    }
  }
}
