import { UserService } from './services/user.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); // Updated service
  const router = inject(Router);

  if (userService.isLoggedIn()) { // Updated method call
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};