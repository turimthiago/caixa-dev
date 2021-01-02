export class ParamError extends Error {
  constructor(param: string) {
    super(`Parâmetro ${param} obrigatório é obrigatório`);
    this.name = "ParamError";
  }
}
