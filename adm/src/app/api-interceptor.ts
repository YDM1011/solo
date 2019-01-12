import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { catchError,tap } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor() { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    // modify request
    request = request.clone({
      withCredentials: true
    });



    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            // http response status code
          }
        }, error => {
          // http response status code

        })
      )

  };


}
