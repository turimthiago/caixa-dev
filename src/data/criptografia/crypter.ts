export interface Crypter {
  encrypt(value: string): Promise<string>;
  decrypt(cryptText: string): Promise<any>;
}
