import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoopBackAuth } from '../shared/sdk';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: LoopBackAuth,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (!this.authService.getToken().id) {
      this.router.navigate(['login']);

      return false;
    }

    return true;
  }
}
