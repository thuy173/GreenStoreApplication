import { getApi, postApi, putApi2, deleteApi } from './agent';

const OrderServices = {
  getData: async () => {
    try {
      const result = await getApi(`order/myOrders`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getDataById: async (id) => {
    try {
      const result = await getApi(`order/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  addData: async (payload) => {
    try {
      const result = await postApi(`order`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  updateData: async (id, payload) => {
    try {
      const result = await putApi2(`order/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  changeStatus: async (id, status) => {
    try {
      const result = await putApi2(`order/${id}/status?status=${status}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  
  deleteData: async (id) => {
    try {
      const result = await deleteApi(`order/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default OrderServices;
