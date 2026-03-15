import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  //private tokenService: TokenStorageService
  constructor() {}

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



      return next.handle(request).pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log(`Request for ${req.urlWithParams} completed...`);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          const started = Date.now();
          const elapsed = Date.now() - started;
          if ([401, 403].includes(error.status)) {
            // auto logout if 401 or 403 response returned from api
            return of();
          }
          // debugger;
          return throwError(() => error);
        })
      );
  }
}
export const authInterveptorProvicers = [
 { provider: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
];
