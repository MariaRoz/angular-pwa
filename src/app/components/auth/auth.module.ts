import { NgModule } from '@angular/core';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [CommonModule, MaterialModule,  FormsModule],
  exports: [AuthFormComponent],
})

export class AuthModule {}

