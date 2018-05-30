import { AuthService } from './auth.service'
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private Router: Router,
    private LocalStorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, snap: RouterStateSnapshot) {
    let isLoggedIn: Boolean = this.LocalStorageService.get("isLoggedIn") as Boolean;
    if (!isLoggedIn) {
      this.Router.navigate(["/"]);
      return false;
    }
    return true;
  }
}
