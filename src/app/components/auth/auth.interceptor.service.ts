import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store';
import {exhaustMap, map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {selectAuth} from './store/auth.selector';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private store: Store<fromApp.AppState>,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectAuth).pipe(
      take(1),
      exhaustMap(data => {
        if (!data.token) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', JSON.stringify(data.token)),
        });
        return next.handle(modifiedReq);
      }),
    );
  }
}

