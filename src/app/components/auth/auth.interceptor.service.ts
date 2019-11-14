import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store';
import { mergeMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { selectAuthToken } from './store/auth.selector';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthToken).pipe(
      take(1),
      mergeMap(token => {
        if (!token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        return next.handle(modifiedReq);
      }),
    );
  }
}
