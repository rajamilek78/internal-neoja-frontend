import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SharedCommonService } from '@app/core';

@Injectable({
  providedIn: 'root'
})

export class AppAuthGuard implements CanActivate {
  constructor(private router: Router, private SharedCommonService : SharedCommonService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const isAuthenticated = this.SharedCommonService.getIsAuthenticated(); // Check if the user is authenticated

      if (isAuthenticated) {
        return true; // Allow navigation
      } else {
        this.router.navigate(['']); // Redirect to home if not authenticated
        return false; // Block navigation
      }
  }
}
