import { Action } from '@ngrx/store';

export const enum AuthTypes {
  SIGNUP_START = '[Auth] Signup Start',
  AUTHENTICATE_SUCCESS = '[Auth] Success',
  AUTHENTICATE_FAIL = '[Auth] Fail',
  LOGIN_START = '[Auth] Login Start',
  LOGOUT = '[Auth] Logout',
  GET_TOKEN = '[Auth] Token',
  GET_TOKEN_SUCCESS = '[Auth] Token Success',
  GET_TOKEN_FAIL = '[Auth] Token Fail',
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

export class GetToken implements Action {
  readonly type = AuthTypes.GET_TOKEN;

  constructor(public payload: { token: string }) {}
}

export class GetTokenSuccess implements Action {
  readonly type = AuthTypes.GET_TOKEN_SUCCESS;

}

export class GetTokenFail implements Action {
  readonly type = AuthTypes.GET_TOKEN_FAIL;
}

export type AuthActions =
  | SingUpStart
  | AuthenticateSuccess
  | AuthenticateFail
  | Logout
  | LoginStart
  | GetToken
  | GetTokenSuccess
  | GetTokenFail;



