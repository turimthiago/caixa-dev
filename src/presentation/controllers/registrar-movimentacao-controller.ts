import { Request, Response } from "express";
import { Controller } from "../protocols/controller";

export class RegistrarMovimentacaoController implements Controller{

    handle(httpRequest: Request, httpResponse: Response): Promise<Response>{

    }

}