import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { SharedService } from '@app/core';
import { publicRoutes, RouteConstant } from '@app/helpers/constants';

@Injectable()
export class AppAuthGuard implements CanActivate {
  constructor(private router: Router, private _sharedService: SharedService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let activateRoute = true;
    const readURL = state.url.split('?')[0];
    const isPublicRoute = publicRoutes.includes(readURL);
    // redirect to login or dashboard according to logged in status and current url
    const user = this._sharedService.getUser();
    if (this._sharedService.isLoggedIn()) {
      if (isPublicRoute) {
        activateRoute = false;
        // this.router.navigate([`/${RouteConstant.UPLOAD_PLAYER_CONTAINER}`]);
      }
    } else {
      if (!isPublicRoute) {
        activateRoute = false;
        this.router.navigate([`/${RouteConstant.LOGIN}`]);
      }
    }
    return activateRoute;
  }
}
