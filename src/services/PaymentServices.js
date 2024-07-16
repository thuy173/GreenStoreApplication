import { putApi2, postApi } from './agent';

const PaymentServices = {

  addData: async (payload) => {
    try {
      const result = await postApi(`payments`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  changeStatus: async (orderId) => {
    try {
      const result = await putApi2(`order/${orderId}/changeProcessing?status=PROCESSING`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },


};

export default PaymentServices;
