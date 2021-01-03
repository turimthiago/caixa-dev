export class TipoDeMovimentacaoInvalidaError extends Error {
  constructor() {
    super("Tipo de movimentação inválida");
    this.name = "TipoDeMovimentacaoInvalidaError";
  }
}
