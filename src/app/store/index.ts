import {
  ActionReducerMap
} from '@ngrx/store';

import { chatReducer, ChatState } from '../components/chat/store/chat.reducer';

export interface AppState {
  chat: ChatState;
}

export const AppReducer: ActionReducerMap<AppState> = {
  chat: chatReducer
};
