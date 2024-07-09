import { jwtDecode } from "jwt-decode";

import { LOGOUT } from "src/redux/actions/actionTypes";

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    return exp < Date.now() / 1000;
  } catch (e) {
    return true;
  }
};

const tokenExpirationMiddleware = (store) => (next) => (action) => {
  const { accessToken } = store.getState().auth;
  
  if (accessToken && isTokenExpired(accessToken)) {
    store.dispatch({ type: LOGOUT });
  }
  
  return next(action);
};

export default tokenExpirationMiddleware;
