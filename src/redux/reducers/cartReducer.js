import {
  CLEAR_CART,
  UPDATE_CART,
  PAYMENT_ACTION,
  FETCH_CART_SUCCESS,
  BUY_WITHOUT_ACCOUNT_ACTION,
} from '../actions/actionTypes';

const initialState = {
  cartItems: [],
  cartData: null,
};

const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PAYMENT_ACTION:
      return state;

    case BUY_WITHOUT_ACCOUNT_ACTION:
      return state;

    case CLEAR_CART:
      console.log('CLEAR_CART action dispatched, updating state');

      return {
        ...state,
        cartItems: [],
      };

    case UPDATE_CART:
      return {
        ...state,
        cartItems: payload.cartItemData,
      };

    case FETCH_CART_SUCCESS:
      return {
        ...state,
        cartItems: payload.cartData.cartItem,
        cartData: payload.cartData,
      };

    default:
      return state;
  }
};

export default cartReducer;
