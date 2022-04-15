import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private api:ApiService,
              private router:Router){

  }
  canActivate(): boolean {
    
      // return false;
      if(this.api.loginverify()){
        return true;
      }
      else{
        this.router.navigate(['/login'])
        return false;
      }
  }
  
}
