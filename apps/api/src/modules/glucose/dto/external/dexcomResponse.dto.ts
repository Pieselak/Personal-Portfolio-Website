export interface DexcomApiEgvsRecord {
  recordId: string;
  systemTime: string;
  displayTime: string;
  transmitterId: string | null;
  transmitterTicks: number;
  value: number | null;
  status: string | null;
  trend: string | null;
  trendRate: number | null;
  unit: string;
  rateUnit: string;
  displayDevice: string;
  transmitterGeneration: string;
  displayApp: string | null;
}

export interface DexcomApiEgvsResponse {
  recordType: string;
  recordVersion: string;
  userId: string;
  records: DexcomApiEgvsRecord[];
}

export interface DexcomApiDevicesRecord {
  transmitterGeneration: string;
  transmitterGenerationVariant: string;
  displayDevice: string;
  displayApp: string;
  lastUploadDate: string;
  alertSchedules: Array<any>;
  transmitterId: string;
}

export interface DexcomApiDevicesResponse {
  recordType: string;
  recordVersion: string;
  userId: string;
  records: DexcomApiDevicesRecord[];
}

export interface DexcomApiDataRangeResponse {
  recordType: string;
  recordVersion: string;
  userId: string;
  egvs: {
    start: {
      systemTime: string;
      displayTime: string;
    };
    end: {
      systemTime: string;
      displayTime: string;
    };
  };
}
