import { Injectable } from '@angular/core';
import * as MessageActions from './chat.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import { of } from 'rxjs';

import { ChatService } from '../chat.service';

@Injectable()
export class ChatEffects {
  constructor(private actions: Actions, private mesService: ChatService) {}

  @Effect()
  loadMessagesBegin$ = this.actions.pipe(
    ofType(MessageActions.ActionTypes.LoadMessagesBegin),
    switchMap(() => {
      return this.mesService.getMessages().pipe(
        map(data => new MessageActions.LoadMessagesSuccess({ data })),
        catchError(error =>
          of(new MessageActions.LoadMessagesFailure({ error }))
        )
      );
    })
  );

  @Effect({dispatch: true})
  sendMessage = this.actions.pipe(
    ofType(MessageActions.ActionTypes.StartSendingMessage),
    switchMap((sendAction: MessageActions.StartSendingMessage) => this.mesService.sendMessage(sendAction.payload.message)),
    mergeMap(() => [new MessageActions.MessageSendSuccess(), new MessageActions.LoadMessagesBegin()]),
    catchError(error => of(new MessageActions.MessageSendFailure({error})))
  );

  @Effect()
  updateChat$ = this.actions.pipe(
    ofType(MessageActions.ActionTypes.ChatUpdated),
    map(() => {
      return new MessageActions.LoadMessagesBegin();
      })
  );

  @Effect()
  getOnlineUsers$ = this.actions.pipe(
    ofType(MessageActions.ActionTypes.LoadMessagesBegin),
    switchMap(() => {
      return this.mesService.getOnlineUsers().pipe(
        map(data => new MessageActions.GetOnlineUsers({data})),
        catchError(error =>
          of(new MessageActions.LoadMessagesFailure({ error }))
        )
      );
    })
  );

  @Effect()
  sendOfflineMessages$ = this.actions.pipe(
    ofType(MessageActions.ActionTypes.SendOfflineMessages),
    switchMap((sendAction: MessageActions.SendOfflineMessages) => this.mesService.sendOfflineMessages(sendAction.payload)),
    mergeMap(() => [new MessageActions.MessageSendSuccess(), new MessageActions.LoadMessagesBegin()]),
    catchError(error => of(new MessageActions.MessageSendFailure({error})))
  );

}
