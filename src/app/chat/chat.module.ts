import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ChatComponent} from './chat.component';
import { routes } from './chat.routing';
import { MaterialModule } from '../material.module';
import { ChatEffects } from './store/chat.effects';
import { EffectsModule } from '@ngrx/effects';
import { chatReducer } from './store/chat.reducer';
import { StoreModule } from '@ngrx/store';
import {ChatService} from '../services/chat.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
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
  bootstrap: [ChatComponent]
})
export class ChatModule {
}
