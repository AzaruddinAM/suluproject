import { HttpClient , HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Observable, Subscriber , throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private log_http : HttpClient,
    private http:HttpClient) { }


   /* Normal GET method without token  */

   Getwithouttoken(url)
   {
     return this.log_http.get(url)
     .pipe(map((response: any) => response.json()))
     .pipe(catchError(err=>{
       if (err.status == 401)
       {
         //alert('EMPTY');
       } else {
         if (err.status == 0) {
           //alert('Server offaayi poyedaaveeee ...');
         }
           return throwError(err);
       }
     }))
   }
   /* Normal POST method without token  */
  Postwithouttoken(url,body)
  {
    console.log(url);
    
    let headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = new RequestOptions({
      headers: headers
    });
    return this.log_http.post(url,body,{ headers:{'Content-Type': 'application/x-www-form-urlencoded'}})
    .pipe(map((response: any) => {return response}))
    .pipe(catchError(err=>{
      if (err.status == 401) {
        console.log("404");
        
        //alert('EMPTY');
      } else {
        if (err.status == 0) {
          console.log('Server offaayi  ...');
        }
        console.log(err);
        
        return throwError(err);
      }
    }))
  }
}
