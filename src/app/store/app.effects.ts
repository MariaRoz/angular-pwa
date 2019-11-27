import { Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as MessageActions from '../modules/chat/store/chat.actions';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class AppEffects {

  constructor(private socket: Socket) {}

  @Effect()
  takeSocketEvent$ = this.socket.fromEvent('chat').pipe(
    map((res: {action: string, payload?: object}) => {
      return new MessageActions.ChatUpdated(res);
    })
  );
}
