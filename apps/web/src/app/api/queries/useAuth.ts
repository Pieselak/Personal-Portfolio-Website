import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import { useAuthStore } from "@/app/modules/Auth/authStore.ts";
import { authQueryKeys } from "@/app/api/auth.types.ts";

export const useCurrentUser = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: [authQueryKeys.currentUser],
    queryFn: async () => {
      const response = await ApiClient.auth.authControllerMe();
      return response.data;
    },
    enabled: Boolean(accessToken),
  });
};
