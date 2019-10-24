import {
  ActionReducerMap,
  createSelector,
} from '@ngrx/store';

import * as fromMessages from '../home/store/message.reducer';


export interface AppState {
  data: fromMessages.State;
}

export const AppReducer: ActionReducerMap<AppState> = {
  data: fromMessages.reducer
};

export const getMessageState = (state: AppState) => state.data;
export const getAllMessages = createSelector(
  getMessageState,
  fromMessages.getMessages
);
