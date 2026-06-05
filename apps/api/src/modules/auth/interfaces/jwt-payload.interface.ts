export interface JwtPayload {
  sub: string;
  email: string;
  username: string;
  role: string;
  permissions: string[];
  jti: string;
  iat?: number;
  exp?: number;
}
