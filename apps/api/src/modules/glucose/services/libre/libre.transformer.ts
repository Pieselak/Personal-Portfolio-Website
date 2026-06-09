import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';
import {
  GlucoseColors,
  GlucoseSensors,
  GlucoseStatus,
  GlucoseTrends,
  GlucoseUnits,
} from '../../glucose.enum';
import { GlucoseData } from '../../glucose.types';
import { LibreApiResponse } from '../../dto/external/libreResponse.dto';

export class GlucoseLibreTransformer {
  private transformTimestamp(timestamp: string): number {
    return new Date(`${timestamp} UTC`).getTime();
  }

  transform(data: LibreApiResponse): GlucoseData {
    const currentTimestamp = Date.now();
    const glucoseTimestamp = this.transformTimestamp(
      data.connection.glucoseMeasurement.FactoryTimestamp,
    );

    // [ Sensor Data ]
    // Is sensor active
    const sensorIsActive: boolean = data.activeSensors.length > 0;
    // Sensor name
    const sensorName: GlucoseSensors | null = sensorIsActive
      ? GlucoseSensors.LIBRE
      : null; // HARD-CODED (Can't get Libre sensor generation from API)
    // Sensor image
    const sensorImage: string | null = sensorIsActive
      ? GLUCOSE_CONSTANTS.IMAGES.LIBRE
      : null;
    // Sensor activated at
    const sensorActivatedAt: number | null = sensorIsActive
      ? data.activeSensors[0].sensor.a * GLUCOSE_CONSTANTS.SEC_TO_MS
      : null;
    // Sensor expire at
    const sensorExpireAt: number | null = sensorIsActive
      ? (data.activeSensors[0].sensor.a +
          GLUCOSE_CONSTANTS.LIBRE.SENSOR_LIFETIME_SEC) *
        GLUCOSE_CONSTANTS.SEC_TO_MS
      : null;
    // Sensor expire in
    const sensorExpireIn: number | null =
      sensorIsActive && sensorExpireAt
        ? sensorExpireAt - currentTimestamp
        : null;

    // [ Current Glucose ]
    // Is glucose current (up to date)
    const glucoseIsCurrent =
      sensorIsActive &&
      currentTimestamp - glucoseTimestamp <=
        2 * GLUCOSE_CONSTANTS.LIBRE.FETCH_TIMEOUT_MS;

    // Glucose unit
    let glucoseUnit: GlucoseUnits;
    switch (data.connection.glucoseMeasurement.GlucoseUnits) {
      case 0:
        glucoseUnit = GlucoseUnits.MMOL_L;
        break;
      case 1:
      default:
        glucoseUnit = GlucoseUnits.MG_DL;
        break;
    }

    // Glucose color
    let glucoseColor: GlucoseColors;
    switch (data.connection.glucoseMeasurement.MeasurementColor) {
      case 1:
        glucoseColor = GlucoseColors.GREEN;
        break;
      case 2:
        glucoseColor = GlucoseColors.YELLOW;
        break;
      case 3:
        glucoseColor = GlucoseColors.ORANGE;
        break;
      case 4:
        glucoseColor = GlucoseColors.RED;
        break;
      case 0:
      default:
        glucoseColor = GlucoseColors.NONE;
        break;
    }
    if (!glucoseIsCurrent) glucoseColor = GlucoseColors.NONE;

    // Glucose trend
    let glucoseTrend: GlucoseTrends;
    switch (data.connection.glucoseMeasurement.TrendArrow) {
      case 1:
        glucoseTrend = GlucoseTrends.FALLING;
        break;
      case 2:
        glucoseTrend = GlucoseTrends.FALLING_SLOW;
        break;
      case 3:
        glucoseTrend = GlucoseTrends.STABLE;
        break;
      case 4:
        glucoseTrend = GlucoseTrends.RISING_SLOW;
        break;
      case 5:
        glucoseTrend = GlucoseTrends.RISING;
        break;
      default:
        glucoseTrend = GlucoseTrends.NONE;
    }
    if (!glucoseIsCurrent) glucoseTrend = GlucoseTrends.NONE;

    // Glucose status
    let glucoseStatus: GlucoseStatus = GlucoseStatus.COMPUTABLE;
    if (data.connection.glucoseMeasurement.isHigh) {
      glucoseStatus = GlucoseStatus.HIGH;
    } else if (data.connection.glucoseMeasurement.isLow) {
      glucoseStatus = GlucoseStatus.LOW;
    }

    return {
      timestamp: glucoseTimestamp,
      unit: glucoseUnit,
      currentGlucose: {
        isCurrent: glucoseIsCurrent,
        value: data.connection.glucoseMeasurement.Value,
        unit: glucoseUnit,
        trend: glucoseTrend,
        color: glucoseColor,
        status: glucoseStatus,
        timestamp: glucoseTimestamp,
        refreshAt: 0,
        refreshIn: 0,
      },
      graphData: {
        data: data.graphData.map((reading) => {
          // Glucose unit
          let graphUnit: GlucoseUnits;
          switch (reading.GlucoseUnits) {
            case 0:
              graphUnit = GlucoseUnits.MMOL_L;
              break;
            case 1:
            default:
              graphUnit = GlucoseUnits.MG_DL;
              break;
          }

          // Glucose color
          let graphColor: GlucoseColors;
          switch (reading.MeasurementColor) {
            case 1:
              graphColor = GlucoseColors.GREEN;
              break;
            case 2:
              graphColor = GlucoseColors.YELLOW;
              break;
            case 3:
              graphColor = GlucoseColors.ORANGE;
              break;
            case 4:
              graphColor = GlucoseColors.RED;
              break;
            case 0:
            default:
              graphColor = GlucoseColors.NONE;
              break;
          }

          // Glucose status
          let graphStatus: GlucoseStatus = GlucoseStatus.COMPUTABLE;
          if (reading.isHigh) {
            graphStatus = GlucoseStatus.HIGH;
          } else if (reading.isLow) {
            graphStatus = GlucoseStatus.LOW;
          }

          return {
            value: reading.Value,
            unit: graphUnit,
            color: graphColor,
            status: graphStatus,
            timestamp: this.transformTimestamp(reading.FactoryTimestamp),
          };
        }),
        targetLow: data.connection.targetLow,
        targetHigh: data.connection.targetHigh,
        levelLow: data.connection.alarmRules.f.th,
        levelHigh: data.connection.alarmRules.h.th,
        refreshAt: 0,
        refreshIn: 0,
      },
      sensorData: {
        isActive: sensorIsActive,
        name: sensorName,
        image: sensorImage,
        activatedAt: sensorActivatedAt,
        lastUploadAt: sensorIsActive ? glucoseTimestamp : null,
        expireAt: sensorExpireAt,
        expireIn: sensorExpireIn,
      },
    };
  }
}
