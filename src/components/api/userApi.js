import axios from 'axios';

const API_URL = 'http://localhost:3001/api/manage/users';

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authToken');
  config.headers.Authorization =  token;
  return config;
});

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data)
  return response.data;
};

export const addUser = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateUser = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};