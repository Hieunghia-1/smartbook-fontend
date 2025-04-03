import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');
    config.headers.Authorization = token;
    return config;
});

export const getMe = async () => {
    const response = await axios.get(`${API_URL}/me`);
    console.log(response.data)
    return response.data;
};

export const loginAPI = async (user) => {
    const response = await axios.post(`${API_URL}/login`, user);
    return response.data;
};

export const registerAPI = async (user) => {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
};