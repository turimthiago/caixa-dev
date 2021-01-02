import bcrypt from "bcrypt";
import { Hasher } from "../../data/criptografia/hasher";

export class BcryptAdapter implements Hasher {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async compare(value: string, hash: string): Promise<Boolean> {
    const isEquals = await bcrypt.compare(value, hash);
    return isEquals;
  }

  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt);
  }
}
