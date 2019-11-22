import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../../models/message.interface';
import {Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';

@Injectable()
export class ChatService {

  constructor(private http: HttpClient, private socket: Socket) {
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>('http://localhost:3000/messages/' );
  }

  sendMessage(message): Observable<Message> {
    this.socket.emit('chat', message);
    return this.http.post<Message>('http://localhost:3000/messages/', { message });
  }
  // receiveChat(){
  //   return this.socket.fromEvent('chat');
  // }
  //
  // getUsers(){
  //   return this.socket.fromEvent('users');
  // }
}

