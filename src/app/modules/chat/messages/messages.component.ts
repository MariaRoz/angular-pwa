import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../../models/message.interface';
import {select, Store} from '@ngrx/store';
import * as fromApp from '../../../store';
import { LoadMessagesBegin, SendOfflineMessages, StartOnlineOfflineCheck, StartSendingMessage } from '../store/chat.actions';
import { Observable, of } from 'rxjs';
import { selectMessages, selectOnlineOfflineCheck, selectOnlineUsers } from '../store/chat.selectors';
import { selectCurrentUser } from '../../auth/store/auth.selector';
import { GetCurrentUser } from '../../auth/store/auth.action';
import { User } from '../../../models/user.interface';


@Component({
  selector: 'app-home',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroll', {static: false}) private myScrollContainer: ElementRef;
  isLoading = false;
  offlineMessages: object[] = [];
  isOnline$: Observable<boolean>;

  public messages$: Observable<Message[]> = of([]);
  public user$: Observable<User> = of();
  public onlineUsers: Observable<string[]> = of([]);

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.messages$ = this.store.pipe(
      select(selectMessages)
    );

    this.user$ = this.store.select(selectCurrentUser);
    this.onlineUsers = this.store.select(selectOnlineUsers);

    this.store.dispatch(new LoadMessagesBegin());
    this.store.dispatch(new GetCurrentUser());
    this.store.dispatch(new StartOnlineOfflineCheck());

    this.isOnline$ = this.store.select(selectOnlineOfflineCheck);

    this.isOnline$.subscribe(isOnline => {
      if (isOnline && this.offlineMessages.length !== 0) {
        this.store.dispatch(new SendOfflineMessages(this.offlineMessages));
        this.offlineMessages = [];
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  addMessage(message: string): void {
    navigator.onLine ? this.store.dispatch(new StartSendingMessage({message})) :
      this.offlineMessages.push({message, createdAt: new Date()});
  }

  scrollToBottom(): void {
    this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
  }
}
