export class ParamError extends Error {
  constructor(param: string) {
    super(`Parâmetro ${param} é obrigatório`);
    this.name = "ParamError";
  }
}
