import { Request, Response } from "express";
import { RegistrarUsuario } from "../../domain/usescases";
import { Controller } from "../protocols";
import { UsuarioViewModel } from "../view-models";
export class SignUpController implements Controller {
  constructor(private readonly registrarUsuario: RegistrarUsuario) {}

  async handle(httpRequest: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = httpRequest.body;
      const usuario = await this.registrarUsuario.registrar({
        email,
        password,
      });
      return response.status(200).json(UsuarioViewModel.map(usuario));
    } catch (error) {
      return response.status(500).json({ erro: error.message });
    }
  }
}
