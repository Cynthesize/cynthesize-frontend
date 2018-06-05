import { AuthService } from './auth.service'
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class BoardAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private Router: Router,
    private LocalStorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, snap: RouterStateSnapshot) {
    const isLoggedIn: Boolean = this.LocalStorageService.get('isLoggedIn') as Boolean;
    const isBoardLoggedIn: Boolean = this.LocalStorageService.get('isBoardLoggedIn') as Boolean;
    console.log(isLoggedIn);
    console.log(isBoardLoggedIn);

    if (!isBoardLoggedIn) {
      this.Router.navigate(['/']);
      return false;
    }
    return true;
  }
}
