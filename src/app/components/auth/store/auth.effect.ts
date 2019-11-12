import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.action';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



const handleError = (err: HttpErrorResponse) => {
  let errorMessage = err.statusText;

  switch (err.status) {
    case 401:
      errorMessage = 'This password or email is not correct';
      break;
    case 403:
      errorMessage = 'This username already exist.';
      break;
  }

  return of(new AuthActions.AuthenticateFail({errorMsg: errorMessage}));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private userService: AuthService,
    private router: Router
  ) {}

  @Effect()
  authSingup$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.SIGNUP_START),
    switchMap((singupAction: AuthActions.SingUpStart) => {
      return this.userService.registerUser(singupAction.payload.email, singupAction.payload.password).pipe(
        mergeMap(data => {
          return [new AuthActions.AuthenticateSuccess({ username: data.username, redirect: true }),
            new AuthActions.GetToken({token: data.access_token})]; }),
        catchError(err => {
            return handleError(err);
          }
        ));
    })
  );

  @Effect()
  authLogin$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.LOGIN_START),
    switchMap((loginStart: AuthActions.LoginStart) => {
      return this.userService.loginUser(loginStart.payload.email, loginStart.payload.password).pipe(
        mergeMap(data => {
          return [new AuthActions.AuthenticateSuccess({ username: data.username, redirect: true }),
            new AuthActions.GetToken({token: data.access_token})]; }),
        catchError(err => {
          return handleError(err);
        }
      ));
    })
  );

  @Effect()
  getToken$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.GET_TOKEN),
    map((getTokenAction: AuthActions.GetToken) => {
      this.userService.setToken(getTokenAction.payload.token);
      return new AuthActions.GetTokenSuccess();
    }),
    catchError(() =>
        of(new AuthActions.GetTokenFail())
    )
  );

  @Effect({ dispatch: false })
  authSuccess$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
          return this.router.navigate(['chat']);
        }
    })
  );

  @Effect({ dispatch: false })
  authLogout$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.LOGOUT),
    tap(() => {
      localStorage.removeItem('token');
      return this.router.navigate(['/register']);
    }),
  );
}
