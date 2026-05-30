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

/** Name of the glucose sensor device */
export enum GlucoseSensor {
  FreestyleLibre = "Freestyle Libre",
  DexcomG6 = "Dexcom G6",
  DexcomG7 = "Dexcom G7",
  DexcomOne = "Dexcom One+",
}

/** Current status of glucose measurement */
export enum GlucoseStatus {
  High = "high",
  Computable = "computable",
  Low = "low",
}

/** Direction of glucose level change trend */
export enum GlucoseTrend {
  None = "none",
  RisingFast = "risingFast",
  Rising = "rising",
  RisingSlow = "risingSlow",
  Stable = "stable",
  FallingSlow = "fallingSlow",
  Falling = "falling",
  FallingFast = "fallingFast",
}

/** Color indicator representing the glucose level range */
export enum GlucoseColor {
  None = "none",
  Green = "green",
  Yellow = "yellow",
  Orange = "orange",
  Red = "red",
}

/** Unit of measurement for glucose value */
export enum GlucoseUnit {
  MmolL = "mmol/L",
  MgDL = "mg/dL",
}

/** Service operational status */
export enum ServiceStatus {
  Operational = "operational",
  Maintenance = "maintenance",
}

export interface StatusCheckResponse {
  /**
   * Service operational status
   * @example "operational"
   */
  status: ServiceStatus;
  /**
   * Service uptime in seconds
   * @example 86400
   */
  uptime: number;
  /**
   * Current timestamp
   * @example 1704064800
   */
  timestamp: number;
}

export interface MaintenanceModeInput {
  /**
   * Indicates if the maintenance mode should be enabled or disabled
   * @example true
   */
  enable: boolean;
}

export interface MaintenanceModeResponse {
  /**
   * Indicates if the maintenance mode is enabled
   * @example true
   */
  enabled: boolean;
  /**
   * Message indicating the maintenance mode status
   * @example "Maintenance mode has been enabled."
   */
  message: string;
}

export type GetProjectResponse = object;

export type CreateProjectBody = object;

export type UpdateProjectBody = object;

export type UpdateProjectResponse = object;

export interface GetCurrentGlucoseResponse {
  /**
   * Indicates whether the glucose measurement is current and up-to-date
   * @example true
   */
  isCurrent: boolean;
  /**
   * Current glucose measurement value
   * @example 118
   */
  value: number;
  /**
   * Unit of measurement for glucose value
   * @example "mg/dL"
   */
  unit: GlucoseUnit;
  /**
   * Color indicator representing the glucose level range
   * @example "green"
   */
  color: GlucoseColor;
  /**
   * Direction of glucose level change trend
   * @example "stable"
   */
  trend: GlucoseTrend;
  /**
   * Current status of glucose measurement
   * @example "computable"
   */
  status: GlucoseStatus;
  /**
   * Unix timestamp in milliseconds when the glucose reading was taken
   * @example 1672531199000
   */
  timestamp: string;
  /**
   * Unix timestamp in milliseconds when the next data update will occur
   * @example 1672534799000
   */
  refreshAt: number;
  /**
   * Time in milliseconds until the next data update is expected
   * @example 60000
   */
  refreshIn: number;
}

export interface GraphDataPoint {
  /**
   * Glucose measurement value at the specified timestamp
   * @example 118
   */
  value: number;
  /**
   * Unit of measurement for glucose value
   * @example "mg/dL"
   */
  unit: GlucoseUnit;
  /**
   * Color indicator representing the glucose level range
   * @example "green"
   */
  color: GlucoseColor;
  /**
   * Status of the glucose measurement
   * @example "computable"
   */
  status: GlucoseStatus;
  /**
   * Unix timestamp in milliseconds when the glucose reading was taken
   * @example 1672531199000
   */
  timestamp: number;
}

export interface GetGraphDataResponse {
  /**
   * Collection of glucose data points for graph visualization
   * @example [{"value":118,"unit":"mg/dL","color":"green","status":"computable","timestamp":1672531199000},{"value":115,"unit":"mg/dL","color":"green","status":"computable","timestamp":1672534799000}]
   */
  data: GraphDataPoint[];
  /**
   * Lower threshold of the target glucose range
   * @example 70
   */
  targetLow: number;
  /**
   * Upper threshold of the target glucose range
   * @example 180
   */
  targetHigh: number;
  /**
   * Lower threshold of the critical glucose level
   * @example 54
   */
  levelLow: number;
  /**
   * Upper threshold of the critical glucose level
   * @example 250
   */
  levelHigh: number;
  /**
   * Unix timestamp in milliseconds when the next data update will occur
   * @example 1672534799000
   */
  refreshAt: number;
  /**
   * Time in milliseconds until the next data update is expected
   * @example 60000
   */
  refreshIn: number;
}

export interface GetSensorDataResponse {
  /**
   * Indicates whether the sensor is currently active
   * @example true
   */
  isActive: boolean;
  /**
   * Name of the glucose sensor device
   * @example "Freestyle Libre"
   */
  name: GlucoseSensor | null;
  /**
   * Image URL of the glucose sensor device
   * @example "https://example.com/images/libre2.png"
   */
  image: string | null;
  /**
   * Unix timestamp in milliseconds when the sensor data was last uploaded
   * @example 1672531199000
   */
  lastUploadAt: number | null;
  /**
   * Unix timestamp in milliseconds when the sensor will expire
   * @example 1672531199000
   */
  expireAt: number | null;
  /**
   * Time in milliseconds when the sensor will expire
   * @example 172800000
   */
  expireIn: number | null;
}

export interface BuildDexcomOAuthURLResponse {
  /**
   * Dexcom OAuth authorization URL for user authentication
   * @example "https://sandbox-api.dexcom.com/v2/oauth2/login?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=offline_access"
   */
  url: string;
}

export interface HandleDexcomOAuthResponse {
  /**
   * Message indicating the result of the OAuth authentication process
   * @example "Dexcom OAuth successful."
   */
  message: string;
}

export interface GetProviderModesResponse {
  /**
   * List of available modes for the glucose provider with their selection status
   * @example [{"name":"none","selected":true},{"name":"auto","selected":false}]
   */
  providers: string[];
}

export interface SetProviderModeBody {
  /**
   * The mode to set for the glucose provider
   * @example "auto"
   */
  provider: string;
}

export interface SetProviderModeResponse {
  /**
   * The mode that was set for the glucose provider
   * @example "auto"
   */
  provider: string;
  /**
   * Message indicating the result of setting the provider mode
   * @example "Glucose provider mode has been set to auto."
   */
  message: string;
}

export interface GetTimeInRangeResponse {
  /**
   * Indicates whether sufficient data is available for calculation
   * @example true
   */
  sufficientData: boolean;
  /**
   * Percentage of time with critically high glucose levels
   * @example 5
   */
  percentageHigh: number;
  /**
   * Percentage of time above target glucose range
   * @example 15
   */
  percentageAboveRange: number;
  /**
   * Percentage of time within target glucose range
   * @example 70
   */
  percentageInRange: number;
  /**
   * Percentage of time below target glucose range
   * @example 7
   */
  percentageBelowRange: number;
  /**
   * Percentage of time with critically low glucose levels
   * @example 3
   */
  percentageLow: number;
  /**
   * Number of hours included in the calculation period
   * @example 24
   */
  hours?: number;
}

export interface GetAverageGlucoseResponse {
  /**
   * Indicates if there is sufficient data to calculate
   * @example true
   */
  sufficientData: boolean;
  /**
   * Average glucose value
   * @example 118
   */
  value: number;
  /**
   * Unit of measurement for glucose value
   * @example "mg/dL"
   */
  unit: GlucoseUnit;
  /**
   * Optional number of hours to consider for the calculation
   * @example 24
   */
  hours?: number;
}

export interface GetHighestGlucoseResponse {
  /**
   * Indicates whether sufficient data is available for calculation
   * @example true
   */
  sufficientData: boolean;
  /**
   * Highest glucose measurement value recorded in the specified period
   * @example 320
   */
  value: number;
  /**
   * Unit of measurement for glucose value
   * @example "mg/dL"
   */
  unit: GlucoseUnit;
  /**
   * Number of hours included in the calculation period
   * @example 24
   */
  hours?: number;
}

export interface GetLowestGlucoseResponse {
  /**
   * Indicates whether sufficient data is available for calculation
   * @example true
   */
  sufficientData: boolean;
  /**
   * Lowest glucose measurement value recorded in the specified period
   * @example 55
   */
  value: number;
  /**
   * Unit of measurement for glucose value
   * @example "mg/dL"
   */
  unit: GlucoseUnit;
  /**
   * Number of hours included in the calculation period
   * @example 24
   */
  hours?: number;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<
  AxiosRequestConfig,
  "data" | "params" | "url" | "responseType"
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
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<
  AxiosRequestConfig,
  "data" | "cancelToken"
> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
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
      baseURL: axiosConfig.baseURL || "",
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
    if (typeof formItem === "object" && formItem !== null) {
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
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Portfolio website API
 * @version 1.0
 * @contact
 *
 * API documentation for the portfolio website
 */
export class API<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  status = {
    /**
     * @description Checks the current operational status of the service.
     *
     * @tags Status
     * @name StatusControllerGetStatus
     * @summary Check service status
     * @request GET:/status
     */
    statusControllerGetStatus: (params: RequestParams = {}) =>
      this.request<StatusCheckResponse, void>({
        path: `/status`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Enables or disables maintenance mode for the service. Requires permission: status.maintenance:update
     *
     * @tags Status
     * @name StatusControllerSetMaintenanceMode
     * @summary Update maintenance mode
     * @request PATCH:/status/maintenance
     * @secure
     */
    statusControllerSetMaintenanceMode: (
      data: MaintenanceModeInput,
      params: RequestParams = {},
    ) =>
      this.request<MaintenanceModeResponse, void>({
        path: `/status/maintenance`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  projects = {
    /**
     * @description Fetches and returns an array of all project entities stored in the system.
     *
     * @tags Projects
     * @name ProjectsControllerGetProjects
     * @summary Retrieve a list of all projects
     * @request GET:/projects
     */
    projectsControllerGetProjects: (params: RequestParams = {}) =>
      this.request<GetProjectResponse[], void>({
        path: `/projects`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Creates a new project entity with the provided data. Requires permission: projects:create
     *
     * @tags Projects
     * @name ProjectsControllerCreateProject
     * @summary Create a new project
     * @request POST:/projects
     * @secure
     */
    projectsControllerCreateProject: (
      data: CreateProjectBody,
      params: RequestParams = {},
    ) =>
      this.request<GetProjectResponse, void>({
        path: `/projects`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Fetches and returns a single project entity based on the provided ID.
     *
     * @tags Projects
     * @name ProjectsControllerGetProjectById
     * @summary Retrieve a project
     * @request GET:/projects/{uuid}
     */
    projectsControllerGetProjectById: (
      uuid: string,
      params: RequestParams = {},
    ) =>
      this.request<GetProjectResponse, void>({
        path: `/projects/${uuid}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Updates the project entity identified by the provided ID with new data.  Requires permission: projects:update
     *
     * @tags Projects
     * @name ProjectsControllerUpdateProject
     * @summary Update an existing project
     * @request PATCH:/projects/{uuid}
     * @secure
     */
    projectsControllerUpdateProject: (
      uuid: string,
      data: UpdateProjectBody,
      params: RequestParams = {},
    ) =>
      this.request<UpdateProjectResponse, void>({
        path: `/projects/${uuid}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Deletes the project entity identified by the provided ID. Requires permission: projects:delete
     *
     * @tags Projects
     * @name ProjectsControllerDeleteProject
     * @summary Delete a project
     * @request DELETE:/projects/{uuid}
     * @secure
     */
    projectsControllerDeleteProject: (
      uuid: string,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/projects/${uuid}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  glucose = {
    /**
     * @description Retrieves the current glucose reading.
     *
     * @tags Glucose Data
     * @name GlucoseControllerGetCurrentGlucose
     * @summary Get current glucose data
     * @request GET:/glucose/current
     */
    glucoseControllerGetCurrentGlucose: (params: RequestParams = {}) =>
      this.request<GetCurrentGlucoseResponse, void>({
        path: `/glucose/current`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves glucose data formatted for graphing purposes.
     *
     * @tags Glucose Data
     * @name GlucoseControllerGetGraphData
     * @summary Get glucose graph data
     * @request GET:/glucose/graph
     */
    glucoseControllerGetGraphData: (params: RequestParams = {}) =>
      this.request<GetGraphDataResponse, void>({
        path: `/glucose/graph`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves data about the glucose sensor.
     *
     * @tags Glucose Data
     * @name GlucoseControllerGetSensorData
     * @summary Get sensor data
     * @request GET:/glucose/sensor
     */
    glucoseControllerGetSensorData: (params: RequestParams = {}) =>
      this.request<GetSensorDataResponse, void>({
        path: `/glucose/sensor`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves the OAuth URL for Dexcom authentication. Requires permission: glucose.auth:read
     *
     * @tags Glucose Authentication
     * @name GlucoseAuthControllerGetDexcomOAuthUrl
     * @summary Get Dexcom OAuth URL
     * @request GET:/glucose/auth/dexcom/url
     * @secure
     */
    glucoseAuthControllerGetDexcomOAuthUrl: (params: RequestParams = {}) =>
      this.request<BuildDexcomOAuthURLResponse, void>({
        path: `/glucose/auth/dexcom/url`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Handles OAuth authentication with Dexcom service. Requires permission: glucose.auth:authorize
     *
     * @tags Glucose Authentication
     * @name GlucoseAuthControllerHandleDexcomOAuth
     * @summary Dexcom OAuth endpoint
     * @request GET:/glucose/auth/dexcom/callback
     * @secure
     */
    glucoseAuthControllerHandleDexcomOAuth: (
      query?: {
        /**
         * OAuth authorization code received from Dexcom
         * @example "a1b2c3d4e5f6g7h8i9j0"
         */
        code?: string;
        /**
         * Error message if OAuth authorization failed
         * @example "access_denied"
         */
        error?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<HandleDexcomOAuthResponse, void>({
        path: `/glucose/auth/dexcom/callback`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description List of available glucose data providers. Requires permission: glucose.settings:read
     *
     * @tags Glucose Settings
     * @name GlucoseSettingsControllerGetProviderModes
     * @summary Get available glucose data providers
     * @request GET:/glucose/settings/providers
     * @secure
     */
    glucoseSettingsControllerGetProviderModes: (params: RequestParams = {}) =>
      this.request<GetProviderModesResponse, void>({
        path: `/glucose/settings/providers`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Set the mode for glucose data provider. Supported modes include "auto", "libre", "dexcom". Requires permission: glucose.settings:update
     *
     * @tags Glucose Settings
     * @name GlucoseSettingsControllerSetProviderMode
     * @summary Update glucose data provider mode
     * @request PATCH:/glucose/settings/provider
     * @secure
     */
    glucoseSettingsControllerSetProviderMode: (
      data: SetProviderModeBody,
      params: RequestParams = {},
    ) =>
      this.request<SetProviderModeResponse, void>({
        path: `/glucose/settings/provider`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves time in range statistics for glucose levels.
     *
     * @tags Glucose Statistics
     * @name GlucoseStatisticsControllerGetTimeInRange
     * @summary Get time in range data
     * @request GET:/glucose/statistics/time-in-range
     */
    glucoseStatisticsControllerGetTimeInRange: (
      query?: {
        /**
         * Number of hours to look back for time in range calculation
         * @min 1
         * @example 24
         */
        hours?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetTimeInRangeResponse, void>({
        path: `/glucose/statistics/time-in-range`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves average glucose level statistics.
     *
     * @tags Glucose Statistics
     * @name GlucoseStatisticsControllerGetAverageGlucose
     * @summary Get average glucose
     * @request GET:/glucose/statistics/average
     */
    glucoseStatisticsControllerGetAverageGlucose: (
      query?: {
        /**
         * Number of hours to look back for average glucose calculation
         * @min 1
         * @example 24
         */
        hours?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetAverageGlucoseResponse, void>({
        path: `/glucose/statistics/average`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves the highest recorded glucose level.
     *
     * @tags Glucose Statistics
     * @name GlucoseStatisticsControllerGetHighestGlucose
     * @summary Get highest glucose
     * @request GET:/glucose/statistics/highest
     */
    glucoseStatisticsControllerGetHighestGlucose: (
      query?: {
        /**
         * Number of hours to look back for highest glucose reading
         * @min 1
         * @example 24
         */
        hours?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetHighestGlucoseResponse, void>({
        path: `/glucose/statistics/highest`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Retrieves the lowest recorded glucose level.
     *
     * @tags Glucose Statistics
     * @name GlucoseStatisticsControllerGetLowestGlucose
     * @summary Get lowest glucose
     * @request GET:/glucose/statistics/lowest
     */
    glucoseStatisticsControllerGetLowestGlucose: (
      query?: {
        /**
         * Number of hours to look back for lowest glucose reading
         * @min 1
         * @example 24
         */
        hours?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<GetLowestGlucoseResponse, void>({
        path: `/glucose/statistics/lowest`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
