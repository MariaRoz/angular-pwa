import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Message } from '../../../models/message.interface';
import {select, Store} from '@ngrx/store';
import * as fromApp from '../../../store';
import { LoadMessagesBegin, StartSendingMessage } from '../store/chat.actions';
import { Observable, of } from 'rxjs';
import { selectMessages } from '../store/chat.selectors';
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

  public messages$: Observable<Message[]> = of([]);
  public user$: Observable<User> = of();

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.scrollToBottom();

    this.messages$ = this.store.pipe(
      select(selectMessages)
    );

    this.user$ = this.store.select(selectCurrentUser);

    this.store.dispatch(new LoadMessagesBegin());
    this.store.dispatch(new GetCurrentUser());
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  addMessage(message): void {
    this.store.dispatch(new StartSendingMessage({message}));
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
