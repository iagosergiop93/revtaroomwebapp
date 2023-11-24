import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth-service/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class Guard implements CanActivate {
    constructor(public auth: AuthService, public router: Router) {}
    canActivate(): boolean {
      if (!this.auth.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
