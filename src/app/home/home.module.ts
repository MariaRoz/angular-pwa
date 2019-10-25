import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import { routes } from './home.routing';
import {MaterialModule} from '../material.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    MaterialModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule {
}
