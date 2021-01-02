import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  Autenticacao,
  AutenticacaoModel,
} from "../../../domain/usescases/autenticar-usuario";
import { BuscarUsuarioPorEmail } from "../../protocols/buscar-usuario-email";

export class DdAutenticacao implements Autenticacao {
  constructor(
    private readonly buscarUsuarioPorEmailRepository: BuscarUsuarioPorEmail
  ) {}

  async autenticar(autenticacao: AutenticacaoModel): Promise<string> {
    const usuario = await this.buscarUsuarioPorEmailRepository.buscarPorEmail(
      autenticacao.email
    );

    const isEquals = bcrypt.compare(autenticacao.password, usuario.password);
    if (isEquals) {
      const accessToken = await jwt.sign({ id: usuario.id }, "s3cret!");
      return accessToken;
    }

    return null;
  }
}
