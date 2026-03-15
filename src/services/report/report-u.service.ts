import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { ReportAccHistoryResponse } from "../models";


@Injectable({
  providedIn: 'root'
})
export class ReportUService {

  constructor(private http: HttpClient
  ) {
  }

  public getAllHistory(): Observable<ReportAccHistoryResponse[]> {
    return this.http.post<ReportAccHistoryResponse[]>(`${environment.apiUrl}/history/report/all`, {});
  }
}
