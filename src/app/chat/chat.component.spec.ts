import {select, Store, StoreModule} from '@ngrx/store';
import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {ChatComponent} from './chat.component';
import {MaterialModule} from '../material.module';
import {RouterTestingModule} from '@angular/router/testing';
import {ActionTypes, ChatActions, LoadMessagesBegin, StartSendingMessage} from './store/chat.actions';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import * as fromApp from '../store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {chatReducer, ChatState} from './store/chat.reducer';
import {AppReducer} from '../store';
import {selectMessages} from './store/chat.selectors';
import {Observable, of} from 'rxjs';

const mockedInitialState: ChatState = {
  ...chatReducer,
  messages: []
};

const mockedReducer = (initialState = mockedInitialState, action) => {
  return chatReducer(initialState, action);
};



describe('SomeComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let store: MockStore<fromApp.AppState>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule, RouterTestingModule, BrowserAnimationsModule, StoreModule.forRoot(AppReducer),
        StoreModule.forFeature('chat', mockedReducer)
      ],
      declarations: [
        ChatComponent
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
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

  // it('should call LoadMessagesBegin when OnInit', () => {
  //   component.ngOnInit();
  //   expect(store.dispatch).toHaveBeenCalledWith(new LoadMessagesBegin());
  // });

  it('should set value for message when OnInit', () => {
    const selectorResult = store.pipe(select(selectMessages));


    selectorResult.subscribe(val => {
      console.log('val', val);
      expect(val).toEqual([2]);
    });
  });
});
