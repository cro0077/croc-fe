import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DoubleNumResponse, FindReportsResponse, ReportAccHistoryResponse, ReportDataResponse, ReportRequest, StringDataResponse } from "../models";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ReportAService {

  constructor(private http: HttpClient
  ) {
  }

  public getPoints(): Observable<DoubleNumResponse> {
    return this.http.get<DoubleNumResponse>(`${environment.apiUrl}/report-a/admin/points`);
  }
  public findReport(req: StringDataResponse): Observable<FindReportsResponse> {
    return this.http.post<FindReportsResponse>(`${environment.apiUrl}/report-a/admin/find`, req);
  }
  public generateReport(request: ReportRequest): Observable<ReportDataResponse> {
    return this.http.post<ReportDataResponse>(`${environment.apiUrl}/report-a/admin/generate`, request);
  }
  public allHistory(): Observable<ReportAccHistoryResponse[]> {
    return this.http.post<ReportAccHistoryResponse[]>(`${environment.apiUrl}/report-a/admin/history`, {});
  }
}
