import { getApi } from './agent';

const ProductServices = {
  getData: async (page, size) => {
    try {
      const result = await getApi(`product?page=${page}&size=${size}`, '');
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
  searchByPrice: async (minPrice, maxPrice, page, size) => {
    try {
      const result = await getApi(`product/searchByPrice?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  searchByName: async (name, page, size) => {
    try {
      const result = await getApi(`product/searchByName?name=${name}&page=${page}&size=${size}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default ProductServices;
