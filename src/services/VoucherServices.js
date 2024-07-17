import { getApi } from './agent';

const VoucherServices = {
  getData: async () => {
    try {
      const result = await getApi(`voucher`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getDataById: async (id) => {
    try {
      const result = await getApi(`voucher/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default VoucherServices;
