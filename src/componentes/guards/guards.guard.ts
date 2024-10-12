import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';

export const guardsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router); 

  

  if (authService.isLoggedIn()) {
    
    return true;
  } else {
    
    router.navigate(['/login']);
    return false;
  }
};