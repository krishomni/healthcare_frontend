import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Practice API
export const practiceAPI = {
  get: () => api.get('/practice'),
  update: (data) => api.put('/practice', data),
};

// Services API
export const servicesAPI = {
  getAll: (params = {}) => api.get('/services', { params }),
  getById: (id) => api.get(`/services/${id}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// Team API
export const teamAPI = {
  getAll: (params = {}) => api.get('/team', { params }),
  getById: (id) => api.get(`/team/${id}`),
  create: (data) => api.post('/team', data),
  update: (id, data) => api.put(`/team/${id}`, data),
  delete: (id) => api.delete(`/team/${id}`),
};

// Blog API
export const blogAPI = {
  getAll: (params = {}) => api.get('/blog', { params }),
  getCategories: () => api.get('/blog/categories'),
  getById: (id) => api.get(`/blog/${id}`),
  getBySlug: (slug) => api.get(`/blog/slug/${slug}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
  like: (id) => api.post(`/blog/${id}/like`),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params = {}) => api.get('/contact', { params }),
  update: (id, data) => api.put(`/contact/${id}`, data),
  getStats: () => api.get('/contact/stats'),
};

// Upload API
export const uploadAPI = {
  single: (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    return api.post('/upload/single', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  multiple: (files, type = 'general') => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    formData.append('type', type);
    return api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  delete: (type, filename) => api.delete(`/upload/${type}/${filename}`),
};

export default api;
