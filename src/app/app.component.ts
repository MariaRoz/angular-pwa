import { Component } from '@angular/core';
import {MessagesService} from './services/messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private mesService: MessagesService) {
    this.mesService.load();
  }
}
