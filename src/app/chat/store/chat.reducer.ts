import { ActionTypes, ChatActions } from './chat.actions';
import { Message } from '../../models/message.interface';

export interface ChatState {
  messages: Message[];
}

export const initialState: ChatState = {
  messages: [],
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
    default: {
      return state;
    }
  }
}

export const getMessages = (state: ChatState) => state.messages;
