import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsLoginedGuard implements CanActivate {
  constructor(
      private router: Router,
      private auth: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      if (this.auth.isAuth()){
          return true;
      }else{
          this.router.navigate(['signin']);  //, { queryParams: { returnUrl: state.url }}
          return false;
      }

  }
}
