import { NextFunction, Request, Response } from "express";
import { Crypter } from "../../data/criptografia/crypter";
import { BuscarUsuarioPorIdRepository } from "../../data/protocols/buscar-usuario-id-repository";
import { Middleware } from "../protocols/middleware";

export class AutenticationMiddleware implements Middleware {
  constructor(
    private readonly buscarUsuarioPorIdRespositorio: BuscarUsuarioPorIdRepository,
    private readonly crypter: Crypter
  ) {}

  async handle(
    httpRequest: Request,
    httpResponse: Response,
    next: NextFunction
  ): Promise<void> {
    const accessToken = httpRequest.headers?.["x-access-token"] as string;
    try {
      const dataToken = await this.crypter.decrypt(accessToken);
      const usuario = await this.buscarUsuarioPorIdRespositorio.buscarPorId(
        dataToken.id
      );
      Object.assign(httpRequest, { id: usuario.id });
      next();
    } catch (error) {
      httpResponse.status(403).json({ message: "Acesso Negado" });
    }
  }
}
