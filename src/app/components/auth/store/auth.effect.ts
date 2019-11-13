import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {catchError, map, mergeMap, switchMap, take, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.action';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';



const handleError = (err: HttpErrorResponse) => {
  const errorMessage = err.error.message || err.statusText;
  return of(new AuthActions.AuthenticateFail({errorMsg: errorMessage}));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  authSingup$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.SIGNUP_START),
    switchMap((singupAction: AuthActions.SingUpStart) => {
      return this.authService.registerUser(singupAction.payload.email, singupAction.payload.password).pipe(
        mergeMap(data => {
          return [new AuthActions.AuthenticateSuccess({ username: data.username, redirect: true }),
            new AuthActions.SetToken({token: data.access_token})]; }),
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
      return this.authService.loginUser(loginStart.payload.email, loginStart.payload.password).pipe(
        mergeMap(data => {
          return [new AuthActions.AuthenticateSuccess({ username: data.username, redirect: true }),
            new AuthActions.SetToken({token: data.access_token})]; }),
        catchError(err => {
          return handleError(err);
        }
      ));
    })
  );

  @Effect({ dispatch: false })
  setToken$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.SET_TOKEN),
    map((getTokenAction: AuthActions.SetToken) => {
      this.authService.setToken(getTokenAction.payload.token);
    })
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

  @Effect({dispatch: false})
  resetToken$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.RESET_TOKEN),
    take(1),
    map(() => {
       this.authService.removeToken();
       return this.router.navigate(['register']);
    })
  )

  @Effect()
  authLogout$ = this.actions.pipe(
    ofType(AuthActions.AuthTypes.LOGOUT),
    map(() => { return new AuthActions.ResetToken();
    }),
  );
}
