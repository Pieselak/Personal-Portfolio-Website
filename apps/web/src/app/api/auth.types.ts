export type LoginPayload = {
  identifier: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  username: string;
  password: string;
};

export const authQueryKeys = {
  currentUser: ["auth", "currentUser"] as const,
};
