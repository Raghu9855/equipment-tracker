import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

export const getEquipment = () => api.get('/equipment');
export const addEquipment = (data) => api.post('/equipment', data);
export const updateEquipment = (id, data) => api.put(`/equipment/${id}`, data);
export const deleteEquipment = (id) => api.delete(`/equipment/${id}`);

export default api;
