import {ActionTypes, MessageActions} from './message.actions';

export interface State {
  data: [];
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: null,
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

    default: {
      return state;
    }
  }
}

export const getMessages = (state: State) => state.data;
