import { getApi } from './agent';

const CategoryServices = {
  getData: async () => {
    try {
      const result = await getApi(`category`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getDataById: async (id) => {
    try {
      const result = await getApi(`category/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default CategoryServices;
