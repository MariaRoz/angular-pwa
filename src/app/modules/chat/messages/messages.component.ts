import { Component, OnInit } from '@angular/core';
import { Message } from '../../../models/message.interface';
import {select, Store} from '@ngrx/store';
import * as fromApp from '../../../store';
import { LoadMessagesBegin, StartSendingMessage } from '../store/chat.actions';
import { Observable, of } from 'rxjs';
import { selectMessages } from '../store/chat.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  isLoading = false;

  public messages$: Observable<Message[]> = of([]);

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.messages$ = this.store.pipe(
      select(selectMessages)
    );

    this.store.dispatch(new LoadMessagesBegin());
  }

  addMessage(message): void {
    this.store.dispatch(new StartSendingMessage({message}));
  }
}
