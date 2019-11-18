import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { MaterialModule } from '../../../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../store/auth.effect';
import {HttpClientModule, HttpErrorResponse} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SingUpStart } from '../store/auth.action';
import { MockStore } from '@ngrx/store/testing';
import * as fromApp from '../../../store';
import { authReducer } from '../store/auth.reducer';
import { throwError } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore<fromApp.AppState>;
  let mockedAuthService: jasmine.SpyObj<AuthService>;

  const service = jasmine.createSpyObj('AuthService', ['registerUser']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterTestingModule, FormsModule, StoreModule.forRoot({}), StoreModule.forFeature('auth', authReducer),
        EffectsModule.forRoot([AuthEffects]), HttpClientModule, BrowserAnimationsModule],
      declarations: [RegisterComponent],
      providers: [
        {
          provide: AuthService,
          useValue: service
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    mockedAuthService = TestBed.get(AuthService);
  });

  it('should create the register component', () => {
    expect(component).toBeTruthy();
  });

  it('should call SingUpStart action onclick onSubmit', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(store.dispatch).toHaveBeenCalledWith(new SingUpStart({email: undefined, password: undefined}));
  });

  it('should return an error when server returns error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Mocked Error'
    });

    mockedAuthService.registerUser.and.returnValue(throwError(errorResponse));

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    component.errorMessage.subscribe(res => expect(res).toEqual('Mocked Error'));
  });

});
