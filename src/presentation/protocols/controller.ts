//import { HttpRequest, HttpResponse } from "./http";

import { Request, Response } from "express";

export interface Controller {
  handle(httpRequest: Request, httpResponse: Response): Promise<Response>;
}
