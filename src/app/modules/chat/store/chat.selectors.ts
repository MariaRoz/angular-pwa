import { AppState } from '../../../store';
import { createSelector } from '@ngrx/store';

export const selectChatFeature = (state: AppState) => state.chat;

export const selectMessages: any = createSelector(
  selectChatFeature,
  (state) => state.messages
);

export const selectOnlineUsers: any = createSelector(
  selectChatFeature,
  (state => state.onlineUsers)
)
