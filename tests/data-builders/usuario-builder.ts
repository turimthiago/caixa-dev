import { Usuario } from "../../src/domain/models";

export class UsuarioBuilder {
  private usuario: Usuario = {
    email: "any_email",
    password: "any_password",
    id: "any_id",
  };

  public static usuario(): UsuarioBuilder {
    return new UsuarioBuilder();
  }

  public comId(): UsuarioBuilder {
    this.usuario.id = "valid_id";
    return this;
  }

  public semId(): UsuarioBuilder {
    this.usuario.id = "";
    return this;
  }

  public comSenhaCriptografada(): UsuarioBuilder {
    this.usuario.password = "hashed_password";
    return this;
  }

  public emailValido(): UsuarioBuilder {
    this.usuario.email = "valid_email@email.com";
    return this;
  }

  public senhaValida(): UsuarioBuilder {
    this.usuario.password = "valid_password";
    return this;
  }

  public senhaValidaCriptografada(): UsuarioBuilder {
    this.usuario.password = "valid_hashed_password";
    return this;
  }

  public build(): Usuario {
    return this.usuario;
  }
}
