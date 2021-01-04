import { NextFunction, Request, Response } from "express";

export interface Middleware {
  handle(
    httpRequest: Request,
    httpResponse: Response,
    next: NextFunction
  ): Promise<void>;
}
