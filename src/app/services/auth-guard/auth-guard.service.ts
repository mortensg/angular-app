import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private router:Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isUserLoggedIn:boolean = this.authService.isUserLoggedIn();
    const requestedUrl:string = state.url;

    if (requestedUrl === '/dashboard') {
      if (!isUserLoggedIn) {
        this.router.navigate(['/login']);
        return false;
      }
    } else if (requestedUrl === '/login') {
      if (isUserLoggedIn) {
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
    return true;
  }
}
