import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoginedGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      if (next.routeConfig.path == 'test'){
        this.router.navigate(['']);  //, { queryParams: { returnUrl: state.url }}
        return false;
      }else{
        return true;
      }

  }
}
