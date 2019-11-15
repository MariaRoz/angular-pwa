import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {MaterialModule} from '../../../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {Store, StoreModule} from '@ngrx/store';
import {authReducer} from '../store/auth.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from '../store/auth.effect';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../auth.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MockStore} from '@ngrx/store/testing';
import * as fromApp from '../../../store';
import { LoginStart} from '../store/auth.action';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<fromApp.AppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, FormsModule, StoreModule.forRoot({}), StoreModule.forFeature('auth', authReducer),
        EffectsModule.forRoot([AuthEffects]), HttpClientModule, BrowserAnimationsModule],
      declarations: [LoginComponent],
      providers: [AuthService]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should call LoginStart action onclick onSubmit', () => {
    // const email = fixture.debugElement.nativeElement.querySelector('#email')
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(store.dispatch).toHaveBeenCalledWith(new LoginStart({email: undefined, password: undefined}));
    });
});
