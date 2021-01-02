import jwt from "jsonwebtoken";
import {
  Autenticacao,
  AutenticacaoModel,
} from "../../../domain/usescases/autenticar-usuario";
import { Hasher } from "../../criptografia/hasher";
import { BuscarUsuarioPorEmailRepository } from "../../protocols/buscar-usuario-email-repository";

export class DdAutenticacao implements Autenticacao {
  constructor(
    private readonly buscarUsuarioPorEmailRepository: BuscarUsuarioPorEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async autenticar(autenticacao: AutenticacaoModel): Promise<string> {
    console.log(autenticacao);
    const usuario = await this.buscarUsuarioPorEmailRepository.buscarPorEmail(
      autenticacao.email
    );
    const isEquals = await this.hasher.compare(
      autenticacao.password,
      usuario.password
    );
    if (isEquals) {
      const accessToken = await jwt.sign({ id: usuario.id }, "s3cret!");
      return accessToken;
    }

    return null;
  }
}
