import { AppState } from '../../../store';
import {createSelector, MemoizedSelector} from '@ngrx/store';
import {Message} from '../../../models/message.interface';

export const selectChatFeature = (state: AppState) => state.chat;

export const selectMessages: MemoizedSelector<AppState, Message[]> = createSelector(
  selectChatFeature,
  (state) => state.messages
);

export const selectOnlineUsers: MemoizedSelector<AppState, string[]> = createSelector(
  selectChatFeature,
  (state => state.onlineUsers)
);
