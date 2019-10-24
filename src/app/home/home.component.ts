import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoading = false;
  error: string = null;
  messages: [] = [];
  constructor(private mesService: MessagesService) { }

  ngOnInit() {
    this.mesService.getMessagesFromStore().subscribe( dataState => {
      this.isLoading = dataState.loading;
      this.error = dataState.error;
      if (dataState.data) {
        this.messages = dataState.data;
      }
    });
  }
  AddMessage() {
    console.log('addmess');
  }

}
