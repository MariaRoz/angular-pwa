import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginStart, SingUpStart} from '../store/auth.action';
import {Store} from '@ngrx/store';
import * as fromApp from '../../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new LoginStart({ email, password }));

    form.reset();
  }

}
