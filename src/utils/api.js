import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const createComponent = (componentData) => api.post('/components/', componentData);
export const createVehicle = (vehicleData) => api.post('/vehicles/', vehicleData);
export const createIssue = (issueData) => api.post('/issues/', issueData);
export const getRevenueData = () => api.get('/revenue/');
export const getComponents = () => api.get('/components/');
export const getVehicles = () => api.get('/vehicles/');
export const fetchIssues = async () => {
    try {
      const response = await api.get('/issues/');
      return response.data;
    } catch (error) {
      console.error('Error fetching issues:', error);
      throw error;
    }
  };
  
  export const createTransaction = async (transactionData) => {
    try {
      const response = await api.post('/transactions/', transactionData);
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  };
