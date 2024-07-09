import { CLEAR_CART, UPDATE_CART, PAYMENT_ACTION, FETCH_CART_SUCCESS, BUY_WITHOUT_ACCOUNT_ACTION } from './actionTypes';

export const paymentAction = (userId, items) => ({
  type: PAYMENT_ACTION,
  payload: { userId, items },
});

export const buyWithoutAccountAction = (items) => ({
  type: BUY_WITHOUT_ACCOUNT_ACTION,
  payload: { items },
});

export const clearCart = () => ({
  type: CLEAR_CART,
});

export const updateCart = (cartItemData) => ({
  type: UPDATE_CART,
  payload: { cartItemData },
});

export const fetchCartSuccess = (cartData) => ({
  type: FETCH_CART_SUCCESS,
  payload: { cartData },
});