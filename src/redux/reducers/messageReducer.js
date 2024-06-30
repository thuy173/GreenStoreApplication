import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/actionTypes';

const initialState = { message: '', open: false, type: 'success' };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.content,
        open: true,
        type: action.payload.type,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default messageReducer;
