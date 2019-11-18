import { TestHotObservable } from 'jasmine-marbles/src/test-observables';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { AuthEffects } from './auth.effect';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';
import * as AuthActions from './auth.action';
import { Router } from '@angular/router';

const user = {
  id: 1,
  username: 'Name',
  password: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  access_token: 'token',
}

describe('AuthEffect', () => {
  let actions$: TestHotObservable;
  let effects: AuthEffects;
  let mockedAuthService: jasmine.SpyObj<AuthService>;
  let router: Router;


  const service = jasmine.createSpyObj('AuthService', ['registerUser', 'loginUser', 'setToken', 'removeToken' ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, StoreModule.forRoot({}), RouterTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: service
        },
        AuthEffects,
        provideMockActions(() => actions$),
      ],
    });
    mockedAuthService = TestBed.get(AuthService);
    effects = TestBed.get(AuthEffects);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should Sign up if service return success', () => {
    mockedAuthService.registerUser.and.returnValue(of(user));

    actions$ = hot('-a-', { a: new AuthActions.SingUpStart({email: '', password: ''}) });
    const expected = cold('-(bc)-', {
      b: new AuthActions.AuthenticateSuccess({username: 'Name', redirect: true}),
      c: new AuthActions.SetToken({token: 'token'})
    });

    expect(effects.authSingup$).toBeObservable(expected);
  });

  it('should return error if service throws an error when sing up', () => {
    const errorMessage = 'Marbles error';
    mockedAuthService.registerUser.and.throwError(errorMessage);

    const completion = new AuthActions.AuthenticateFail({errorMsg: errorMessage});

    actions$ = hot('-a-', { a: new AuthActions.SingUpStart({email: '', password: ''}) });
    const expected = cold('-#-', { b: completion }, new Error(errorMessage));

    expect(effects.authSingup$).toBeObservable(expected);
  });

  it('should Login if service return success', () => {
    mockedAuthService.loginUser.and.returnValue(of(user));

    actions$ = hot('-a-', { a: new AuthActions.LoginStart({email: '', password: ''}) });
    const expected = cold('-(bc)-', {
      b: new AuthActions.AuthenticateSuccess({username: 'Name', redirect: true}),
      c: new AuthActions.SetToken({token: 'token'})
    });

    expect(effects.authLogin$).toBeObservable(expected);
  });

  it('should return error if service throws an error when login', () => {
    const errorMessage = 'Marbles error';
    mockedAuthService.loginUser.and.throwError(errorMessage);

    const completion = new AuthActions.AuthenticateFail({errorMsg: errorMessage});

    actions$ = hot('-a-', { a: new AuthActions.LoginStart({email: '', password: ''}) });
    const expected = cold('-#-', { b: completion }, new Error(errorMessage));

    expect(effects.authLogin$).toBeObservable(expected);
  });

  it('should set token', () => {
    mockedAuthService.setToken.and.returnValue();
    actions$ = cold('-a-', { a: new AuthActions.SetToken({token: 'token'}) });
    effects.setToken$.subscribe(() => {
      expect(mockedAuthService.setToken).toHaveBeenCalledWith('token');
    });
  });

  it('should redirect if service success', () => {
    actions$ = hot('-a-', {a: new AuthActions.AuthenticateSuccess({username: '', redirect: true})});
    effects.authSuccess$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/chat']);
    });
  });

  it('should logout', () => {
    actions$ = hot('-a-', {a: new AuthActions.Logout()});
    const expected = cold('-b-', {b: new AuthActions.ResetToken()});

    expect(effects.authLogout$).toBeObservable(expected);
  });

  it('should reset token', () => {
    mockedAuthService.removeToken.and.returnValue();
    actions$ = cold('-a-', { a: new AuthActions.ResetToken()});
    effects.resetToken$.subscribe(() => {
      expect(mockedAuthService.removeToken).toHaveBeenCalled();
    });
  });
});

