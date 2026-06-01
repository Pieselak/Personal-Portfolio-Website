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

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
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

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
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
      baseURL: axiosConfig.baseURL || "https://api.libreview.io",
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
 * @title LibreView Unofficial
 * @version 1.0
 * @license MIT (https://spdx.org/licenses/MIT.html)
 * @termsOfService https://github.com/FokkeZB/libreview-unofficial#disclaimer
 * @baseUrl https://api.libreview.io
 * @externalDocs https://libreview-unofficial.stoplight.io/
 * @contact LibreView Unofficial API Documentation <libreview.unofficial@icloud.com> (https://github.com/FokkeZB/libreview-unofficial)
 *
 * This is community-driven, unofficial documentation for the LibreView API. It is not affiliated with Abbott Diabetes Care, Inc. or any of its subsidiaries.
 */
export class LibreAPI<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  llu = {
    /**
     * @description Log in to retrieve an Bearer token to use for the other endpoints.
     *
     * @name PostLluAuthLogin
     * @summary Log in
     * @request POST:/llu/auth/login
     */
    postLluAuthLogin: (
      data: {
        email?: string;
        password?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<User | LoginRedirect | LoginTerms, any>({
        path: `/llu/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Retrieve the connections of the user.
     *
     * @name GetConnections
     * @summary Get Connections
     * @request GET:/llu/connections
     * @secure
     */
    getConnections: (data: any, params: RequestParams = {}) =>
      this.request<
        {
          status?: number;
          data?: Connection[];
          ticket?: Ticket;
        },
        any
      >({
        path: `/llu/connections`,
        method: "GET",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get Graph data.
     *
     * @name GetLluConnectionsIdGraph
     * @summary Get Graph
     * @request GET:/llu/connections/{patientId}/graph
     * @secure
     */
    getLluConnectionsIdGraph: (patientId: string, params: RequestParams = {}) =>
      this.request<
        {
          status?: number;
          data?: {
            connection?: Connection;
            activeSensors?: {
              sensor?: Sensor;
              device?: PatientDevice;
            }[];
            graphData?: GraphData[];
          };
          ticket?: Ticket;
        },
        any
      >({
        path: `/llu/connections/${patientId}/graph`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get Logbook.
     *
     * @name GetLluConnectionsIdLogbook
     * @summary Get Logbook
     * @request GET:/llu/connections/{patientId}/logbook
     * @secure
     */
    getLluConnectionsIdLogbook: (
      patientId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status?: number;
          data?: LogbookData[];
          ticket?: Ticket;
        },
        any
      >({
        path: `/llu/connections/${patientId}/logbook`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get Logbook.
     *
     * @name GetLluConnectionsSettingsConnectionId
     * @summary Get Notificiation Settings for Connection
     * @request GET:/llu/notifications/settings/{connectionId}
     * @secure
     */
    getLluConnectionsSettingsConnectionId: (
      connectionId: string,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status?: number;
          data?: {
            connectionId?: string;
            alarmRules?: AlarmRules;
            std?: object;
            patientDevice?: PatientDevice;
          };
          ticket?: Ticket;
        },
        any
      >({
        path: `/llu/notifications/settings/${connectionId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Get configuration data.
     *
     * @name GetLluConfigCountry
     * @summary Get Config
     * @request GET:/llu/config/country
     */
    getLluConfigCountry: (
      query: {
        /**
         * LibreLinkUp version to get config for.
         * @pattern ^[0-9]+(\.[0-9]+){0,2}$
         * @example "4.7"
         */
        version?: string;
        /**
         * Country identifier to get config for.
         * @pattern ^[A-Z]{2}$
         * @example "NL"
         */
        country: string;
      },
      data: any,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          status?: number;
          data?: {
            CaptureAnalytics?: string;
            CountryList?: {
              countries?: {
                DisplayMember?: string;
                ValueMember?: string;
              }[];
            };
            "LSL-ServiceURL"?: string;
            LibreLinkResourceKey?: string;
            MinVersion?: string;
            PartnerApplicationKeys?: string[];
            ShowAlert?: boolean;
            ShowAndroidBadges?: string;
            SupportedLanguages?: string[];
            alarmVersions?: {
              isfHigh?: string;
              isfHighDismissed?: string;
              isfLow?: string;
              isfLowDismissed?: string;
              isfUrgentLow?: string;
              isfUrgentLowDismissed?: string;
              lateJoined?: string;
              noData?: string;
              scan?: string;
              sensorExpired?: string;
              sensorStart?: string;
              sensorTerminated?: string;
              sharingResumed?: string;
              sharingStopped?: string;
              streamingHigh?: string;
              streamingLow?: string;
              streamingSensorStart?: string;
              streamingUrgentLow?: string;
            };
            alarmsEnabled?: string[];
            features?: {
              appSettings?: boolean;
              connectionIsStreamingBanner?: boolean;
              fsl2Streaming?: boolean;
              heartbeat?: boolean;
              iOSExitNotification?: boolean;
              inAppReview?: boolean;
              regulatoryUdiDom?: boolean;
              repeatableAppReview?: boolean;
              sensorEndAlarms?: boolean;
              streamingAlarms?: boolean;
              streamingSensorStartedAlarm?: boolean;
              streamingTutorial?: boolean;
              streamingUnavailableBanner?: boolean;
            };
            heartbeatAlarmVersion?: string;
            heartbeatMilliseconds?: number;
            lluAppAndroid?: string;
            lluAppIOS?: string;
            lluPrivacyPolicyHtml?: {
              ar?: string;
              "ar-sa"?: string;
              cs?: string;
              "cs-cz"?: string;
              da?: string;
              "da-dk"?: string;
              de?: string;
              "de-de"?: string;
              default?: string;
              el?: string;
              "el-gr"?: string;
              en?: string;
              "en-gb"?: string;
              "en-us"?: string;
              es?: string;
              "es-cl"?: string;
              "es-co"?: string;
              "es-es"?: string;
              "es-mx"?: string;
              fi?: string;
              "fi-fi"?: string;
              fr?: string;
              "fr-ca"?: string;
              "fr-fr"?: string;
              he?: string;
              "he-il"?: string;
              hr?: string;
              "hr-hr"?: string;
              it?: string;
              "it-it"?: string;
              ja?: string;
              "ja-jp"?: string;
              nb?: string;
              "nb-no"?: string;
              nl?: string;
              "nl-nl"?: string;
              pl?: string;
              "pl-pl"?: string;
              pt?: string;
              "pt-br"?: string;
              "pt-pt"?: string;
              ru?: string;
              "ru-ru"?: string;
              sk?: string;
              "sk-sk"?: string;
              sl?: string;
              "sl-si"?: string;
              sv?: string;
              "sv-se"?: string;
              tr?: string;
              "tr-tr"?: string;
              zh?: string;
              "zh-cn"?: string;
              "zh-tw"?: string;
            };
            lluPrivacyPolicyVersions?: {
              default?: string;
            };
            lluSAM?: string;
            lluSupport?: string;
            lluSupportMain?: string;
            lluToUHtml?: {
              ar?: string;
              "ar-sa"?: string;
              cs?: string;
              "cs-cz"?: string;
              da?: string;
              "da-dk"?: string;
              de?: string;
              "de-de"?: string;
              default?: string;
              el?: string;
              "el-gr"?: string;
              en?: string;
              "en-gb"?: string;
              "en-us"?: string;
              es?: string;
              "es-cl"?: string;
              "es-co"?: string;
              "es-es"?: string;
              "es-mx"?: string;
              fi?: string;
              "fi-fi"?: string;
              fr?: string;
              "fr-ca"?: string;
              "fr-fr"?: string;
              he?: string;
              "he-il"?: string;
              hr?: string;
              "hr-hr"?: string;
              it?: string;
              "it-it"?: string;
              ja?: string;
              "ja-jp"?: string;
              nb?: string;
              "nb-no"?: string;
              nl?: string;
              "nl-nl"?: string;
              pl?: string;
              "pl-pl"?: string;
              pt?: string;
              "pt-br"?: string;
              "pt-pt"?: string;
              ru?: string;
              "ru-ru"?: string;
              sk?: string;
              "sk-sk"?: string;
              sl?: string;
              "sl-si"?: string;
              sv?: string;
              "sv-se"?: string;
              tr?: string;
              "tr-tr"?: string;
              zh?: string;
              "zh-cn"?: string;
              "zh-tw"?: string;
            };
            lluToUVersions?: {
              default?: string;
            };
            lslApi?: string;
            lv?: string;
            minorityAge?: number;
            nameOrder?: string[];
            notificationService?: string;
            notificationTopics?: object[];
            passwordRules?: {
              PasswordRequirements?: number[];
              rules?: {
                max?: {
                  errorMsgKey?: string;
                  value?: string;
                };
                min?: {
                  errorMsgKey?: string;
                  value?: string;
                };
                noSpace?: {
                  errorMsgKey?: string;
                  value?: string;
                };
                number?: {
                  errorMsgKey?: string;
                  value?: string;
                };
                special?: {
                  errorMsgKey?: string;
                  value?: string;
                };
              };
            };
            pnDocId?: string;
            pushyApiEndpoint?: string;
            pushyMqttEndpoint?: string;
            regionalMap?: {
              ae?: {
                lslApi?: string;
                socketHub?: string;
              };
              ap?: {
                lslApi?: string;
                socketHub?: string;
              };
              au?: {
                lslApi?: string;
                socketHub?: string;
              };
              ca?: {
                lslApi?: string;
                socketHub?: string;
              };
              de?: {
                lslApi?: string;
                socketHub?: string;
              };
              eu?: {
                lslApi?: string;
                socketHub?: string;
              };
              eu2?: {
                lslApi?: string;
                socketHub?: string;
              };
              fr?: {
                lslApi?: string;
                socketHub?: string;
              };
              jp?: {
                lslApi?: string;
                socketHub?: string;
              };
              us?: {
                lslApi?: string;
                socketHub?: string;
              };
            };
            reviewConfig?: {
              daysBeforeReminding?: number;
              daysUntilPrompt?: number;
              significantUsesUntilPrompt?: number;
              usesUntilPrompt?: number;
            };
            safetyBannerInterval?: number;
            touDocId?: string;
          };
        },
        any
      >({
        path: `/llu/config/country`,
        method: "GET",
        query: query,
        body: data,
        format: "json",
        ...params,
      }),
  };
  auth = {
    /**
     * @description Accept the Terms Of Use (TOU).
     *
     * @name PostAuthContinueTou
     * @summary Accept Terms
     * @request POST:/auth/continue/tou
     * @secure
     */
    postAuthContinueTou: (params: RequestParams = {}) =>
      this.request<
        {
          status?: number;
          data?: {
            /** User data. */
            user?: UserData;
            messages?: {
              unread?: number;
            };
            notifications?: {
              unresolved?: number;
            };
            authTicket?: {
              token?: string;
              expires?: number;
              duration?: number;
            };
            invitations?: string[];
            trustedDeviceToken?: string;
          };
        },
        any
      >({
        path: `/auth/continue/tou`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * @description Get the logged in user data.
     *
     * @name GetUser
     * @summary Get User
     * @request GET:/user
     * @secure
     */
    getUser: (data: any, params: RequestParams = {}) =>
      this.request<
        {
          status?: number;
          data?: {
            /** User data. */
            user?: UserData;
            messages?: {
              unread?: number;
            };
            notifications?: {
              unresolved?: number;
            };
            authTicket?: {
              token?: string;
              expires?: number;
              duration?: number;
            };
            invitations?: string[];
            trustedDeviceToken?: string;
          };
        },
        any
      >({
        path: `/user`,
        method: "GET",
        body: data,
        secure: true,
        ...params,
      }),
  };
  account = {
    /**
     * @description Get the account of the logged in user.
     *
     * @name GetAccount
     * @summary Get Account
     * @request GET:/account
     * @secure
     */
    getAccount: (data: any, params: RequestParams = {}) =>
      this.request<
        {
          status?: number;
          data?: {
            /** Account (partial User) data. */
            user?: AccountUserData;
          };
          ticket?: Ticket;
        },
        any
      >({
        path: `/account`,
        method: "GET",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
