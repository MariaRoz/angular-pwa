import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as fromApp from '../store';
import {Store} from '@ngrx/store';
import {Message} from '../models/message.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:3000/messages/' );
  }

  sendMessage(message): Observable<Message> {
    return this.http.post<Message>('http://localhost:3000/messages/', { message, name: '' });
  }

}
