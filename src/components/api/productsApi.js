// src/api/productsApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/manage/books';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authToken');
  config.headers.Authorization = token;
  return config;
});

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data)
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};