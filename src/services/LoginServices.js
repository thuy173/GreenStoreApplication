import { postApi } from './agent';

const LoginServices = {
  Login: async (payload) => {
    try {
      const result = await postApi('login', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  LoginForGoogle: async (payload) => {
    try {
      const result = await postApi('google-login', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
  Register: async (payload) => {
    try {
      const result = await postApi('register', payload);
      return result;
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

export default LoginServices;
