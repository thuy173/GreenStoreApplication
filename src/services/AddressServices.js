import { getApi, postApi, deleteApi } from './agent';

const AddressServices = {
  getData: async () => {
    try {
      const result = await getApi(`address`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getDataById: async (id) => {
    try {
      const result = await getApi(`address/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  addData: async (payload) => {
    try {
      const result = await postApi(`address`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  deleteData: async (id) => {
    try {
      const result = await deleteApi(`address/${id}`);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default AddressServices;
