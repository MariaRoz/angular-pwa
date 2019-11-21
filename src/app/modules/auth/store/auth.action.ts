import { Action } from '@ngrx/store';

export const enum AuthTypes {
  SIGNUP_START = '[Auth] Signup Start',
  AUTHENTICATE_SUCCESS = '[Auth] Success',
  AUTHENTICATE_FAIL = '[Auth] Fail',
  LOGIN_START = '[Auth] Login Start',
  LOGOUT = '[Auth] Logout',
  SET_TOKEN = '[Auth] Set Token',
  RESET_TOKEN = '[Auth] Reset Token',
  GET_CURRENT_USER = '[User] Current User'
}

export class SingUpStart implements Action {
  readonly type = AuthTypes.SIGNUP_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthTypes.AUTHENTICATE_SUCCESS;

  constructor(public payload: { username: string, redirect: boolean }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AuthTypes.AUTHENTICATE_FAIL;

  constructor(public payload: { errorMsg: string }) {}
}

export class Logout implements Action {
  readonly type = AuthTypes.LOGOUT;
}

export class LoginStart implements Action {
  readonly type = AuthTypes.LOGIN_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class SetToken implements Action {
  readonly type = AuthTypes.SET_TOKEN;

  constructor(public payload: { token: string }) {}
}

export class ResetToken implements Action {
  readonly type = AuthTypes.RESET_TOKEN;
}

export class GetCurrentUser {
  readonly type = AuthTypes.GET_CURRENT_USER;
}

export type AuthActions =
  | SingUpStart
  | AuthenticateSuccess
  | AuthenticateFail
  | Logout
  | LoginStart
  | SetToken
  | ResetToken
  | GetCurrentUser;



