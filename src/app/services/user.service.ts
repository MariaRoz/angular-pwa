import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

    registerUser(username, password)  {
    return this.http.post<User>('http://localhost:3000/auth/register', {username, password});
  }

  loginUser(username, password) {
    return this.http.post<User>('http://localhost:3000/auth/login', {username, password});
  }

}
