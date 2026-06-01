/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ComDexcomPartnerApiModelsProtoV3AlertAlertEventWrapper {
  /**
   * The type of records that will be returned in this response.
   * Example: "alert"
   */
  recordType: string;
  /**
   * The version of the records that will be returned in this response.
   * Example: “3.0”
   */
  recordVersion: string;
  /** The user ID is unique on a per-Dexcom account, per-Client basis.The ID will not be the same for a user across clients (even if the clients are owned by the same developer). */
  userId: string;
  /** Array of alerts. The size of the array will be zero if there are no alerts. */
  records: ComDexcomPartnerApiModelsProtoV3AlertAlertEvent[];
}

export interface ComDexcomPartnerApiModelsProtoV3AlertAlertEvent {
  /** A unique id (UUID) that identifies the alert. */
  recordId: string;
  /**
   * The recorded system time of the alerts/egv/calibration/event. This is the ISO 8601 time according to the system clock at which observation was made (UTC). Records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
   * @format date-time
   */
  systemTime: string;
  /**
   * The recorded display time of the alerts/egv/calibration/event. This is the ISO 8601 time displayed on the receiving device when the observation was made (local).
   * Records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
   * @format date-time
   */
  displayTime: string;
  /** The name of the alert. */
  alertName:
    | 'unknown'
    | 'high'
    | 'low'
    | 'rise'
    | 'fall'
    | 'outOfRange'
    | 'urgentLow'
    | 'urgentLowSoon'
    | 'noReadings';
  /** The state of the alert. */
  alertState: 'unknown' | 'inactive' | 'activeSnoozed' | 'activeAlarming';
  /**
   * The type of display device the alert came from.
   * Enum: "unknown" "receiver" "iOS" "android"
   */
  displayDevice: string;
  /** The generation of transmitter that was associated with this upload. */
  transmitterGeneration: 'unknown' | 'g6' | 'g6+' | 'g6Pro' | 'g7';
  /** The generationVariant of transmitter that was associated with this upload. */
  transmitterGenerationVariant: 'd1+' | 'g6' | 'g7' | 'g715day';
  /**
   * A hashed and encrypted version of the unique ID of the transmitter.
   * This may be used to determine uniqueness of transmitter or associate multiple records with the same transmitter, but it cannot be matched to the real transmitter ID.
   */
  transmitterId: string;
  /** App that is installed on the display device. For example, G6, G7, DexcomOne, D1G7. */
  displayApp: string;
}

export interface ComDexcomPartnerApiModelsProtoV3EgvEGVWrapper {
  /**
   * The type of records that will be returned in this response.
   * Example: "egv"
   */
  recordType: string;
  /**
   * The version of the records that will be returned in this response.
   * Example: “3.0”
   */
  recordVersion: string;
  /** The user ID is unique on a per-Dexcom account, per-Client basis. The ID will not be the same for a user across clients (even if the clients are owned by the same developer). */
  userId: string;
  /** Array of egvs. The size of the array will be zero if there are no egvs. */
  records: ComDexcomPartnerApiModelsProtoV3EgvEGV[];
}

export interface ComDexcomPartnerApiModelsProtoV3EgvEGV {
  /** A unique id (UUID) that identifies EGV record for the given client. */
  recordId: string;
  /**
   * The recorded system time of the alerts/egv/calibration/event. This is the ISO 8601 time according to the system clock at which observation was made (UTC).
   * Records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
   * @format date-time
   */
  systemTime: string;
  /**
   * The recorded display time of the alerts/egv/calibration/event. This is the ISO 8601 time displayed on the receiving device when the observation was made (local).
   * Records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
   * @format date-time
   */
  displayTime: string;
  /** A hashed and encrypted version of the unique ID of the transmitter. This may be used to determine uniqueness of transmitter or associate multiple records with the same transmitter, but it cannot be matched to the real transmitter ID. */
  transmitterId?: string | null;
  /**
   * The count, in seconds, since the transmitter was initiated. Example: 72364324786
   * @format int64
   */
  transmitterTicks: number;
  /**
   * Estimated glucose value EGV
   * * 39: Indicates that the value was calculated, and it was less than 40; the value 39 is used in calculations but is not explicitly displayed to end users
   * * 40 to 400: This is the measuring range of the Dexcom CGM.
   * * 401: Indicates that the value was calculated, and it was greater than 400; the value 401 is used in calculations but is not explicitly displayed to end users.
   * @format int32
   */
  value?: number | null;
  /**
   * Explanation of EGV record; used when the value field is outside the measuring
   * range.
   *
   * "high": indicates a glucose value of more than 400
   *
   * "low": indicates a glucose value of less than 40
   */
  status?: 'high' | 'low' | null;
  /**
   * General trend of EGV value movement; corresponds to the trendRate field:
   * * "doubleUp" (+3 ≤ trendRate ≤ +8)
   * * "singleUp" (+2 ≤ trendRate &lt; +3)
   * * "fortyFiveUp" (+1 ≤ trendRate &lt; +2)
   * * "flat" (-1 &lt; trendRate &lt; +1)
   * * "fortyFiveDown" (-2 &lt; trendRate ≤ -1)
   * * "singleDown" (-3 &lt; trendRate ≤ -2)
   * * "doubleDown" (-8 &lt; trendRate ≤ -3)
   * * "none" (no arrow (blank))
   * * "notComputable" (The algorithm decides that it is not reasonable to compute trend arrow)
   * * "rateOutOfRange" (The computed filtered rate is not within the range for assigning the arrows)
   */
  trend?:
    | 'none'
    | 'unknown'
    | 'doubleUp'
    | 'singleUp'
    | 'fortyFiveUp'
    | 'flat'
    | 'fortyFiveDown'
    | 'singleDown'
    | 'doubleDown'
    | 'notComputable'
    | 'rateOutOfRange'
    | null;
  /**
   * Rate at which glucose value is moving up or down.
   * @format double
   */
  trendRate?: number | null;
  /**
   * Unit of measurement for value.
   *
   * Enum: "unknown" "mg/dL" "mmol/L"
   *
   * Please note all glucose values are reported in units of mg/dL and trend rates in units of mg/dL/min. Conversion of these values into user-preferred units, such as mmol/L, is the responsibility of the client application.
   */
  unit: string;
  /**
   * Unit of measurement for trendRate.
   *
   * Enum: "mg/dL/min" "mmol/L/min"
   *
   * Please note all glucose values are reported in units of mg/dL and trend rates in units of mg/dL/min. Conversion of these values into user-preferred units, such as mmol/L, is the responsibility of the client application.
   */
  rateUnit: string;
  /**
   * The type of display device the egv came from.
   * Enum: "unknown""receiver" "iOS" "android"
   */
  displayDevice: string;
  /** The generation of transmitter that was associated with this upload. */
  transmitterGeneration: 'unknown' | 'g6' | 'g6+' | 'g6Pro' | 'g7';
  /** The generationVariant of transmitter that was associated with this upload. */
  transmitterGenerationVariant: 'd1+' | 'g6' | 'g7' | 'g715day';
  /** App that is installed on the display device. For example, G6, G7, DexcomOne, D1G7. */
  displayApp?: string | null;
}

export interface ComDexcomPartnerApiModelsProtoV3EventEventsWrapper {
  /**
   * The type of records that will be returned in this response.
   * Example: “event”
   */
  recordType: string;
  /**
   * The version of records that will be returned in this response.
   * Example: “3.0”
   */
  recordVersion: string;
  /** This ID is unique on a per-Dexcom account, per-client basis, and will thus not be the same for a user across clients (even if the clients are owned by the same developer). */
  userId: string;
  /**
   * Array of events. The size of the array will be zero if there are no events.
   * Example: events[]
   */
  records: ComDexcomPartnerApiModelsProtoV3EventEvent[];
}

export interface ComDexcomPartnerApiModelsProtoV3EventEvent {
  /**
   * The recorded system time of the alerts/egv/calibration/event. This is the ISO 8601 time according to the system clock at which observation was made (UTC).
   * Records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
   * @format date-time
   */
  systemTime: string;
  /**
   * The recorded display time of the alerts/egv/calibration/event. This is the ISO 8601 time displayed on the receiving device when the observation was made (local).
   * Records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
   * Maps to EventDisplayTime
   * @format date-time
   */
  displayTime: string;
  /** A unique ID for the event record. */
  recordId: string;
  /** Describes the status of the record being posted from the health database. It describes if it is a brand-new entry, or if the record has been modified, or if the record has been deleted by the user. */
  eventStatus: 'created' | 'updated' | 'deleted';
  /** Name of the event. */
  eventType:
    | 'unknown'
    | 'insulin'
    | 'carbs'
    | 'exercise'
    | 'health'
    | 'bloodGlucose'
    | 'notes';
  /**
   * Additional event description corresponding to eventType field.
   * * for eventType "carbs": null
   * *	for eventType "notes": null
   * *	For eventType "insulin":
   * * "fastActing","longActing"
   * *	For eventType "exercise": ("light","medium","heavy")
   * * For eventType "health": ("illness","stress","highSymptoms","lowSymptoms","cycle","alcohol")
   * * For eventType "bloodGlucose": null
   */
  eventSubType?:
    | 'unknown'
    | 'fastActing'
    | 'longActing'
    | 'light'
    | 'medium'
    | 'heavy'
    | 'illness'
    | 'stress'
    | 'highSymptoms'
    | 'lowSymptoms'
    | 'cycle'
    | 'alcohol'
    | null;
  /** Value of input */
  value: string;
  /**
   * Unit of measurement for the value field
   * * for eventType "carbs": "grams"
   * * for eventType "notes" : null
   * * for eventType "insulin": "units"
   * Please see Notes section above for more information on enumeration values.
   * Enum: "unknown" "grams" "mg/dL" "minutes" "units"
   */
  unit?: string | null;
  /** A hashed and encrypted version of the unique ID of the transmitter. This may be used to determine uniqueness of transmitter or associate multiple records with the same transmitter, but it cannot be matched to the real transmitter ID. */
  transmitterId: string;
  /** The generation of transmitter that was associated with this upload. */
  transmitterGeneration: 'unknown' | 'g6' | 'g6+' | 'g6Pro' | 'g7';
  /** The generationVariant of transmitter that was associated with this upload. */
  transmitterGenerationVariant: 'd1+' | 'g6' | 'g7' | 'g715day';
  /**
   * The generation of transmitter that was associated with this upload.
   * Enum: "unknown""receiver" "iOS" "android"
   */
  displayDevice: string;
  /** @format date-time */
  recordedSystemTime?: string | null;
  /** @format date-time */
  recordedDisplayTime?: string | null;
}

export interface ComDexcomPartnerApiModelsProtoV3CalibrationCalibrationWrapper {
  /**
   * The type of records that will be returned in this response.
   * Example: "calibration"
   */
  recordType: string;
  /**
   * The version of the records that will be returned in this response.
   * Example: “3.0”
   */
  recordVersion: string;
  /** The user ID is unique on a per-Dexcom account, per-Client basis. The ID will not be the same for a user across clients (even if the clients are owned by the same developer). */
  userId: string;
  /** Array of calibrations. This field will display an empty array in case of no calibrations. */
  records: ComDexcomPartnerApiModelsProtoV3CalibrationCalibration[];
}

export interface ComDexcomPartnerApiModelsProtoV3CalibrationCalibration {
  /** A unique id (UUID) that identifies calibration record for the given client. */
  recordId: string;
  /**
   * Unit of measurement for value.
   *
   * Enum: “unknown” “mg/dL” “mmol/L”
   *
   * Please note all glucose values are reported in units of mg/dL and trend rates in units of mg/dL/min. Conversion of these values into user-preferred units, such as mmol/L, is the responsibility of the client application.
   */
  unit?: string | null;
  /**
   * The recorded system time of the alerts/egv/calibration/event. This is the ISO
   * 8601 time according to the system clock at which observation was made (UTC).
   * Records sourced from mobile apps (with displayDevice of “iOS” or “android”) will
   * have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
   * @format date-time
   */
  systemTime: string;
  /**
   * The recorded display time of the alerts/egv/calibration/event. This is the ISO 8601 time displayed on the receiving device when the observation was made (local).
   * Records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
   * @format date-time
   */
  displayTime: string;
  /**
   * Calibration value entered by the user. Example: 86
   * @format int32
   */
  value: number;
  /**
   * The type of display device the calibration came from.
   * Enum: "unknown""receiver" "iOS" "android"
   */
  displayDevice: string;
  /** A hashed and encrypted version of the unique ID of the transmitter. This may be used to determine uniqueness of transmitter or associate multiple records with the same transmitter, but it cannot be matched to the real transmitter ID. */
  transmitterId: string;
  /**
   * The count, in seconds, since the transmitter was initiated.
   * Example: 72364324786
   * @format int64
   */
  transmitterTicks: number;
  /** The generation of transmitter that was associated with this upload. */
  transmitterGeneration: 'unknown' | 'g6' | 'g6+' | 'g6Pro' | 'g7';
  /** The generationVariant of transmitter that was associated with this upload. */
  transmitterGenerationVariant: 'd1+' | 'g6' | 'g7' | 'g715day';
}

export interface ComDexcomPartnerApiModelsProtoV3DeviceDeviceWrapper {
  /**
   * The type of records that will be returned in this response.
   * Example: “device”
   */
  recordType: string;
  /**
   * The version of records that will be returned in this response.
   * Example: “3.0”
   */
  recordVersion: string;
  /** This ID is unique on a per-Dexcom account, per-client basis, and will thus not be the same for a user across clients (even if the clients are owned by the same developer). */
  userId: string;
  /**
   * Array of devices.  The size of the array will be zero if there are no devices.
   * Example: devices[]
   */
  records: ComDexcomPartnerApiModelsProtoV3DeviceDevice[];
}

export interface ComDexcomPartnerApiModelsProtoV3DeviceDevice {
  /**
   * Server timestamp, in UTC, of last upload event for the device that contributed data in the specified time window; note that this may be outside the range defined by the startDate and endDate query parameters.
   * @format date-time
   */
  lastUploadDate: string;
  /** A hashed and encrypted version of the unique ID of the transmitter. This may be used to determine uniqueness of transmitter or associate multiple records with the same transmitter, but it cannot be matched to the real transmitter ID. */
  transmitterId?: string | null;
  /** The generation of transmitter that was associated with this upload. */
  transmitterGeneration: 'unknown' | 'g6' | 'g6+' | 'g6Pro' | 'g7';
  /** The generationVariant of transmitter that was associated with this upload. */
  transmitterGenerationVariant: 'd1+' | 'g6' | 'g7' | 'g715day';
  /**
   * Type of display device used to receive the transmitter signal.
   * Enum: "unknown""receiver" "iOS" "android"
   */
  displayDevice: string;
  /** App that is installed on the display Device. For example, G6, G7, DexcomOne, D1G7. */
  displayApp?: string | null;
  /** Array of alert schedules and settings for the device as of the lastUploadDate. */
  alertSchedules: ComDexcomPartnerApiModelsProtoV3AlertScheduleDeviceAlertSchedule[];
}

export interface ComDexcomPartnerApiModelsProtoV3AlertScheduleDeviceAlertSchedule {
  /** Settings associated with each alert schedule */
  alertScheduleSettings: ComDexcomPartnerApiModelsProtoV3AlertScheduleDeviceAlertScheduleSettings;
  /** Array of alert settings for the device as of the lastUploadDate */
  alertSettings: ComDexcomPartnerApiModelsProtoV3AlertScheduleDeviceAlertSetting[];
}

export interface ComDexcomPartnerApiModelsProtoV3AlertScheduleDeviceAlertScheduleSettings {
  /** Name of the alert schedule */
  alertScheduleName: string;
  /** If the user has enabled the alert schedule setting on their display device (This refers specifically to a timed schedule.  If the user doesn't have a timed schedule enabled, then this will be false) */
  isEnabled: boolean;
  /** The "default" schedule means that these alert schedule settings are used, if no other alert schedule exists. */
  isDefaultSchedule: boolean;
  /** The time of day that this alert schedule starts */
  startTime: string;
  /** The time of day that this alert schedule ends */
  endTime: string;
  /** An array containing the days of the week this alert schedule value applies to; this array must contain one (or more) of the following strings in English */
  daysOfWeek: (
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
  )[];
  /** Is this schedule/profile currently active and being used to detect glucose alert changes */
  isActive?: boolean | null;
  /** The Override field for alertScheduleSettings pertains to manually entered user settings. Since they were manually entered by the user, they will override the default alertScheduleSettings profile. */
  override?: ComDexcomPartnerApiModelsProtoV3AlertScheduleOverrideSetting | null;
}

export interface ComDexcomPartnerApiModelsProtoV3AlertScheduleOverrideSetting {
  isOverrideEnabled?: boolean | null;
  mode?: 'unknown' | 'quiet' | 'vibrate' | null;
  endTime?: string | null;
}

export interface ComDexcomPartnerApiModelsProtoV3AlertScheduleDeviceAlertSetting {
  /**
   * Name of alert:
   * * high: triggers on a glucose value that crosses the High value
   * * low: triggers on a glucose value that crosses the Low value
   * * rise: triggers on a glucose rate that crosses a Rise Rate value
   * * fall: triggers on a glucose rate that crosses a Fall Rate value
   * * urgentLow: triggers on a glucose value that crosses the Urgent Low value
   * * urgentLowSoon: triggers when system is predicting the user will fall below the Urgent Low value in the near future
   * * outOfRange: triggers an alert when the display is out of communication range after the programmed delay; corresponds to the Signal Loss alert
   * * noReadings: triggers when the display device stops receiving EGV data from the transmitter for a certain amount of time; corresponds to the No Readings alert
   */
  alertName:
    | 'unknown'
    | 'high'
    | 'low'
    | 'rise'
    | 'fall'
    | 'outOfRange'
    | 'urgentLow'
    | 'urgentLowSoon'
    | 'noReadings';
  /**
   * The value at which the alert is set (nullable)
   * * For "high" alert: 120 - 400 mg/dL in 10 mg/dL increments
   * * For "low" alert: 60 - 100 mg/dL in 5 mg/dL increments
   * * For "rise" alert: 2 or 3 mg/dL/min
   * * For "fall" alert: 2 or 3 mg/dL/min
   * * For "outOfRange" alert: 20 - 240 minutes
   * @format int32
   */
  value?: number | null;
  /**
   * Unit of measurement for the alert value.
   * Enum: "mg/dL" "mmol/L" "mg/dL/min" "mmol/L/min" "minutes"
   */
  unit?: string | null;
  /**
   * Time (in minutes) before resuming alarming after the alert has been acknowledged and cleared.
   * @format int32
   */
  snooze?: number | null;
  /** Indication of whether or not the alert is enabled on the device. */
  enabled: boolean;
  /**
   * Time according to the system clock when alert setting was last adjusted by the user; nominally UTC.
   * @format date-time
   */
  systemTime?: string | null;
  /**
   * Display time when alert setting was last adjusted by the user
   * @format date-time
   */
  displayTime?: string | null;
  /**
   * Alert delay
   * @format int32
   */
  delay?: number | null;
  /**
   * A secondary trigger that needs to be exceeded for the alert condition to be triggered. For "Rising Fast" and "Falling Fast", this is the mgdl value that must be exceeded for the alert to be triggered.
   * @format int32
   */
  secondaryTriggerCondition?: number | null;
  /** The name of the theme this sound applies to. */
  soundTheme?: 'unknown' | 'modern' | 'classic' | null;
  /**
   * The sound output mode the user selected for this alert to sound with.
   * Enum: "unknown" "sound" "vibrates" "match"
   */
  soundOutputMode?: 'unknown' | 'sound' | 'vibrate' | 'match' | null;
}

export interface ComDexcomPartnerApiModelsProtoV3DataRangeDataRange {
  /**
   * The type of records that will be returned in this response.
   * Example: “dataRange”
   */
  recordType: string;
  /**
   * The version of records that will be returned in this response.
   * Example: “3.0”
   */
  recordVersion: string;
  /** This ID is unique on a per-Dexcom account, per-client basis, and will thus not be the same for a user across clients (even if the clients are owned by the same developer). */
  userId: string;
  /** Contains the start and end system/displayTime information about when the first and last Calibrations are available from the Dexcom API. */
  calibrations?: ComDexcomPartnerApiModelsProtoV3DataRangeDataRangeStartAndEnd | null;
  /**
   * Contains the start and end system/displayTime information about when the first and last valid EGVs are available from the Dexcom API.
   * Please note all glucose values are reported in units of mg/dL and trend rates in units of mg/dL/min.
   */
  egvs?: ComDexcomPartnerApiModelsProtoV3DataRangeDataRangeStartAndEnd | null;
  /** Contains the start and end system/displayTime information about when the first and last Events are available from the Dexcom API. */
  events?: ComDexcomPartnerApiModelsProtoV3DataRangeDataRangeStartAndEnd | null;
}

export interface ComDexcomPartnerApiModelsProtoV3DataRangeDataRangeStartAndEnd {
  /** The earliest records available for the egvs, calibrations, and events. */
  start: ComDexcomPartnerApiModelsProtoV3DataRangeDataRangeMoment;
  /** The latest records available for the egvs, calibrations, and events. */
  end: ComDexcomPartnerApiModelsProtoV3DataRangeDataRangeMoment;
}

export interface ComDexcomPartnerApiModelsProtoV3DataRangeDataRangeMoment {
  /**
   * Time according to the system clock; nominally UTC.
   * @format date-time
   */
  systemTime: string;
  /**
   * Time displayed on the receiving device.
   * @format date-time
   */
  displayTime: string;
}

export interface AuthCode {
  grant_type?: string;
  code?: string;
  redirect_uri?: string;
  client_id?: string;
  client_secret?: string;
}

export interface RefreshToken {
  grant_type?: string;
  refresh_token?: string;
  client_id?: string;
  client_secret?: string;
}

export interface AuthCodeResponse {
  /** Token to use for authenticated requests */
  access_token?: string;
  /** Token expiration in milliseconds */
  expires_in?: number;
  /** Type of token */
  token_type?: string;
  /** Token to use to get a new access token */
  refresh_token?: string;
}

export interface RefreshTokenResponse {
  /** Token to use for authenticated requests */
  access_token?: string;
  /** Token expiration in milliseconds */
  expires_in?: number;
  /** Type of token */
  token_type?: string;
  /** Token to use to get a new access token */
  refresh_token?: string;
}

export interface InvalidClient {
  error?: string;
}

export interface InvalidGrant {
  error?: string;
}

export interface InvalidRequest {
  error?: string;
}

export interface UnauthorizedClient {
  error?: string;
}

export interface UnsupportedGrantType {
  error?: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<
  AxiosRequestConfig,
  'data' | 'params' | 'url' | 'responseType'
> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<
  AxiosRequestConfig,
  'data' | 'cancelToken'
> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== 'string'
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title API v3 Records
 *
 * <span style="font-family:proxima-nova, Helvetica, Arial, sans-serif; font-size:18px; font-weight:400; line-height:0.5em; color:#59A618;">Overview</span>
 *
 * The Dexcom API provides access to a user’s records across alerts, EGVs, events, calibrations, devices, and data-range.
 *
 * <div style="height:12px"></div>
 * <span style="font-family:proxima-nova, Helvetica, Arial, sans-serif; font-size:18px; font-weight:400; line-height:0.5em; color:#59A618;">Base URLs</span>
 *
 * - **Production:** `https://api.dexcom.com`
 * - **Sandbox:** `https://sandbox-api.dexcom.com`
 *
 * <div style="height:12px"></div>
 * <span style="font-family:proxima-nova, Helvetica, Arial, sans-serif; font-size:18px; font-weight:400; line-height:0.5em; color:#59A618;">Authentication</span>
 *
 * Use OAuth 2.0 bearer tokens. Tokens must be stored server-side. See the [Authentication](https://developer.dexcom.com/docs/dexcom/authentication/) guide for full details.
 *
 * <div style="height:12px"></div>
 * <span style="font-family:proxima-nova, Helvetica, Arial, sans-serif; font-size:18px; font-weight:400; line-height:0.5em; color:#59A618;">Quick start</span>
 *
 * 1. Obtain an access token via OAuth 2.0.
 * 2. Call the desired endpoint with `Authorization: Bearer <token>`.
 * 3. Use `startDate` and `endDate` query parameters where required.
 *
 * <div style="height:12px"></div>
 * <span style="font-family:proxima-nova, Helvetica, Arial, sans-serif; font-size:18px; font-weight:400; line-height:0.5em; color:#59A618;">Notes</span>
 *
 * - `systemTime` is UTC; `displayTime` reflects device-local time.
 * - Mobile app records include UTC offsets; receiver records do not.
 */
export class DexcomAPI<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  v3 = {
    /**
     * @description ### Description The **\/alerts** endpoint enables retrieval of user alert records within a provided date range. This includes alerts triggered on a mobile app or receiver. The alert events can be related to glucose values, such as high or low, or system alerts, such as noReadings or outOfRange (signal loss). ### Resource _**GET /v3/users/self/alerts**_ ### Authorization OAuth 2.0 bearer token; see the [Authentication](https://developer.dexcom.com/docs/dexcom/authentication/) section for details on this workflow. ### Notes For the **systemTime** and **displayTime** response fields, records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets. Dexcom ONE+ does not support the following alerts: Urgent Low, Urgent Low Soon, Rising Fast, Falling Fast.
     *
     * @name GetAlertsEventsV3
     * @summary alerts
     * @request GET:/v3/users/self/alerts
     * @secure
     */
    getAlertsEventsV3: (
      query: {
        /**
         * Lower bound (inclusive) of the time window in which to look for data.
         * @example "2025-01-01T09:12:35"
         */
        startDate: string;
        /**
         * Upper bound (exclusive) of the time window in which to look for data.
         * @example "2025-01-01T09:12:35"
         */
        endDate: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ComDexcomPartnerApiModelsProtoV3AlertAlertEventWrapper, any>(
        {
          path: `/v3/users/self/alerts`,
          method: 'GET',
          query: query,
          secure: true,
          format: 'json',
          ...params,
        },
      ),

    /**
     * @description ### Description The **\/egvs** endpoint enables retrieval of a user's estimated glucose value (EGV) data, including trend and status information. ![Scopes And Access](https://storage.googleapis.com/g5-dexcom-prod-us-5-developer-portal-assets/images/G7_egvs.png) ### Resource _**GET /v3/users/self/egvs**_ ### Authorization OAuth 2.0 bearer token; see the [Authentication](https://developer.dexcom.com/docs/dexcom/authentication/) section for details on this workflow. ### Notes The **unit** enumerations vary between endpoints. For **egvs**, the values are as follows: * **unknown** * **mg/dL** * **mmol/L** The **rateUnit** enumerations for **egvs** are as follows: * **unknown** * **mg/dL/min** * **mmol/L/min** For the **systemTime** and **displayTime** response fields, records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
     *
     * @name GetEstimatedGlucoseValuesV3
     * @summary egvs
     * @request GET:/v3/users/self/egvs
     * @secure
     */
    getEstimatedGlucoseValuesV3: (
      query: {
        /**
         * Beginning of the time window.
         * @example "2025-02-06T09:12:35"
         */
        startDate: string;
        /**
         * End of the time window.
         * @example "2025-02-06T09:12:35"
         */
        endDate: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ComDexcomPartnerApiModelsProtoV3EgvEGVWrapper, any>({
        path: `/v3/users/self/egvs`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description ### Description The **\/events** endpoint enables retrieval of a user's event records. This includes carbohydrate intake, insulin doses, exercise, and health events that are entered in the receiver interface or through the mobile app. ![Event Mobile App Screen](https://storage.googleapis.com/g5-dexcom-prod-us-5-developer-portal-assets/images/G7_events.png) ### Resource _**GET /v3/users/self/events**_ ### Authorization OAuth 2.0 bearer token; see the [Authentication](https://developer.dexcom.com/docs/dexcom/authentication/) section for details on this workflow. ### Notes The **unit** enumerations vary between endpoints. For **events**, the values are as follows: * **unknown** * **grams** * **mg/dL** * **minutes** * **units** For the **systemTime** and **displayTime** response fields, records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets. Dexcom ONE does not support the /events endpoint and will return an empty array.
     *
     * @name GetEventsV3
     * @summary events
     * @request GET:/v3/users/self/events
     * @secure
     */
    getEventsV3: (
      query: {
        /**
         * Beginning of the time window.
         * @example "2025-01-01T09:12:35"
         */
        startDate: string;
        /**
         * End of the time window.
         * @example "2025-01-01T09:12:35"
         */
        endDate: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ComDexcomPartnerApiModelsProtoV3EventEventsWrapper, any>({
        path: `/v3/users/self/events`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description ### Description The **\/calibrations** endpoint enables retrieval of a user's calibration events. Calibration events are where the user enters the glucose value that they obtain from testing a fingerstick blood sample with their blood glucose meter into the CGM. These readings are used as a reference point for calculating EGV from the sensor signal. ![Calibration Mobile App Screen](https://storage.googleapis.com/g5-dexcom-prod-us-5-developer-portal-assets/images/G7_calibrations.png) ### Resource _**GET /v3/users/self/calibrations**_ ### Authorization OAuth 2.0 bearer token; see the [Authentication](https://developer.dexcom.com/docs/dexcom/authentication/) section for details on this workflow. ### Notes The **unit** enumerations vary between endpoints. For **calibrations**, the values are as follows: * **unknown** * **mg/dL** * **mmol/L** For the **systemTime** and **displayTime** response fields, records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets. Dexcom ONE does not support the /calibrations endpoint and will return an empty array.
     *
     * @name GetCalibrationsV3
     * @summary calibrations
     * @request GET:/v3/users/self/calibrations
     * @secure
     */
    getCalibrationsV3: (
      query: {
        /**
         * Beginning of the time window; see the discussion of time in the [Endpoint Overview](https://developer.dexcom.com/docs/endpoint-overview) section for more details on how they relate to device information
         * @example "2025-01-01T09:12:35"
         */
        startDate: string;
        /**
         * End of the time window.
         * @example "2025-01-01T09:12:35"
         */
        endDate: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        ComDexcomPartnerApiModelsProtoV3CalibrationCalibrationWrapper,
        any
      >({
        path: `/v3/users/self/calibrations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description ### Description The **\/devices** endpoint enables retrieval of a user's device information, including G6, and G7 standalone receivers and the G6, G7, G7 15-day, Dexcom ONE, and Dexcom ONE+  mobile apps, and transmitters. The response is an array of all receiver-type devices contributing data to the specified time window, including the alerts and settings associated with each receiver. ![Scopes and Access](https://storage.googleapis.com/g5-dexcom-prod-us-5-developer-portal-assets/images/G7_devices.png) ### Resource _**GET /v3/users/self/devices**_ ### Authorization OAuth 2.0 bearer token; see the [Authentication](https://developer.dexcom.com/docs/dexcom/authentication/) section for details on this workflow. ### Query Parameters There are no query parameters for the devices endpoint. The response will return all devices associated with a Dexcom account along with the settings for each device. ### Notes The **unit** enumerations vary between endpoints. For **devices**, the values are as follows: * **unknown** * **grams** * **mg/dL** * **mmol/L** * **mg/dL/min** * **mmol/L/min** * **minutes** * **units** For the **systemTime** and **displayTime** response fields, records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
     *
     * @name GetDevicesV3
     * @summary devices
     * @request GET:/v3/users/self/devices
     * @secure
     */
    getDevicesV3: (params: RequestParams = {}) =>
      this.request<ComDexcomPartnerApiModelsProtoV3DeviceDeviceWrapper, any>({
        path: `/v3/users/self/devices`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description ### Description The **\/dataRange** endpoint enables retrieval of a user's earliest and latest times for calibration, EGV, and event records. This can be used to efficiently pull historical data and determine whether new data is available. ### Resource _**GET /v3/users/self/dataRange**_ ### Authorization OAuth 2.0 bearer token; see the [Authentication](https://developer.dexcom.com/docs/dexcom/authentication/) section for details on this workflow. ### Notes For the **systemTime** and **displayTime** response fields, records sourced from mobile apps (with displayDevice of “iOS” or “android”) will have UTC offsets; records sourced from receivers (with displayDevice of “receiver”) will not have UTC offsets.
     *
     * @name GetDataRangeV3
     * @summary dataRange
     * @request GET:/v3/users/self/dataRange
     * @secure
     */
    getDataRangeV3: (
      query?: {
        /**
         * A timestamp that represents the last time a consumer/client of Dexcom API pulled data.
         *
         * **How to use the “lastSyncTime” query parameter**
         *
         * SyncTime - “lastSyncTime” is a datetime query parameter built into the DataRange endpoint. If you know the last time you did a data sync for a user, you can specify this using the “lastSyncTime” parameter.
         *
         * If provided, the system will only return date ranges for new data AFTER that date time. This allows for more efficient syncing as you’ll now have date ranges for data you know is new.
         *
         * A SyncTime request example would look like this:
         *
         * ``` curl --location --request GET '<your-server>/v3/users/self/dataRange?lastSyncTime=2025-01-01T17:00:00’ --header 'Authorization: Bearer <token>' --header 'Accept: application/json' ```
         */
        lastSyncTime?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ComDexcomPartnerApiModelsProtoV3DataRangeDataRange, any>({
        path: `/v3/users/self/dataRange`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Provides an authorization code to a client to exchange for a token.
     *
     * @name GetLoginV3
     * @summary login
     * @request GET:/v3/oauth2/login
     */
    getLoginV3: (
      query: {
        a;
        /** Client identifier */
        client_id: string;
        /** The access scope being requested; currently, ***offline_access*** is the only acceptable input. */
        scope: string;
        /** Must be set to 'code'. */
        response_type: string;
        /** URI to redirect to after authentication. Must match one of the allowed redirect URIs for the client. */
        redirect_uri: string;
        /** An opaque value used by the client to maintain state between the request and callback. The authorization server includes this value when redirecting the user-agent back to the client. */
        state: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, void>({
        path: `/v3/oauth2/login`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * @description Exchanges an auth code for a token, or exchange a refresh token for an access token.
     *
     * @name PostTokenV3
     * @summary token
     * @request POST:/v3/oauth2/token
     */
    postTokenV3: (data: AuthCode | RefreshToken, params: RequestParams = {}) =>
      this.request<
        AuthCodeResponse | RefreshTokenResponse,
        | InvalidClient
        | InvalidGrant
        | InvalidRequest
        | UnauthorizedClient
        | UnsupportedGrantType
      >({
        path: `/v3/oauth2/token`,
        method: 'POST',
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),
  };
}
