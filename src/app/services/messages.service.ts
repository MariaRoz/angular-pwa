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
  sendMessage( message, author ) {
    console.log(message, 'data');
    return this.http.post('http://localhost:3000/messages/', { message, name: author });
  }
  load() {
    this.store.dispatch( new MessageAction.LoadMessagesBegin() );
  }
  getMessagesFromStore() {
    return this.store.select(fromApp.getAllMessages);
  }
  sentMess(message, author) {
    this.store.dispatch(new MessageAction.StartSendingMessage({ message, author}));
  }
}
