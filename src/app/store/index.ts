import {
  ActionReducerMap
} from '@ngrx/store';

import { chatReducer, ChatState } from '../components/chat/store/chat.reducer';
import {userReducer, UserState} from '../components/auth/store/auth.reducer';

export interface AppState {
  chat: ChatState;
  auth: UserState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  chat: chatReducer,
  auth: userReducer,
};
