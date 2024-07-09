import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import authReducer from './authReducer';
import cartReducer from './cartReducer';
import messageReducer from './messageReducer';

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['auth', 'cart', 'message'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  cart: cartReducer,
});

export { rootReducer, rootPersistConfig };
