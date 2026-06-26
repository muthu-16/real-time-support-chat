import api from './api.js';

export const sendMessage = (data) => api.post('/api/messages', data);
export const getMessages = (conversationId) => api.get(`/api/messages/${conversationId}`);
export const deleteMessage = (id) => api.delete(`/api/messages/${id}`);
