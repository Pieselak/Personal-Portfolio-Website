import { GLUCOSE_CONSTANTS } from '../../../../constants/glucose.constants';
import {
  GlucoseColors,
  GlucoseSensors,
  GlucoseStatus,
  GlucoseTrends,
  GlucoseUnits,
} from '../../glucose.enum';
import { GlucoseData } from '../../glucose.types';
import {
  DexcomApiDevicesResponse,
  DexcomApiEgvsResponse,
} from '../../dto/external/dexcomResponse.dto';

export class GlucoseDexcomTransformer {
  transform(
    egvsData: DexcomApiEgvsResponse,
    deviceData: DexcomApiDevicesResponse,
  ): GlucoseData {
    const currentTimestamp = Date.now();
    const glucoseTimestamp =
      egvsData.records.length > 0
        ? new Date(egvsData.records[0].systemTime).getTime()
        : currentTimestamp;

    // [ Sensor Data ]
    // Is sensor active
    const sensorIsActive: boolean = deviceData.records.length > 0;
    // Sensor name
    let sensorName: GlucoseSensors | null = null;
    if (sensorIsActive) {
      switch (deviceData.records[0].transmitterGeneration) {
        case 'd1+':
          sensorName = GlucoseSensors.DEXCOM_ONE_PLUS;
          break;
        case 'g6':
          sensorName = GlucoseSensors.DEXCOM_G6;
          break;
        case 'g7':
          sensorName = GlucoseSensors.DEXCOM_G7;
          break;
      }
    }

    // Sensor image
    const sensorImage: string | null = sensorIsActive
      ? GLUCOSE_CONSTANTS.IMAGES.DEXCOM
      : null;
    const sensorActivatedAt: number | null = sensorIsActive
      ? currentTimestamp -
        egvsData.records[0].transmitterTicks * GLUCOSE_CONSTANTS.SEC_TO_MS
      : null;

    // Sensor expire at
    const sensorExpireAt: number | null = sensorIsActive
      ? currentTimestamp +
        egvsData.records[0].transmitterTicks * GLUCOSE_CONSTANTS.SEC_TO_MS
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
        2 * GLUCOSE_CONSTANTS.DEXCOM.FETCH_TIMEOUT_MS;

    // Glucose unit
    let glucoseUnit: GlucoseUnits;
    switch (egvsData.records[0].unit) {
      case 'mmol/L':
        glucoseUnit = GlucoseUnits.MMOL_L;
        break;
      case 'mg/dL':
      default:
        glucoseUnit = GlucoseUnits.MG_DL;
        break;
    }

    // Glucose color
    let glucoseColor: GlucoseColors;
    switch (egvsData.records[0].status) {
      case 'low':
        glucoseColor = GlucoseColors.RED;
        break;
      case 'high':
        glucoseColor = GlucoseColors.YELLOW;
        break;
      default:
        glucoseColor = GlucoseColors.NONE;
        break;
    }
    if (!glucoseIsCurrent) glucoseColor = GlucoseColors.NONE;

    // Glucose trend
    let glucoseTrend: GlucoseTrends;
    switch (egvsData.records[0].trend) {
      case 'doubleDown':
        glucoseTrend = GlucoseTrends.FALLING_FAST;
        break;
      case 'singleDown':
        glucoseTrend = GlucoseTrends.FALLING;
        break;
      case 'fortyFiveDown':
        glucoseTrend = GlucoseTrends.FALLING_SLOW;
        break;
      case 'flat':
        glucoseTrend = GlucoseTrends.STABLE;
        break;
      case 'fortyFiveUp':
        glucoseTrend = GlucoseTrends.RISING_SLOW;
        break;
      case 'singleUp':
        glucoseTrend = GlucoseTrends.RISING;
        break;
      case 'doubleUp':
        glucoseTrend = GlucoseTrends.RISING_FAST;
        break;
      default:
        glucoseTrend = GlucoseTrends.NONE;
    }
    if (!glucoseIsCurrent) glucoseTrend = GlucoseTrends.NONE;

    // Glucose status
    let glucoseStatus: GlucoseStatus = GlucoseStatus.COMPUTABLE;
    if (egvsData.records[0].status === 'high') {
      glucoseStatus = GlucoseStatus.HIGH;
    } else if (egvsData.records[0].status === 'low') {
      glucoseStatus = GlucoseStatus.LOW;
    }

    return {
      timestamp: glucoseTimestamp,
      unit: glucoseUnit,
      currentGlucose: {
        isCurrent: glucoseIsCurrent,
        value: egvsData.records[0].value || 0,
        unit: glucoseUnit,
        trend: glucoseTrend,
        color: glucoseColor,
        status: glucoseStatus,
        timestamp: glucoseTimestamp,
        refreshAt: 0,
        refreshIn: 0,
      },
      graphData: {
        data: egvsData.records.map((reading) => {
          // Glucose unit
          let graphUnit: GlucoseUnits;
          switch (reading.unit) {
            case 'mmol/L':
              graphUnit = GlucoseUnits.MMOL_L;
              break;
            case 'mg/dL':
            default:
              graphUnit = GlucoseUnits.MG_DL;
              break;
          }

          // Glucose color
          let graphColor: GlucoseColors;
          switch (reading.status) {
            case 'low':
              graphColor = GlucoseColors.RED;
              break;
            case 'high':
              graphColor = GlucoseColors.YELLOW;
              break;
            default:
              graphColor = GlucoseColors.NONE;
              break;
          }

          // Glucose status
          let graphStatus: GlucoseStatus = GlucoseStatus.COMPUTABLE;
          if (reading.status === 'high') {
            graphStatus = GlucoseStatus.HIGH;
          } else if (reading.status === 'low') {
            graphStatus = GlucoseStatus.LOW;
          }

          return {
            value: reading.value || 0,
            unit: graphUnit,
            color: graphColor,
            status: graphStatus,
            timestamp: new Date(reading.systemTime).getTime(),
          };
        }),
        targetLow: 70, // Hardcoded target range, as Dexcom API does not provide this data
        targetHigh: 180, // Hardcoded target range, as Dexcom API does not provide this data
        levelLow: 55, // Hardcoded target range, as Dexcom API does not provide this data
        levelHigh: 250, // Hardcoded target range, as Dexcom API does not provide this data
        refreshAt: 0,
        refreshIn: 0,
      },
      sensorData: {
        isActive: sensorIsActive,
        name: sensorName,
        image: sensorImage,
        activatedAt: sensorActivatedAt,
        lastUploadAt: sensorIsActive
          ? new Date(deviceData.records[0].lastUploadDate).getTime()
          : null,
        expireAt: sensorExpireAt,
        expireIn: sensorExpireIn,
      },
    };
  }
}
