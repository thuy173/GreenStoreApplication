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
  searchProduct: async (name, minPrice, maxPrice, category, page, size, sort) => {
    try {
      let apiUrl = `product/search?name=${name}`;

      if (maxPrice) {
        apiUrl += `&maxPrice=${maxPrice}`;
      }
      if (minPrice) {
        apiUrl += `&minPrice=${minPrice}`;
      }
      if (category) {
        apiUrl += `&category=${category}`;
      }
      if (page) {
        apiUrl += `&page=${page}`;
      }
      if (size) {
        apiUrl += `&size=${size}`;
      }
      if (sort) {
        apiUrl += `&sort=${sort}`;
      }

      const result = await getApi(apiUrl, '');

      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default ProductServices;
