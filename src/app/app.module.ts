import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './store';
import { ChatModule } from './components/chat/chat.module';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './components/auth/auth.module';
import { AppLoadService } from './app-load.service';
import { initializeApp } from './initialize-app';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    ChatModule,
    AuthModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(AppReducer, {
      metaReducers: !environment.production ? [storeFreeze] : []
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
  ],
  providers: [
    AppLoadService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppLoadService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
