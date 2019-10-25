import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import { routes } from './home.routing';
import {MaterialModule} from '../material.module';
import { MessageEffects } from './store/message.effects';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './store/message.reducer'
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    EffectsModule.forRoot([MessageEffects]),
    StoreModule.forFeature('reducer', reducer),
    MaterialModule
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule {
}
