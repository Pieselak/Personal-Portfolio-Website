import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import { apiQueryKeys } from "@/app/api/queryKeys.ts";

export function usePublicBosses(language: string) {
  const lang = language === "en" || language === "de" ? language : "pl";

  return useQuery({
    queryKey: apiQueryKeys.publicBosses(lang),
    queryFn: async () =>
      (await ApiClient.game.gameControllerGetBosses({ lang })).data,
  });
}
