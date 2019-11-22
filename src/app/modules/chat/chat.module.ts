import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MessagesComponent} from './messages/messages.component';
import { routes } from './chat.routing';
import { MaterialModule } from '../../material.module';
import { ChatEffects } from './store/chat.effects';
import { EffectsModule } from '@ngrx/effects';
import { chatReducer } from './store/chat.reducer';
import { StoreModule } from '@ngrx/store';
import {ChatService} from './chat.service';
import {HttpClientModule} from '@angular/common/http';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {}};

@NgModule({
  declarations: [
    MessagesComponent
  ],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('chat', chatReducer),
    EffectsModule.forFeature([ChatEffects]),
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    ChatService
  ],
  bootstrap: [MessagesComponent]
})
export class ChatModule {
}
