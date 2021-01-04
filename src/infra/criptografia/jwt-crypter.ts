import jwt from "jsonwebtoken";
import { Crypter } from "../../data/criptografia/crypter";

export class JwtCrypter implements Crypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return await jwt.sign({ id: value }, this.secret);
  }
  async decrypt(cryptText: string): Promise<any> {
    return await jwt.verify(cryptText, this.secret) as any;
  }
}
