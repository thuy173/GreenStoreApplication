import { SET_MESSAGE, CLEAR_MESSAGE } from "./actionTypes";

export const setMessage = (message, severity = 'success') => ({
  type: SET_MESSAGE,
  payload: { message, severity },
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});