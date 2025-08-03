import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://groceryapp-production-5bac.up.railway.app',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  logout: () => api.post('/api/auth/logout'),
  getProfile: () => api.get('/api/auth/profile'),
  updateProfile: (profileData) => api.put('/api/auth/profile', profileData),
  changePassword: (passwordData) => api.put('/api/auth/change-password', passwordData),
};

export const productsAPI = {
  getAll: (params) => api.get('/api/products', { params }),
  getFeatured: () => api.get('/api/products/featured'),
  getCategories: () => api.get('/api/products/categories'),
  getById: (id) => api.get(`/api/products/${id}`),
  create: (productData) => api.post('/api/products', productData),
  update: (id, productData) => api.put(`/api/products/${id}`, productData),
  delete: (id) => api.delete(`/api/products/${id}`),
  getAllAdmin: (params) => api.get('/api/products/admin/all', { params }),
};

export const ordersAPI = {
  create: (orderData) => api.post('/api/orders', orderData),
  getMyOrders: (params) => api.get('/api/orders/my-orders', { params }),
  getById: (id) => api.get(`/api/orders/${id}`),
  getAllAdmin: (params) => api.get('/api/orders/admin/all', { params }),
  updateStatus: (id, statusData) => api.put(`/api/orders/${id}/status`, statusData),
  cancel: (id, reason) => api.put(`/api/orders/${id}/cancel`, { reason }),
  getStats: () => api.get('/api/orders/admin/stats'),
};

export const usersAPI = {
  getAllAdmin: (params) => api.get('/api/users/admin/all', { params }),
  getByIdAdmin: (id) => api.get(`/api/users/admin/${id}`),
  updateAdmin: (id, userData) => api.put(`/api/users/admin/${id}`, userData),
  deleteAdmin: (id) => api.delete(`/api/users/admin/${id}`),
  getStats: () => api.get('/api/users/admin/stats'),
};

export default api; 