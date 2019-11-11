import { Action } from '@ngrx/store';

export const enum AuthTypes {
  SIGNUP_START = '[Auth] Signup Start',
  AUTHENTICATE_SUCCESS = '[Auth] Success',
  SIGNUP_FAIL = '[Auth] Signup Fail',
  LOGIN_START = '[Auth] Login Start',
  LOGIN_FAIL = '[Auth] Login Fail',
  LOGOUT = '[Auth] Logout',
}

export class SingUpStart implements Action {
  readonly type = AuthTypes.SIGNUP_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthTypes.AUTHENTICATE_SUCCESS;
  constructor(public payload: { token: string, redirect: boolean }) {}
}

export class SignUpFail implements Action {
  readonly type = AuthTypes.SIGNUP_FAIL;

  constructor(public payload: { error: string }) {}
}

export class Logout implements Action {
  readonly type = AuthTypes.LOGOUT;
}

export class LoginStart implements Action {
  readonly type = AuthTypes.LOGIN_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class LoginFail implements Action {
  readonly type = AuthTypes.LOGIN_FAIL;
  constructor(public payload: { error: string }) {}
}


export type AuthActions =
  | SingUpStart
  | AuthenticateSuccess
  | SignUpFail
  | Logout
  | LoginStart
  | LoginFail;



