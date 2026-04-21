import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { FindReportsResponse, PayStatusResponse, Price, ReportDataResponse, ReportTypes, VinKeyResponse } from "../models";


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient
  ) {
  }

  public get(path: string): Observable<ReportDataResponse> {
    return this.http.get<ReportDataResponse>(`${environment.apiUrl}/report/get/${path}`);
  }
  public find(req: VinKeyResponse): Observable<FindReportsResponse> {
    return this.http.post<FindReportsResponse>(`${environment.apiUrl}/report/find`, req);
  }

  public price(type: ReportTypes | string, key?: number, paId?: number | null): Observable<Price> {
    return this.http.post<Price>(`${environment.apiUrl}/report/info`, {
      type: type,
      paId: paId ?? undefined,
      key: key
    });
  }
  
  public getReportWithKey(type: ReportTypes | string, vin: string, vehicle: string | undefined, key: string): Observable<PayStatusResponse> {
    return this.http.post<PayStatusResponse>(`${environment.apiUrl}/report/get`, {
      type: type,
      vin: vin,
      key: key,
      vehicle: vehicle
    });
  }
}