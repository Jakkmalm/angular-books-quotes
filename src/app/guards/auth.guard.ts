// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    // 1) Finns en token?
    const loggedIn = this.auth.isLoggedIn();
    // 2) Och är den fortfarande giltig?
    const notExpired = !this.auth.isTokenExpired();

    if (loggedIn && notExpired) {
      return true;
    }

    // Annars: rensa lokal inloggning och skicka till /login
    this.auth.logout();
    return this.router.createUrlTree(['/login']);
  }
}
