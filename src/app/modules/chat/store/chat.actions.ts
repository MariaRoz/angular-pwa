import { Action } from '@ngrx/store';
import { Message } from '../../../models/message.interface';

export enum ActionTypes {
  LoadMessagesBegin = '[Messages] Start loading messages ',
  LoadMessagesSuccess = '[Messages] Load messages success',
  LoadMessagesFailure = '[Messages] Load messages failure',
  StartSendingMessage = '[Messages] Start sending message',
  MessageSendSuccess = '[Messages] Message send success',
  MessageSendFailure = '[Messages] Message send failure',
  ChatUpdated = '[Chat] Chat Updated',
  GetOnlineUsers = '[Online] Get online users',
  StartOnlineOfflineCheck = '[Network] StartOnlineOfflineCheck',
  SetIsOnline = '[Network] SetIsOnline',
  OfflineMessages = '[Messages] Offline messages',
  ResetOfflineMessages = '[Messages] Reset offline messages'
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

export class ChatUpdated implements Action {
  readonly type = ActionTypes.ChatUpdated;

  constructor(public payload?: object) {}
}

export class GetOnlineUsers implements Action {
  readonly type = ActionTypes.GetOnlineUsers;

  constructor(public payload: { data: string[] }) {}
}

export class StartOnlineOfflineCheck implements Action {
  readonly type = ActionTypes.StartOnlineOfflineCheck;
}

export class SetIsOnline implements Action {
  readonly type = ActionTypes.SetIsOnline;

  constructor(public payload: boolean) {}
}

export class OfflineMessages implements Action {
  readonly type = ActionTypes.OfflineMessages;

  constructor(public payload: {message: string, createdAt: Date} ) {}
}

export class ResetOfflineMessages implements Action {
  readonly type = ActionTypes.ResetOfflineMessages;
}

export type ChatActions = LoadMessagesBegin | LoadMessagesSuccess | LoadMessagesFailure| StartSendingMessage |
  MessageSendSuccess | MessageSendFailure | ChatUpdated | GetOnlineUsers | StartOnlineOfflineCheck
  | SetIsOnline | OfflineMessages | ResetOfflineMessages;
