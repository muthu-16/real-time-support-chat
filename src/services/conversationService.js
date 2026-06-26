import api from './api.js';

export const createConversation = (data) => api.post('/api/conversations', data);
export const getConversations = () => api.get('/api/conversations');
export const deleteConversation = (id) => api.delete(`/api/conversations/${id}`);
