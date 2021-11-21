import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export async function bcryptHash(plaintext: string): Promise<string> {
  const hashed = await bcrypt.hash(plaintext, saltRounds);
  return hashed;
}

export async function bcryptCompare(
  plaintext: string,
  hash: string,
): Promise<boolean> {
  const result = await bcrypt.compare(plaintext, hash);
  return result;
}
