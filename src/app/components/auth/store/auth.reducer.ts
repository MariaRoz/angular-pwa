import { AuthActions, AuthTypes } from './auth.action';

export interface AuthState {
  token: string;
  username: string;
  authError: string;
}

export const initialState: AuthState = {
  token: null,
  username: null,
  authError: null,
};

export function authReducer( state = initialState, action: AuthActions): AuthState  {
  switch (action.type) {
    case AuthTypes.AUTHENTICATE_SUCCESS:
      return {
        ...state,
        authError: null,
        username: action.payload.username
      };
    case AuthTypes.AUTHENTICATE_FAIL:
      return {
        ...state,
        authError: action.payload.errorMsg,
      };
    case AuthTypes.LOGOUT:
      return {
        ...state,
        token: null,
        username: null,
      };
      case AuthTypes.GET_TOKEN:
        return {
          ...state,
          token: action.payload.token
        };
    default: {
      return state;
    }
  }
}
