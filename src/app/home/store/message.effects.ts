import { Injectable } from '@angular/core';
import * as MessageActions from './message.actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {MessagesService} from '../../services/messages.service';

@Injectable()
export class MessageEffects {
  constructor(private actions: Actions, private mesService: MessagesService) {}

  @Effect()
  loadMessages = this.actions.pipe(
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
}
