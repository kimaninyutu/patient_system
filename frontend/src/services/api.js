import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerPatient = (userData) => api.post('patients/', userData);
export const loginPatient = (credentials) => api.post('token/', credentials);
export const getPatientData = (id) => api.get(`patients/${id}/`);
export const updatePatientData = (id, data) => api.patch(`patients/${id}/`, data);

export default api;

