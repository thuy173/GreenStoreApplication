import { getApi } from './agent';

const ProductServices = {
  getData: async () => {
    try {
      const result = await getApi(`product`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getDataById: async (id) => {
    try {
      const result = await getApi(`product/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default ProductServices;
