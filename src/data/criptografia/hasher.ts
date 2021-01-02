export interface Hasher {
  hash(value: string): Promise<string>;
  compare(value: string, hash: string): Promise<Boolean>;
}