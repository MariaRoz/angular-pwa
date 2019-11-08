import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {routes} from '../auth/auth.routing';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [CommonModule, MaterialModule,  FormsModule,  RouterModule.forChild(routes)],
  exports: [RegisterComponent, LoginComponent],
})

export class AuthModule {}

