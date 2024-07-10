import { getApi, putApi, putApi2 } from './agent';

const ProfileServices = {
  getData: async () => {
    try {
      const result = await getApi(`customer`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  getDataById: async (id) => {
    try {
      const result = await getApi(`customer/${id}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  updateData: async (id, payload) => {
    try {
      const result = await putApi2(`customer/${id}`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  updateAvatar: async (id, payload) => {
    try {
      const result = await putApi(`customer/${id}/avatar`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default ProfileServices;
