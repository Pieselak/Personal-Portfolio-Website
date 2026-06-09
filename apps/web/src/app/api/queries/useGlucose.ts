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
  GetGlucoseManagementIndicatorResponse,
  GetGlucoseAvailabilityResponse,
} from "@/app/api/generated-api.ts";

export const useGlucoseAvailability = () => {
  return useQuery({
    queryKey: ["glucose", "availability"],
    queryFn: () => ApiClient.glucose.glucoseControllerGetAvailability(),
    select: (response): GetGlucoseAvailabilityResponse => response.data,
    staleTime: 30 * 1000,
    refetchInterval: (query) => {
      const data = query.state.data as
        | GetGlucoseAvailabilityResponse
        | undefined;
      return data?.reason === "INITIALIZING" ? 30 * 1000 : false;
    },
  });
};

export const useGlucoseCurrent = () => {
  return useQuery({
    queryKey: ["glucose", "current"],
    queryFn: () => ApiClient.glucose.glucoseControllerGetCurrentGlucose(),
    select: (response): GetCurrentGlucoseResponse => response.data,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
  });
};

export const useGlucoseGraph = (hours?: number) => {
  return useQuery({
    queryKey: ["glucose", "graph", hours],
    queryFn: () => ApiClient.glucose.glucoseControllerGetGraphData(),
    select: (response): GetGraphDataResponse => response.data,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    placeholderData: (previousData) => previousData,
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
    placeholderData: (previousData) => previousData,
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
    placeholderData: (previousData) => previousData,
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
    placeholderData: (previousData) => previousData,
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
    placeholderData: (previousData) => previousData,
  });
};

export const useGlucoseManagementIndicator = (hours?: number) => {
  return useQuery({
    queryKey: ["glucose", "gmi", hours],
    queryFn: () =>
      ApiClient.glucose.glucoseStatisticsControllerGetGlucoseManagementIndicator(
        {
          hours,
        },
      ),
    select: (response): GetGlucoseManagementIndicatorResponse => response.data,
    placeholderData: (previousData) => previousData,
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
