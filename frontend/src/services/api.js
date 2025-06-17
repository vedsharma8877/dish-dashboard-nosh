import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to:`, config.url);
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
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const dishService = {
    // Get all dishes
    getDishes: async () => {
        try {
            const response = await api.get('/dishes');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch dishes');
        }
    },

    // Toggle dish publication status
    togglePublishStatus: async (dishId) => {
        try {
            const response = await api.patch(`/dishes/${dishId}/toggle-publish`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to toggle publish status');
        }
    },

    // Get a single dish by ID
    getDishById: async (dishId) => {
        try {
            const response = await api.get(`/dishes/${dishId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch dish');
        }
    },
};

export default api;
