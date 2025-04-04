import axios from 'axios';

const API_URL = 'http://localhost:3001/api/manage/orders'; 

// Thêm token từ localStorage vào mỗi request
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

// Lấy tất cả đơn hàng (admin xem toàn bộ)
export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const saveOrder = async (items, userId, payment) => {
  const response = await axios.post(API_URL, { 
    items: items, 
    userId: userId, 
    payment: payment
  });
  return response.data;
};

// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (orderId, newStatus) => {
  const response = await axios.put(`${API_URL}/${orderId}`, {
    status: newStatus,
  });
  return response.data;
};