import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as MessageAction from '../home/store/message.actions';
import * as fromApp from '../store';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }
  getMessages() {
    return this.http.get('http://localhost:3000/messages/' );
  }
  load() {
    this.store.dispatch( new MessageAction.LoadMessagesBegin() );
  }
  getMessagesFromStore() {
    return this.store.select(fromApp.getMessageState);
  }
}
