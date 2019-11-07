import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthFormComponent} from './components/auth/auth-form/auth-form.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat'
  },
  {
    path: 'auth',
    component: AuthFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
