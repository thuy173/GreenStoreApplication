import { jwtDecode } from 'jwt-decode';

import { getLocalStorage } from '../../services/agent';
import {
  LOGOUT,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions/actionTypes';

const accessToken = getLocalStorage('accessToken') !== null ? getLocalStorage('accessToken') : null;

const initialState = accessToken
  ? { isLoggedIn: true, accessToken }
  : { isLoggedIn: false, accessToken: null };

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp < Date.now() / 1000;
  } catch (e) {
    return true;
  }
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (state.accessToken && isTokenExpired(state.accessToken)) {
    return {
      ...state,
      isLoggedIn: false,
      accessToken: null,
    };
  }
  
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        accessToken: payload.accessToken,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
