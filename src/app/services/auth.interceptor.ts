import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   return next.handle(request);
  // }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let userToken = localStorage.getItem('token');
    // let userUrl = localStorage.getItem('urlClicked');
    // console.log(request);
    // alert(JSON.stringify(request))
    // alert(request.url)
    // if(request.url !== environment['App.withoutToken'])
    // {
      
    request = request.clone({
      setHeaders: {
        Authorization: `${userToken}`,
        // 'Content-Type': 'application/x-www-form-urlencoded'
        // AuthorizedUrl: `${userUrl}`,
        
        // 'Content-Type', 'multipart/form-data'
        // 'Content-Type': 'multipart/form-data'

      },
      
    });
    // }
    // else{
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `${userToken}`,
    //       AuthorizedUrl: `${userUrl}`,
    //       // 'Content-Type', 'multipart/form-data'
    //       // 'Content-Type': 'multipart/form-data'
  
    //     },
        
    //   });
    // }
    console.log(request);
    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            //console.log("api call success :", event);
          }
        },
        err => {
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpResponse) {
            if (err.status === 401) {
              console.log("api call error :", event);
            }
          }
        }
      )
    );
  }
}
