import api from './api.js';

export const register = (data) => api.post('/api/auth/register', data);
export const login = (data) => api.post('/api/auth/login', data);
export const logout = () => api.post('/api/auth/logout');
export const getProfile = () => api.get('/api/auth/profile');
export const updateProfile = (data) => api.put('/api/auth/profile', data);
