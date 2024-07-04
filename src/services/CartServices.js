import { getApi, putApi2, postApi, deleteApi } from './agent';

const CartServices = {
  getCart: async (id) => {
    try {
      const result = await getApi(`cart/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  addToCart: async (id, payload) => {
    try {
      const result = await postApi(`cart/${id}/items`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  updateQuantity: async (customerIdOrUuid, cartItemId, quantity, payload) => {
    try {
      const result = await putApi2(
        `cart/${customerIdOrUuid}/items/${cartItemId}?quantity=${quantity}`,
        payload
      );
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  deleteItem: async (customerIdOrUuid, cartItemId, payload) => {
    try {
      const result = await deleteApi(`cart/${customerIdOrUuid}/items/${cartItemId}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default CartServices;
