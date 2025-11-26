import axios from "axios";

const BASE = "https://fakestoreapi.com";

export const fetchAllProducts = async () => {
  const res = await axios.get(`${BASE}/products`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await axios.get(`${BASE}/products/${id}`);
  return res.data;
};

// The API supports POST/PUT but they are mock — we will not rely on server persisting.
// Still kept for demonstration; but the app will manage client-side state.
export const createProductOnServer = async (payload) => {
  const res = await axios.post(`${BASE}/products`, payload);
  return res.data;
};

export const updateProductOnServer = async (id, payload) => {
  const res = await axios.put(`${BASE}/products/${id}`, payload);
  return res.data;
};

export const deleteProductOnServer = async (id) => {
  const res = await axios.delete(`${BASE}/products/${id}`);
  return res.data;
};
