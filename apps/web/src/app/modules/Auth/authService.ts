import { useAuthStore } from "./authStore";
import { useCurrentUserStore } from "@/app/modules/Storage/useCurrentUserStore.ts";

export const authService = {
  logout() {
    useAuthStore.setState({ isLoggedIn: false });
    useCurrentUserStore.setState({ currentUser: undefined });
  },
};
