import api from './api.js';

export const deleteUser = (id) => api.delete(`/api/users/${id}`);
export const getUserById = (id) => api.get(`/api/users/${id}`);
