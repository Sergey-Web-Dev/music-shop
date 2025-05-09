export type JwtPayload = {
  id: string;
  email: string;
}

export type UserFromToken = {
  id: string;
  email: string;
  iat: string;
  exp: string;
}