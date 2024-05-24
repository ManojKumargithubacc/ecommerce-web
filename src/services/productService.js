import axios_instances from "./axiosInstance";

export const fetchAllProducts = async () => {
  try {
    const response = await axios_instances.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchFilteredProducts = async (category, subcategory) => {
  try {
    const params = {};
    if (category) {
      params.category = category;
    }
    if (subcategory) {
      params.subcategory = subcategory;
    }
    const response = await axios_instances.get("/productsfilter", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    throw error;
  }
};
