import { jwtDecode } from 'jwt-decode';

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
  console.log('Middleware action:', action);// Debug
  console.log('Current state:', store.getState());// Debug

  if (accessToken) {
    console.log('Token:', accessToken); // Debug
    const expired = isTokenExpired(accessToken);
    console.log('Is token expired?', expired); // Debug
    if (expired) {
      console.log('Token expired, dispatching LOGOUT'); // Debug
      if (action.type !== 'LOGOUT') {
        store.dispatch({ type: 'LOGOUT' });
      }
    }
  }

  return next(action);
};

export default tokenExpirationMiddleware;
