export class MovimentacaoParamError extends Error {
  constructor(param: string) {
    super(`Parâmetro ${param} obrigatório não existe`);
    this.name = "MovimentacaoParamError";
  }
}
