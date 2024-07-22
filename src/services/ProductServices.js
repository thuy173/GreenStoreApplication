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
  searchByPrice: async (minPrice, maxPrice) => {
    try {
      const result = await getApi(`product/searchByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  searchByName: async (name) => {
    try {
      const result = await getApi(`product/searchByName?name=${name}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default ProductServices;
