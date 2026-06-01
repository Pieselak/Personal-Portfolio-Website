import { useQuery } from "@tanstack/react-query";
import { ApiClient } from "@/app/api/client.ts";
import type {
  GetAverageGlucoseResponse,
  GetCurrentGlucoseResponse,
  GetGraphDataResponse,
  GetHighestGlucoseResponse,
  GetLowestGlucoseResponse,
  GetSensorDataResponse,
  GetTimeInRangeResponse,
} from "@/app/api/generated-api.ts";

export const useGlucoseCurrent = () => {
  return useQuery({
    queryKey: ["glucose", "current"],
    queryFn: () => ApiClient.glucose.glucoseControllerGetCurrentGlucose(),
    select: (response): GetCurrentGlucoseResponse => response.data,
    staleTime: (response: any) => response?.data?.refreshIn ?? 60 * 1000,
    refetchInterval: (response: any) => response?.data?.refreshIn ?? 60 * 1000,
  });
};

export const useGlucoseGraph = () => {
  return useQuery({
    queryKey: ["glucose", "graph"],
    queryFn: () => ApiClient.glucose.glucoseControllerGetGraphData(),
    select: (response): GetGraphDataResponse => response.data,
    staleTime: (response: any) => response?.data?.refreshIn ?? 60 * 1000,
    refetchInterval: (response: any) => response?.data?.refreshIn ?? 60 * 1000,
  });
};

export const useGlucoseSensor = () => {
  return useQuery({
    queryKey: ["glucose", "sensor"],
    queryFn: () => ApiClient.glucose.glucoseControllerGetSensorData(),
    select: (response): GetSensorDataResponse => response.data,
  });
};

export const useGlucoseTimeInRange = (hours?: number) => {
  return useQuery({
    queryKey: ["glucose", "time-in-range", hours],
    queryFn: () =>
      ApiClient.glucose.glucoseStatisticsControllerGetTimeInRange({
        hours,
      }),
    select: (response): GetTimeInRangeResponse => response.data,
  });
};

export const useGlucoseAverage = (hours?: number) => {
  return useQuery({
    queryKey: ["glucose", "average", hours],
    queryFn: () =>
      ApiClient.glucose.glucoseStatisticsControllerGetAverageGlucose({
        hours,
      }),
    select: (response): GetAverageGlucoseResponse => response.data,
  });
};

export const useGlucoseLowest = (hours?: number) => {
  return useQuery({
    queryKey: ["glucose", "lowest", hours],
    queryFn: () =>
      ApiClient.glucose.glucoseStatisticsControllerGetLowestGlucose({
        hours,
      }),
    select: (response): GetLowestGlucoseResponse => response.data,
  });
};

export const useGlucoseHighest = (hours?: number) => {
  return useQuery({
    queryKey: ["glucose", "highest", hours],
    queryFn: () =>
      ApiClient.glucose.glucoseStatisticsControllerGetHighestGlucose({
        hours,
      }),
    select: (response): GetHighestGlucoseResponse => response.data,
  });
};

export const useGlucoseModes = () => {
  return useQuery({
    queryKey: ["glucose", "mode"],
    queryFn: () =>
      ApiClient.glucose.glucoseSettingsControllerGetProviderModes(),
    select: (response) => response.data,
  });
};
