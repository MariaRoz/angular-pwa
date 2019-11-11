import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.action';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';



const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail({error: errorMessage}));
  }
  switch (errorRes.error.error) {
    case 'Unauthorized':
      errorMessage = 'This password or email is not correct';
      break;
    case 'Username exist':
      errorMessage = 'This username already exist.';
      break;
  }
  return of(new AuthActions.AuthenticateFail({error: errorMessage}));
};

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
          return new AuthActions.AuthenticateSuccess({ token: data.access_token, username: data.username, redirect: true }); }),
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
        map(data => {
          localStorage.setItem('token', JSON.stringify(data.access_token));
          return new AuthActions.AuthenticateSuccess({ token: data.access_token, username: data.username, redirect: true }); }),
        catchError(err => {
          return handleError(err);
        }
      ));
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
