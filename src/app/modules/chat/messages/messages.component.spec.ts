import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import { MaterialModule } from '../../../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadMessagesBegin, StartSendingMessage } from '../store/chat.actions';
import { MockStore } from '@ngrx/store/testing';
import * as fromApp from '../../../store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { chatReducer, ChatState } from '../store/chat.reducer';
import { of, throwError } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from '../store/chat.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatService } from '../chat.service';
import { Message } from '../../../models/message.interface';


const MOCKED_MESSAGE_1: Message = {
  id: 1,
  message: 'yeah',
  createdAt: new Date(),
};
const MOCKED_MESSAGE_2: Message = {
  id: 2,
  message: 'some text here',
  createdAt: new Date(),
};

const mockedInitialState: ChatState = {
  ...chatReducer,
  messages: [
    MOCKED_MESSAGE_1
  ]
};

const RECEIVED_MESSAGES: Message[] = [
  MOCKED_MESSAGE_1,
  MOCKED_MESSAGE_2
];

const mockedReducer = (initialState = mockedInitialState, action) => {
  return chatReducer(initialState, action);
};

const spyChatService = jasmine.createSpyObj('ChatService', ['getMessages']);

describe('ChatComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let store: MockStore<fromApp.AppState>;
  let MockedChatService: jasmine.SpyObj<ChatService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule, RouterTestingModule, BrowserAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('chat', mockedReducer),
        EffectsModule.forRoot([ChatEffects]),
        HttpClientTestingModule
      ],
      declarations: [
        MessagesComponent
      ],
      providers: [
        {provide: ChatService, useValue: spyChatService}
        ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

    MockedChatService = TestBed.get(ChatService);
  });

  it('should create messages component', () => {
    expect(component).toBeTruthy();
  });

  it('messages$ should be [] as default', () => {
    component.messages$.subscribe(res => expect(res).toEqual([]));
  });

  it('isLoading should be false as default', () => {
    expect(component.isLoading).toBe(false);
  });

  it('textarea should return right value', () => {
    const textarea = fixture.debugElement.nativeElement.querySelector('textarea');
    expect(textarea.value).toEqual('');
  });

  it('should call StartSendingMessage action onclick addMessage', () => {
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(store.dispatch).toHaveBeenCalledWith(new StartSendingMessage({message: ''}));
  });

  it('should call LoadMessagesBegin when OnInit', () => {
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(new LoadMessagesBegin());
  });

  it('should receive messages list from store (mocked in service used by effects)', () => {
    MockedChatService.getMessages.and.returnValue(of(RECEIVED_MESSAGES));
    component.ngOnInit();
    component.messages$.subscribe(res => {
      expect(res).toEqual(RECEIVED_MESSAGES);
    });
  });

  it('should show previously received messages in case of error', () => {
    MockedChatService.getMessages.and.returnValue(throwError(new Error('Some error')));
    component.ngOnInit();
    component.messages$.subscribe(res => {
      expect(res).toEqual([MOCKED_MESSAGE_1]);
    });
  });
});
