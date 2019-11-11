import { AuthActions, AuthTypes } from './auth.action';

export interface UserState {
  token: string;
  username: string;
  authError: string;
}

export const initialState: UserState = {
  token: null,
  username: null,
  authError: null,
};

export function userReducer( state = initialState, action: AuthActions)  {
  switch (action.type) {
    case AuthTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authError: null,
        token : action.payload.token,
        username: action.payload.username
      }
    case AuthTypes.AUTHENTICATE_FAIL:
      return {
        ...state,
        token: null,
        username: null,
        authError: action.payload.error,
      };
    case AuthTypes.LOGOUT:
      return {
        ...state,
        token: null,
        username: null,
      };
    default: {
      return state;
    }
  }
}

export const getUser = (state: UserState) => state.token;
