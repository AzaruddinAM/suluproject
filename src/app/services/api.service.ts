import { HttpClient , HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subscriber , throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import jwt_decode from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private log_http : HttpClient,
    private http:HttpClient,
    private router:Router) { }

//login
DecodeToken(token) {
  // jwt_decode()
  var decoded = jwt_decode(token);
  // if(decoded['data']['config'] && localStorage.getItem('masterrole').toLowerCase() !=='wallboard') //azar hided for discussion
  // {
  //   this._snackBar.open('Updated by Admin You need to Relogin','Relogin',this.config)
    
  // }
}
loginverify(){
  return !!localStorage.getItem('token');
}
    login(url,data):Observable<any>{
      return this.http.post(url,data,{observe: 'response'})
      .pipe(map((response: any) => {
        let rep = response;
        if(rep.headers.get('refresh_token') != null) {
          this.DecodeToken(rep.headers.get('refresh_token'))
        }
        // localStorage.setItem('token',rep.headers.get('refresh_token'));
        return rep.body;
      }))
      .pipe(catchError(err=>{
        if (err.status == 401) {
          //alert('EMPTY');
          
          this.router.navigate(['/admin/login']);
          // localStorage.clear();
        }
        else if (err.status == 207) 
        {
          console.log('no content');
        } 
        else {
          if (err.status == 0) {
            //alert('Server offaayi poyedaaveeee ...');
          }
          return throwError(err);
        }
      }))
    }
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
