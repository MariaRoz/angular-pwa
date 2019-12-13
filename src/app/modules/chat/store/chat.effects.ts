import { Injectable } from '@angular/core';
import * as MessageActions from './chat.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, mergeMap, mapTo } from 'rxjs/operators';
import { EMPTY, fromEvent, merge, of } from 'rxjs';

import { ChatService } from '../chat.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store';
import { selectOfflineMessages } from './chat.selectors';


@Injectable()
export class ChatEffects {
  constructor( private actions: Actions, private mesService: ChatService, private store: Store<fromApp.AppState> ) {}

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

  @Effect()
  sendMessage$ = this.actions.pipe(
    ofType(MessageActions.ActionTypes.StartSendingMessage),
    switchMap((sendAction: MessageActions.StartSendingMessage) => {
      if (!navigator.onLine) {
        return of(new MessageActions.OfflineMessages({message: sendAction.payload.message, createdAt: new Date()}));
      }
      return this.mesService.sendMessage(sendAction.payload.message);
    }),
      mergeMap((result: MessageActions.OfflineMessages) => {
        if (!navigator.onLine) {
          return of(result);
        }
        return [new MessageActions.MessageSendSuccess(), new MessageActions.LoadMessagesBegin()]
      }),
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
  startOnlineOfflineCheck$ = this.actions.pipe(
    ofType(MessageActions.ActionTypes.StartOnlineOfflineCheck),
    switchMap(() => {
      return merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false))
      );
    }),
    map(isOnline => {
      return new MessageActions.SetIsOnline(isOnline);
    })
  );

  @Effect()
  OfflineMessages$ = this.store.select(selectOfflineMessages).pipe(
    switchMap((data: {messages: [], isOnline: boolean}) => {
      if (data.messages.length !== 0 && data.isOnline) {
        return this.mesService.sendOfflineMessages(data.messages);
      }
      return EMPTY;
    }),
    map(() => new MessageActions.ResetOfflineMessages())
  );

}
