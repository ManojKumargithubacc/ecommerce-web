import axios_instances from "./axiosInstance";

export const registerUser = async (formData) => {
  try {
    const res = await axios_instances.post("/register", formData);
    return res.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
