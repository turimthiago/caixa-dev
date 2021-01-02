export interface AutenticacaoModel {
  email: string;
  password: string;
}

export interface Autenticacao {
  autenticar(autenticacao: AutenticacaoModel): Promise<string>;
}
