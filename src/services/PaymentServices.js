import { postApi } from './agent';

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


};

export default PaymentServices;
