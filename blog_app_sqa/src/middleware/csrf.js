import Tokens from "csrf";

const tokens = new Tokens();
const secret = process.env.CSRF_SECRET || tokens.secretSync();

export function generateToken() {
  return tokens.create(secret);
}

export function verifyToken(token) {
  return tokens.verify(secret, token);
}
