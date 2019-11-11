import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as AuthActions from './auth.action';
import {UserService} from '../../../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  @Effect()
  authSingup$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.SIGNUP_START),
    switchMap((singupAction: AuthActions.SingUpStart) => {
      return this.userService.registerUser(singupAction.payload.email, singupAction.payload.password).pipe(
        map(data => {
          localStorage.setItem('token', JSON.stringify(data.access_token));
          return new AuthActions.AuthenticateSuccess({ token: data.access_token, redirect: true }); }),
        catchError(error =>
          of(new AuthActions.SignUpFail({error})))
        );
    })
  );

  @Effect()
  authLogin$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.LOGIN_START),
    switchMap((loginStart: AuthActions.LoginStart) => {
      return this.userService.loginUser(loginStart.payload.email, loginStart.payload.password).pipe(
        map(data => {
          console.log('data' +  data);
          localStorage.setItem('token', JSON.stringify(data.access_token));
          return new AuthActions.AuthenticateSuccess({ token: data.access_token, redirect: true }); }),
        catchError(error =>
          of(new AuthActions.SignUpFail({error})))
      );
    })
  );


  @Effect({ dispatch: false })
  authRedirect$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
          this.router.navigate(['chat']);
        }
    })
  );

  @Effect({ dispatch: false })
  authLogout$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.LOGOUT),
    tap(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/register']);
    }),
  );
}
