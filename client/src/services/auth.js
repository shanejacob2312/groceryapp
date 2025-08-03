import api from './api';

const authService = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get current user from token
  getCurrentUser: async () => {
    try {
      const response = await api.get('/api/auth/profile');
      return response.data.user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Login user
  login: async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { user };
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/api/auth/register', userData);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return { user };
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/api/auth/profile', profileData);
    return { user: response.data.user };
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    await api.put('/api/auth/change-password', {
      currentPassword,
      newPassword
    });
  }
};

export default authService; 