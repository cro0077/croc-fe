export interface ReportDataResponse {
  data: string;
  path: string;
  isPdf: boolean;
}

export interface ReportAccHistoryResponse {
  vin: string;
  type: ReportTypes;
  path: string;
  date: Date;
  accId?: number;
}

export interface FindReportsResponse {
  vin: string;
  infos: ReportInfo[];
}

export interface ReportInfo {
  type: ReportTypes;
  num: string;
  price?: Price;
  disable?: boolean; //for UI
}

export interface Price {
  price: number;
  currency: string;
  isLogIn: boolean;
  numReports?: number;
}
export interface ReportRequest {
  vin: string;
  type: ReportTypes;
  num: string;
  key?: string;
  priceReport?: Price;
}
export enum ReportTypes {
  CF = "CF",
  AC = "AC",
  ST = "ST"
}
export enum PayType {
  CF = "CF",
  AC = "AC",
  ST = "ST",
  PACF = "PACF"
}

export interface DoubleNumResponse {
  num: number;
}
export interface StringDataResponse {
  data: string;
}

export interface VinKeyResponse {
  vin: string;
  key?: string;
}

export interface Deal {
  id: number;
  num: number;
  price: number;
  currency: string;
  type: PayType; 
  off?: number;
  sumPrice?: number;
}


// payment

/* vin or pa should be presented */
export interface PayInitRequest {
  type: PayType;
  vin?: string;
  paId?: number;
}

export interface PayRequest {
  id: number;
  customerEmail: string;
  customerName: string;
}
export interface PayReportRequest {
  id: number;
  type: ReportTypes;
  customerEmail: string;
  customerName: string;
}
export interface PayUpdateRequest {
  id: string;
}
export interface PayReportUpdateRequest {
  id: string;
  type: ReportTypes;
}
export interface PayUpdateResponse {
  id: number;
}
export interface Price {
  price: number;
  currency: string;
  isLogIn: boolean;
  numReports?: number;
}
export interface PayStatusResponse {
  report?: ReportDataResponse;
  key?: string;
  numLeftReports?: number;
}