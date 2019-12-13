import { ActionTypes, ChatActions } from './chat.actions';
import { Message } from '../../../models/message.interface';

export interface ChatState {
  messages: Message[];
  onlineUsers: string[];
  isOnline: boolean;
  offlineMessages: object[];
}

export const initialState: ChatState = {
  messages: [],
  onlineUsers: [],
  isOnline: navigator.onLine,
  offlineMessages: [],
};

export function chatReducer(
  state = initialState,
  action: ChatActions
): ChatState {
  switch (action.type) {
    case ActionTypes.LoadMessagesSuccess: {
      return {
        ...state,
        messages: action.payload.data
      };
    }
    case ActionTypes.GetOnlineUsers: {
      return {
        ...state,
        onlineUsers: action.payload.data
      };
    }
    case ActionTypes.SetIsOnline:
      return {
        ...state,
        isOnline: action.payload
      };
      case ActionTypes.OfflineMessages:
        return {
          ...state,
          offlineMessages: [...state.offlineMessages, action.payload]
        };
        case ActionTypes.ResetOfflineMessages:
          return {
            ...state,
            offlineMessages: []
          }
    default: {
      return state;
    }
  }
}

export const getMessages = (state: ChatState) => state.messages;
