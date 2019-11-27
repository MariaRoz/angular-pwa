import { Effect } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import * as MessageActions from '../modules/chat/store/chat.actions';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Observable, of} from 'rxjs';

@Injectable()
export class AppEffects {

  constructor(private socket: Socket) {}

  @Effect()
  takeSocketEvent$ = this.socket.fromEvent('notification').pipe(
    map((res: {type: string, payload?: object}) => {
      return {type: res.type, payload: res.payload};
    })
  );
}
