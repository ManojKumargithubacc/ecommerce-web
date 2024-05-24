import axios_instances from "./axiosInstance";

export const fetchUserDetails = async (email) => {
  try {
    const response = await axios_instances.get(`/user-details?email=${email}`);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw error;
  }
};

export const fetchOrderData = async (userId) => {
  try {
    const response = await axios_instances.get(`/orders?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw error;
  }
};

export const updateProfile = async (updatedUserDetails, email) => {
  try {
    const response = await axios_instances.put(`/update-profile`, {
      ...updatedUserDetails,
      email,
    });
    return response.data.updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
};

export const updatePassword = async (email, currentPassword, newPassword) => {
  try {
    await axios_instances.put(`/update-password`, {
      email,
      currentPassword,
      newPassword,
    });
  } catch (error) {
    console.error("Error updating password:", error.message);
    throw error;
  }
};
