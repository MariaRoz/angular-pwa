import { Injectable } from '@angular/core';
import * as MessageActions from './chat.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {map, switchMap, catchError, mergeMap} from 'rxjs/operators';
import { of } from 'rxjs';

import { ChatService } from '../../services/chat.service';

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
    switchMap((sendAction: MessageActions.StartSendingMessage) => this.mesService.sendMessage(sendAction.payload)),
    mergeMap(() => [new MessageActions.MessageSendSuccess(), new MessageActions.LoadMessagesBegin()]),
    catchError(error => of(new MessageActions.MessageSendFailure({error})))
  );
}
