import axios_instances from "./axiosInstance";

export const fetchAddresses = async (email) => {
  try {
    const response = await axios_instances.get(`/addresses?email=${email}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    throw error;
  }
};

export const addAddress = async (email, formData) => {
  try {
    await axios_instances.post(`/addresses?email=${email}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error adding address:', error);
    throw error;
  }
};

export const deleteAddress = async (email, addressId) => {
  try {
    await axios_instances.delete(`/addresses/${addressId}?email=${email}`);
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error;
  }
};

export const updateAddress = async (email, addressId, formData) => {
  try {
    await axios_instances.put(`/addresses/${addressId}?email=${email}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating address:', error);
    throw error;
  }
};
