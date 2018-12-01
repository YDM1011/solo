import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { catchError,tap } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private cookie:CookieService) { }

  // intercept request and add token
  intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    // modify request
    request = request.clone({
      setHeaders: {
        Authorization: `${this.cookie.get('token')}`
      },
      withCredentials: true
    });
    console.log("----request----");

    console.log(request);

    console.log("--- end of request---");


    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {

            console.log(" all looks good");
          }
        }, error => {
          // http response status code
          console.log("----response----");
          console.error("status code:");
          console.error(error.status);
          console.error(error.message);
          console.log("--- end of response---");

        })
      )

  };


}
