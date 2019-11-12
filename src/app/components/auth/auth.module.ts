import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { routes } from './auth.routing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './store/auth.reducer';
import { AuthEffects } from './store/auth.effect';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from './auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth.interceptor.service';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, MaterialModule,  FormsModule,  RouterModule.forChild(routes),
    StoreModule.forFeature('auth', authReducer), EffectsModule.forFeature([AuthEffects])],
  exports: [RegisterComponent, LoginComponent],
  providers: [
    AuthService,
    AuthGuard,
    {
    provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
})

export class AuthModule {}
