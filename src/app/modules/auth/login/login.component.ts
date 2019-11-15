import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginStart } from '../store/auth.action';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store';
import { selectAuthError } from '../store/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent {
  errorMessage: Observable<string>;

  constructor(private store: Store<fromApp.AppState>) { }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new LoginStart({ email, password }));

    this.errorMessage = this.store.select(selectAuthError);

    form.reset();
  }

}
