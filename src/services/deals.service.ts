import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Deal } from "./models";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http: HttpClient
  ) {
  }

  public getAllDeals(): Observable<Deal[]> {
    return this.http.get<Deal[]>(`${environment.apiUrl}/deals/all`);
  }
  public getAllDealsByType(type: string): Observable<Deal[]> {
    return this.http.get<Deal[]>(`${environment.apiUrl}/deals/${type}/all`);
  }
  public getAllDealById(id: string): Observable<Deal> {
    return this.http.post<Deal>(`${environment.apiUrl}/deals/by`, { data: id });
  }
}
