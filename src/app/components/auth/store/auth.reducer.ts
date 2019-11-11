import { AuthActions, AuthTypes } from './auth.action';
import { User } from '../../../models/user.interface';

export interface UserState {
  user: User[];
}

export const initialState: UserState = {
  user: []
};

export function userReducer( state = initialState, action: AuthActions) {
  // switch (action.type) {
  //   case AuthTypes.LOGIN_SUCCESS:
  //     return {
  //       ...state,
  //       user: action.payload.data
  //     }
  //   case AuthTypes.LOGOUT:
  //     return {
  //       ...state,
  //       user: null,
  //     };
  //   default: {
  //     return state;
  //   }
  // }
}

export const geUser = (state: UserState) => state.user;
