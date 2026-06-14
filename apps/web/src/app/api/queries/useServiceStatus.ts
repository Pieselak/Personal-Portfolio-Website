import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import { apiQueryKeys } from "@/app/api/queryKeys.ts";

export const useServiceStatus = () => {
  return useQuery({
    queryKey: apiQueryKeys.serviceStatus,
    queryFn: async () =>
      (await ApiClient.status.statusControllerGetStatus()).data,
    refetchInterval: 30_000,
    refetchIntervalInBackground: true,
    retry: 1,
    staleTime: 10_000,
  });
};
