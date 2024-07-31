import { getApi, postApi } from './agent';

const ComboServices = {
  getByBMIStatus: async (status) => {
    try {
      const result = await getApi(`combo/byBmi?bmiStatus=${status}`, '');
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },

  calculateBMI: async (payload) => {
    try {
      const result = await postApi(`bmi/calculate`, payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default ComboServices;
