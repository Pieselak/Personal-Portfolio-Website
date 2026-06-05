export interface AuthenticatedUser {
  uuid: string;
  email: string;
  username: string;
  role: string;
  permissions: string[];
  tokenId: string;
  tokenExpiresAt?: number;
}
