import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { PayInitRequest, PayReportRequest, PayRequest, PayStatusResponse, PayUpdateRequest, PayUpdateResponse, Price, ReportTypes } from "./models";


@Injectable({
  providedIn: 'root'
})
export class PayService {

  constructor(private http: HttpClient
  ) {
  }

  public successUpdate(request: PayUpdateRequest): Observable<PayStatusResponse> {
    return this.http.post<PayStatusResponse>(`${environment.apiUrl}/pay/action/update/success`, request);
  }
  public failureUpdate(request: PayUpdateRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/pay/action/update/failure`, request);
  }
  public getInvoice(request: PayUpdateRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/pay/action/invoice`, request);
  }

  // public getReportPrice(type: ReportTypes | string, paId?: number | null): Observable<Price> {
  //   return this.http.post<Price>(`${environment.apiUrl}/pay/action/report/info`, {
  //     type: type,
  //     paId: paId ?? undefined
  //   });
  // }
  public initReport(initReportRequest: PayInitRequest) {
    return this.http.post<PayUpdateResponse>(`${environment.apiUrl}/pay/action/report/init`, initReportRequest);
  }
  public createReport(request: PayReportRequest): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/pay/action/report/create`, request);
  }
}

