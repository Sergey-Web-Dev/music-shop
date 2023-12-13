export type JwtPayload = {
  sub: string;
  email: string;
}

export type UserFromToken = {
  sub: string;
  email: string;
  iat: string;
  exp: string;
}