import {
  ActionReducerMap
} from '@ngrx/store';

import { chatReducer, ChatState } from '../components/chat/store/chat.reducer';
import { authReducer, AuthState } from '../components/auth/store/auth.reducer';

export interface AppState {
  chat: ChatState;
  auth: AuthState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  chat: chatReducer,
  auth: authReducer,
};
