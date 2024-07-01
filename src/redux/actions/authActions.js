import { setLocalStorage } from 'src/services/agent';
import LoginServices from 'src/services/LoginServices';

import {
  LOGOUT,
  SET_MESSAGE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from './actionTypes';

export const loginSuccess = (accessToken, message) => ({
  type: LOGIN_SUCCESS,
  payload: { accessToken, message },
});

export const loginFailure = (error, message) => ({
  type: LOGIN_FAILURE,
  payload: { error, message },
});

export const registerSuccess = (message) => ({
  type: REGISTER_SUCCESS,
  payload: { message },
});

export const registerFailure = (error, message) => ({
  type: REGISTER_FAILURE,
  payload: { error, message },
});

export const logOut = (message) => ({
  type: LOGOUT,
  payload: { message },
});

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: { message },
});

export const login = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await LoginServices.Login(credentials);

    const accessToken = response.data;

    if (accessToken !== undefined) {
      setLocalStorage('accessToken', accessToken);

      dispatch(loginSuccess(accessToken, 'Login successful!'));
      dispatch(setMessage('Login successful!'));
      navigate('/');
    } else {
      dispatch(setMessage('Login failed! Please try again.'));
      navigate('/login');
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(loginFailure(error, message));
    dispatch(setMessage(message));
  }
};

export const googleLogin = (token, navigate) => async (dispatch) => {
  try {
    const response = await LoginServices.LoginForGoogle({ googleToken: token });

    const accessToken = response.data;

    if (accessToken !== undefined) {
      setLocalStorage('accessToken', accessToken);

      dispatch(loginSuccess(accessToken, 'Login successful!'));
      dispatch(setMessage('Login successful!'));
      navigate('/');
    } else {
      dispatch(setMessage('Login failed! Please try again.'));
      navigate('/login');
    }
  } catch (error) {
    console.error('Google login error:', error);
  }
};

export const register = (userData, navigate) => async (dispatch) => {
  try {
    const response = await LoginServices.Register(userData);

    if (response.status === 201) {
      dispatch(registerSuccess('Registration successful!'));
      dispatch(setMessage('Registration successful! Please login.'));
      navigate('/login');
    }
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    dispatch(registerFailure(error, message));
    dispatch(setMessage(message));
  }
};

export const logout = (navigate) => (dispatch) => {
  dispatch(logOut());
  dispatch(setMessage('Logged out successfully!'));
  navigate('/');
};
