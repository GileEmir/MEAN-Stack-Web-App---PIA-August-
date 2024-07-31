import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const expectedRole = route.data['expectedRole']; // Accessing 'expectedRole' with bracket notation
    if (this.userService.hasRole(expectedRole)) {
      return true;
    } else {
      // Return a UrlTree to navigate to 'not_authorized' page
      return this.router.parseUrl('/not_authorized');
    }
  }
}