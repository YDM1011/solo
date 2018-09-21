import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsLogoutGuard implements CanActivate {
  constructor(
      private router: Router,
      private auth: AuthService
  ) { }
  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot){
    let self = this;
    if (this.auth.isAuth()){
      this.router.navigate([`user/${self.auth.getUserId()}`]);  //, { queryParams: { returnUrl: state.url }}
      return false;
    }else{
      return true;
    }
  }
}
