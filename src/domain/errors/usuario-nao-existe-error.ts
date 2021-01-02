export class UsuarioNaoExisteError extends Error {
  constructor() {
    super("Usuário não existe");
    this.name = "UsuarioNaoExisteError";
  }
}
