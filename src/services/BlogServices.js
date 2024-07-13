import { getApi, putApi, postApi2 } from './agent';

const BlogServices = {
  getData: async () => {
    try {
      const result = await getApi(`blog/app`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getDataById: async (id) => {
    try {
      const result = await getApi(`blog/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getDataByCustomerId: async (id) => {
    try {
      const result = await getApi(`blog/getAllByUser/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  addData: async (payload) => {
    try {
      const result = await postApi2(`blog`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  updateData: async (id, payload) => {
    try {
      const result = await putApi(`blog/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default BlogServices;
