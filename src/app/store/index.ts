import {
  ActionReducerMap
} from '@ngrx/store';

import { chatReducer, ChatState } from '../modules/chat/store/chat.reducer';
import { authReducer, AuthState } from '../modules/auth/store/auth.reducer';

export interface AppState {
  chat: ChatState;
  auth: AuthState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  chat: chatReducer,
  auth: authReducer,
};
