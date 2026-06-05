import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import {
  authQueryKeys,
  type LoginPayload,
  type RegisterPayload,
} from "@/app/api/auth.types.ts";
import { useAuthStore } from "@/app/modules/Auth/authStore.ts";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const response = await ApiClient.auth.authControllerLogin(payload);
      return response.data;
    },
    onSuccess(response) {
      setSession(response.accessToken, response.user);
      queryClient.setQueryData(authQueryKeys.currentUser, response.user);
    },
  });
};
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await ApiClient.auth.authControllerRegister(payload);
      return response.data;
    },
    onSuccess(response) {
      setSession(response.accessToken, response.user);
      queryClient.setQueryData(authQueryKeys.currentUser, response.user);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const clearSession = useAuthStore((state) => state.clearSession);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return useMutation({
    mutationFn: async () => {
      if (isLoggedIn) {
        await ApiClient.auth.authControllerLogout();
      }
    },
    onSettled() {
      clearSession();
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });
};
