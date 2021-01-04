import { Request, response, Response } from "express";
import { Autenticacao } from "../../domain/usescases";
import { Controller } from "../protocols";
export class LoginController implements Controller {
  constructor(private readonly autenticacao: Autenticacao) {}

  async handle(
    httpRequest: Request,
    httpResponse: Response
  ): Promise<Response> {
    try {
      const { email, password } = httpRequest.body;

      const accessToken = await this.autenticacao.autenticar({
        email,
        password,
      });
      if (!accessToken) return response.status(401).json({});
      return httpResponse.status(200).json({ accessToken });
    } catch (error) {
      return httpResponse.status(500).json({ erro: error.message });
    }
  }
}
