import { Injectable } from '@angular/core';
import {Router, CanActivate, UrlTree} from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router
  ) {}
  canActivate(): | boolean | UrlTree {
    if (!this.auth.getToken()) {
      return this.router.createUrlTree(['/register']);
    }
    return true;
  }
}
