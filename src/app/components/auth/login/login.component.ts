import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginStart } from '../store/auth.action';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store';
import { selectAuth } from '../store/auth.selector';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: Observable<string>;

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

    this.errorMessage = this.store.select(selectAuth).pipe(
      map(data => data.authError));

    form.reset();
  }

}
