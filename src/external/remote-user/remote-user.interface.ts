export interface RemoteUser {
  name: string;
  lastName?: string;
  email: string;
  userCode?: string;
  created: string;
  modified: string;
  lastLogin?: string;
  isTrial: boolean;
  useConsolidated?: boolean;
  trialDays?: number;
  imei?: string;
  phone?: string;
  transferType?: string;
  transferReference?: string;
  percentValue?: number;
  prizeTimes?: number;
  revPercentValue?: number;
  revPrizeTimes?: number;
  appVersion?: string;
  internetRequired?: boolean;
  drawConfiguration?: string;
  settings?: Record<string, string>;
}
