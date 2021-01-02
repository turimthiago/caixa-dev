export class CategoriaNaoExisteError extends Error {
  constructor() {
    super("Categoria não existe");
    this.name = "CategoriaNaoExisteError";
  }
}
