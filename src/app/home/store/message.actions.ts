import { Action } from '@ngrx/store';

export enum ActionTypes {
  LoadMessagesBegin = '[Messages] Load messages begin',
  LoadMessagesSuccess = '[Messages] Load messages success',
  LoadMessagesFailure = '[Messages] Load messages failure'
}

export class LoadMessagesBegin implements Action {
  readonly type = ActionTypes.LoadMessagesBegin;
}

export class LoadMessagesSuccess implements Action {
  readonly type = ActionTypes.LoadMessagesSuccess;

  constructor(public payload: { data: any }) {}
}

export class LoadMessagesFailure implements Action {
  readonly type = ActionTypes.LoadMessagesFailure;

  constructor(public payload: { error: any }) {}
}

export type MessageActions = LoadMessagesBegin | LoadMessagesSuccess | LoadMessagesFailure;
