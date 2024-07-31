import { getApi, putApi2, postApi, deleteApi } from './agent';

const ComboServices = {
  getCart: async (id) => {
    try {
      const result = await getApi(`cart/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  calculateBMI: async (payload) => {
    try {
      const result = await postApi(`bmi/calculate`, payload);
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

export default ComboServices;
