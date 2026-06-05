export interface LibreApiTicketRecord {
  token: string;
  expires: number;
  duration: number;
}

export interface LibreApiGlucoseRecord {
  FactoryTimestamp: string;
  type: number;
  MeasurementColor: number;
  GlucoseUnits: number;
  Value: number;
  isHigh: boolean;
  isLow: boolean;
}

export interface LibreApiGlucoseMeasurementRecord extends LibreApiGlucoseRecord {
  TrendArrow: number;
}

export interface LibreApiSensorRecord {
  sensor: {
    a: number;
  };
}

export interface LibreApiResponse {
  connection: {
    targetLow: number;
    targetHigh: number;
    alarmRules: {
      h: {
        th: number;
      };
      l: {
        th: number;
      };
      f: {
        th: number;
      };
    };
    glucoseMeasurement: LibreApiGlucoseMeasurementRecord;
    patientDevice: {
      ll: number;
      hl: number;
    };
  };
  activeSensors: LibreApiSensorRecord[];
  graphData: LibreApiGlucoseRecord[];
}
