import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../models/message.interface';
import {Observable} from 'rxjs';

@Injectable()
export class ChatService {

  constructor(private http: HttpClient) {
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:3000/messages/' );
  }

  sendMessage(message): Observable<Message> {
    return this.http.post<Message>('http://localhost:3000/messages/', { message });
  }
}
