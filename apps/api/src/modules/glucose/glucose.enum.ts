export enum GlucoseProviders {
  LIBRE = 'libre',
  DEXCOM = 'dexcom',
}

export enum GlucoseSensors {
  LIBRE = 'Freestyle Libre',
  DEXCOM_G6 = 'Dexcom G6',
  DEXCOM_G7 = 'Dexcom G7',
  DEXCOM_ONE_PLUS = 'Dexcom One+',
}

export enum GlucoseUnits {
  MMOL_L = 'mmol/L',
  MG_DL = 'mg/dL',
}

export enum GlucoseStatus {
  HIGH = 'high',
  COMPUTABLE = 'computable',
  LOW = 'low',
}

export enum GlucoseColors {
  NONE = 'none',
  GREEN = 'green',
  YELLOW = 'yellow',
  ORANGE = 'orange',
  RED = 'red',
}

export enum GlucoseTrends {
  NONE = 'none',
  RISING_FAST = 'risingFast',
  RISING = 'rising',
  RISING_SLOW = 'risingSlow',
  STABLE = 'stable',
  FALLING_SLOW = 'fallingSlow',
  FALLING = 'falling',
  FALLING_FAST = 'fallingFast',
}
