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
    const userRoles = this.userService.getUserRole(); // Assuming this method returns an array of roles

    if (userRoles && (userRoles.includes('admin') || userRoles.includes(expectedRole))) {
      return true;
    } else {
      // Return a UrlTree to navigate to 'not_authorized' page
      return this.router.parseUrl('/not_authorized');
    }
  }
}