import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthPermission = {
  code: string;
  label?: string;
};

export type AuthRole = {
  code: string;
  label: string;
  permissions: string[];
};

export type AuthUser = {
  uuid: string;
  email: string;
  username: string;
  isActive: boolean;
  role: AuthRole;
};

type AuthStore = {
  isLoggedIn: boolean;
  accessToken?: string;
  user?: AuthUser;
  setSession: (accessToken: string, user: AuthUser) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: undefined,
      user: undefined,
      setSession: (accessToken, user) =>
        set({ accessToken, user, isLoggedIn: true }),
      clearSession: () =>
        set({ accessToken: undefined, user: undefined, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
