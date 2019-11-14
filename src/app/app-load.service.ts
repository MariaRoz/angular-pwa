import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './store';
import { AuthService } from './services/auth.service';
import { SetToken } from './components/auth/store/auth.action';

@Injectable()
export class AppLoadService {
  constructor(private store: Store<fromApp.AppState>, private authService: AuthService) {
  }
  Init(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const token = this.authService.getToken();
      if (token && token !== 'null') {
        this.store.dispatch(new SetToken({token}));
      }
      resolve();
    });
  }
}

