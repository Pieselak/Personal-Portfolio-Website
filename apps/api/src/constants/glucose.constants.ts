export const GLUCOSE_CONSTANTS = {
  SEC_TO_MS: 1000,
  PROVIDER_CHECK_INTERVAL_MS: 60000,

  LIBRE: {
    BUFFER_SEC: 300,
    FETCH_TIMEOUT_MS: 65000,
    RETRY_MS: 15000,
    SENSOR_LIFETIME_SEC: 1209600,
    CACHE_KEYS: {
      RATELIMIT_FETCH_GLUCOSE: 'libre_ratelimit_fetch_glucose',
      RATELIMIT_FETCH_TOKEN: 'libre_ratelimit_fetch_token',
      AUTH_TOKEN: 'libre_auth_token',
    },
  },

  DEXCOM: {
    BUFFER_SEC: 300,
    FETCH_TIMEOUT_MS: 305000,
    RETRY_MS: 15000,
    SENSOR_LIFETIME_SEC: 864000,
    CACHE_KEYS: {
      RATELIMIT_FETCH_GLUCOSE: 'dexcom_ratelimit_fetch_glucose',
      RATELIMIT_FETCH_TOKEN: 'dexcom_ratelimit_fetch_token',
      AUTH_TOKEN: 'dexcom_auth_token',
    },
    FETCH_KEYS: {
      REFRESH_TOKEN: 'dexcom_refresh_token',
      AUTHORISATION_CODE: 'dexcom_authorisation_code',
    },
  },

  IMAGES: {
    LIBRE: 'assets/sensor/libre.png',
    LIBRE_NEW: 'assets/sensor/libre_new.png',
    DEXCOM: 'assets/sensor/dexcom.png',
  },
} as const;
