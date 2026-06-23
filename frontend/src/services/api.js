import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

export const getSigns = async () => {
  try { return (await api.get('/signs')).data; }
  catch { return []; }
};

export const saveHistory = async (entry) => {
  try { return (await api.post('/signs/history', entry)).data; }
  catch { return null; }
};

export const getHistory = async () => {
  try { return (await api.get('/signs/history')).data; }
  catch { return []; }
};

export default api;
