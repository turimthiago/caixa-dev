import {
  Autenticacao,
  AutenticacaoModel,
} from "../../domain/usescases/autenticar-usuario";
import { Crypter } from "../criptografia/crypter";
import { Hasher } from "../criptografia/hasher";
import { BuscarUsuarioPorEmailRepository } from "../protocols/buscar-usuario-email-repository";

export class DdAutenticacao implements Autenticacao {
  constructor(
    private readonly buscarUsuarioPorEmailRepository: BuscarUsuarioPorEmailRepository,
    private readonly hasher: Hasher,
    private readonly crypter: Crypter
  ) {}

  async autenticar(autenticacao: AutenticacaoModel): Promise<string> {
    const usuario = await this.buscarUsuarioPorEmailRepository.buscarPorEmail(
      autenticacao.email
    );
    const isEquals = await this.hasher.compare(
      autenticacao.password,
      usuario.password
    );
    if (isEquals) {
      const accessToken = await this.crypter.encrypt(usuario.id);
      return accessToken;
    }

    return null;
  }
}
