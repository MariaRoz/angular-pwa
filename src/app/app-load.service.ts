import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store';
import { AuthService } from './modules/auth/auth.service';
import { SetToken } from './modules/auth/store/auth.action';

@Injectable()
export class AppLoadService {
  constructor(private store: Store<fromApp.AppState>, private authService: AuthService) {
  }
  init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const token = this.authService.getToken();
      if (token && token !== 'null') {
        this.store.dispatch(new SetToken({token}));
      }
      resolve();
    });
  }
}

