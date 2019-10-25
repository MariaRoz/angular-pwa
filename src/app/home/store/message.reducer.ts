import {ActionTypes, MessageActions} from './message.actions';
import {MessageInterface} from '../../models/message.interface';

export interface State {
  data: Array<MessageInterface>;
  message: any;
  loading: boolean;
  error: string;
}

export const initialState: State = {
  data: null,
  message: null,
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: MessageActions
): State {
  switch (action.type) {
    case ActionTypes.LoadMessagesBegin: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case ActionTypes.LoadMessagesSuccess: {
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    }

    case ActionTypes.LoadMessagesFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }

    case ActionTypes.StartSendingMessage: {
      // const messages = { message: action.payload.message, name: action.payload.author};
      return {
        ...state,
        loading: true,
        error: null,
        message: action.payload,
      };
    }

    case ActionTypes.MessageSendSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionTypes.MessageSendFailure: {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    }

    default: {
      return state;
    }
  }
}

export const getMessages = (state: State) => state.data;
