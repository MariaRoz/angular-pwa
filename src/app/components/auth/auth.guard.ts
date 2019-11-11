import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as fromApp from '../../store';
import { selectAuth } from './store/auth.selector';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select(selectAuth).pipe(
      take(1),
      map(data => {
        if (data.token) {
          return true;
        }
        return this.router.createUrlTree(['/register']);
      }),
    );
  }
}
