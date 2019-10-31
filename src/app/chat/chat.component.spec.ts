import { Store, StoreModule } from '@ngrx/store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { MaterialModule } from '../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadMessagesBegin, StartSendingMessage } from './store/chat.actions';
import { MockStore } from '@ngrx/store/testing';
import * as fromApp from '../store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { chatReducer, ChatState } from './store/chat.reducer';
import { of } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { ChatEffects } from './store/chat.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatService } from '../services/chat.service';
import { Message } from '../models/message.interface';

const mockedInitialState: ChatState = {
  ...chatReducer,
  messages: [{
    id: 1,
    message: '',
    createdAt: new Date(),
  }]
};

const mockedReducer = (initialState = mockedInitialState, action) => {
  return chatReducer(initialState, action);
};

const spyChatService = jasmine.createSpyObj('ChatService', ['getMessages']);
const mockedMessages: Message[] = [{id: 1, message: '', createdAt: new Date()}];


describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
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
        ChatComponent
      ],
      providers: [
        {provide: ChatService, useValue: spyChatService}
        ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    MockedChatService = TestBed.get(ChatService);
    MockedChatService.getMessages.and.returnValue(of(mockedMessages));
  });

  it('should create chat component', () => {
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

  it('should set value for message from service', () => {
    component.ngOnInit();
    store.dispatch(new LoadMessagesBegin());
    component.messages$.subscribe(res => {
      expect(res).toEqual(mockedMessages);
    });
  });

  it('should call getMessages function when OnInit', () => {
    component.ngOnInit();
    expect(MockedChatService.getMessages).toHaveBeenCalled();
  });

  it('getMessages should return messages', () => {
    MockedChatService.getMessages().subscribe(res => expect(res).toBe(mockedMessages));
  });
});
