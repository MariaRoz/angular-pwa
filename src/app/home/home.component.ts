import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../services/messages.service';
import {MessageInterface} from '../models/message.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  error: string = null;
  messages: Array<MessageInterface> = [];
  constructor(private mesService: MessagesService) { }

  ngOnInit() {
    this.mesService.getMessagesFromStore().subscribe( dataState => {
      // this.isLoading = dataState.loading;
      // this.error = dataState.error;
      if (dataState) {
        this.messages = dataState;
        console.log(dataState, 'mess');
      }
    });
  }
  AddMessage(messages, author) {
    this.mesService.sentMess(messages, author);
  }

}
