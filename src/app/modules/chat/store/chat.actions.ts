import { Action } from '@ngrx/store';
import { Message } from '../../../models/message.interface';

export enum ActionTypes {
  LoadMessagesBegin = '[Messages] Start loading messages ',
  LoadMessagesSuccess = '[Messages] Load messages success',
  LoadMessagesFailure = '[Messages] Load messages failure',
  StartSendingMessage = '[Messages] Start sending message',
  MessageSendSuccess = '[Messages] Message send success',
  MessageSendFailure = '[Messages] Message send failure',
}

export class StartSendingMessage implements Action {
  readonly type = ActionTypes.StartSendingMessage;
  constructor(public payload: { message: string }) {}
}

export class MessageSendSuccess implements Action {
  readonly type = ActionTypes.MessageSendSuccess;
}

export class MessageSendFailure implements Action {
  readonly type = ActionTypes.MessageSendFailure;

  constructor(public payload: { error: string }) {}
}

export class LoadMessagesBegin implements Action {
  readonly type = ActionTypes.LoadMessagesBegin;
}

export class LoadMessagesSuccess implements Action {
  readonly type = ActionTypes.LoadMessagesSuccess;

  constructor(public payload: { data: Message[] }) {}
}

export class LoadMessagesFailure implements Action {
  readonly type = ActionTypes.LoadMessagesFailure;

  constructor(public payload: { error: string }) {}
}

export type ChatActions = LoadMessagesBegin | LoadMessagesSuccess | LoadMessagesFailure|
  StartSendingMessage | MessageSendSuccess | MessageSendFailure;