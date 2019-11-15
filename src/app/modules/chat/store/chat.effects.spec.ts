import { cold, hot } from 'jasmine-marbles';
import { ChatEffects } from './chat.effects';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatService } from '../chat.service';
import { TestHotObservable } from 'jasmine-marbles/src/test-observables';
import { provideMockActions } from '@ngrx/effects/testing';
import { Message } from '../../../models/message.interface';
import {of, throwError} from 'rxjs';
import * as ChatActions from './chat.actions';
import { StoreModule } from '@ngrx/store';

describe('ChatEffects', () => {
  let actions$: TestHotObservable;
  let mockedChatService: jasmine.SpyObj<ChatService>;
  let effects: ChatEffects;

  const service = jasmine.createSpyObj('ChatService', ['getMessages', 'sendMessage' ]);
  const message: Message =  { id: 1, message: 'test', createdAt: new Date() };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, StoreModule.forRoot({})
      ],
      providers: [
        {provide: ChatService, useValue: service},
        ChatEffects,
        provideMockActions(() => actions$),
      ],
    });
    mockedChatService = TestBed.get(ChatService);
    effects = TestBed.get(ChatEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fetch messages if service return success', () => {
    mockedChatService.getMessages.and.returnValue(of([message]));

    const completion = new ChatActions.LoadMessagesSuccess({ data: [message] });

    actions$ = hot('-a-', { a: new ChatActions.LoadMessagesBegin() });
    const expected = cold('-b-', { b: completion });

    expect(effects.loadMessagesBegin$).toBeObservable(expected);
    expect(mockedChatService.getMessages).toHaveBeenCalled();
  });

  it('should return error if service throws an error for receiving messages ', () => {
    const errorMessage = 'Marbles error';
    mockedChatService.getMessages.and.throwError(errorMessage);

    const completion = new ChatActions.LoadMessagesFailure({ error: errorMessage });

    actions$ = hot('-a-', { a: new ChatActions.LoadMessagesBegin() });
    const expected = cold('-#-', { b: completion }, new Error(errorMessage));

    expect(effects.loadMessagesBegin$).toBeObservable(expected);
  });

  it('should send message if service return success', () => {
    actions$ = hot('-a---a-', { a: new ChatActions.StartSendingMessage({ message: 'some_text' }) });
    mockedChatService.sendMessage.and.callFake( (text) => of({id: 1, message: text, createdAt: new Date()}));
    const expected = cold('-(bc)(bc)-', { b: new ChatActions.MessageSendSuccess(), c: new ChatActions.LoadMessagesBegin()});

    expect(effects.sendMessage).toBeObservable(expected);
    expect(mockedChatService.sendMessage).toHaveBeenCalledWith('some_text');
  });

  it('should return error if service throws an error for sending messages', () => {
    const errorMessage = 'Marbles error';
    const err = new Error(errorMessage);

    actions$ = hot('-a-', { a: new ChatActions.StartSendingMessage({ message: 'some_text' }) });

    mockedChatService.sendMessage.and.callFake(() => throwError(errorMessage));

    const completion = new ChatActions.MessageSendFailure({ error: errorMessage });
    const expected = cold('-(b|)-', {b: completion}, err);

    expect(effects.sendMessage).toBeObservable(expected);
  });

});
