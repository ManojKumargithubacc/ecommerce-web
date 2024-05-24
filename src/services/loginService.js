import axios_instances from "./axiosInstance";

export const loginUser = async (email, password) => {
  try {
    const res = await axios_instances.post('/login', { email, password });
    return res.data;
  } catch (error) {
    throw error;
  }
};
