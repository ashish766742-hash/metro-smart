export interface StationInfo {
  line: string;
  platform: string;
  direction: string;
}

export interface MetroRoutes {
  [key: string]: StationInfo;
}

export type Language = 'en-US' | 'hi-IN';
