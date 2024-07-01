import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/actionTypes';

const initialState = { message: '', open: false, severity: 'success' };

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message,
        open: true,
        severity: action.payload.severity,
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
