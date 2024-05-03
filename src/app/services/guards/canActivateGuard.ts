import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

export interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any;
}

export interface CanActivateChild {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any;
}
