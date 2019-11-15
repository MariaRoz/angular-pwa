import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(username, password): Observable<User>  {
    return this.http.post<User>('http://localhost:3000/auth/register', {username, password});
  }

  loginUser(username, password): Observable<User> {
    return this.http.post<User>('http://localhost:3000/auth/login', {username, password});
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token): void {
    return localStorage.setItem('token', token);
  }

   removeToken(): void {
    localStorage.removeItem('token');
  }

}
