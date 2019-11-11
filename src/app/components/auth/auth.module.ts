import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {routes} from './auth.routing';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {userReducer} from './store/auth.reducer';
import {UserEffects} from './store/auth.effect';
import {UserService} from '../../services/user.service';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, MaterialModule,  FormsModule,  RouterModule.forChild(routes),
    StoreModule.forFeature('auth', userReducer), EffectsModule.forFeature([UserEffects])],
  exports: [RegisterComponent, LoginComponent],
  providers: [
    UserService
  ],
})

export class AuthModule {}
