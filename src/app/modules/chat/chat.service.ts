import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../../models/message.interface';
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

  getOnlineUsers(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:3000/users/online');
  }

  sendOfflineMessages(data: [{message: string, createdAt: Date}] ): Observable<[{message: string, createdAt: Date}]> {
    return this.http.post<[{message: string, createdAt: Date}]>('http://localhost:3000/messages/offline', data);
  }
}

