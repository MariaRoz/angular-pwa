import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from '../auth/auth.guard';

export const routes: Routes = [
  {
    path: 'chat',
    component: MessagesComponent,
    canActivate: [AuthGuard]
  }
];
