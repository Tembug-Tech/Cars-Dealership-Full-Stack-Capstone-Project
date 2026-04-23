import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const dealerService = {
  getAllDealers: () => api.get('/dealers/'),
  getDealerById: (id) => api.get(`/dealers/${id}/`),
  getDealersByState: (state) => api.get(`/dealers/?state=${state}`),
};

export const reviewService = {
  getReviewsByDealer: (dealerId) => api.get(`/reviews/?dealer_id=${dealerId}`),
  submitReview: (reviewData) => api.post('/reviews/', reviewData),
};

export const authService = {
  register: (userData) => api.post('/register/', userData),
  login: (credentials) => api.post('/login/', credentials),
  logout: () => api.post('/logout/'),
};

export const sentimentService = {
  analyzeSentiment: (text) => api.post('/sentiment/', { text }),
};

export default api;
