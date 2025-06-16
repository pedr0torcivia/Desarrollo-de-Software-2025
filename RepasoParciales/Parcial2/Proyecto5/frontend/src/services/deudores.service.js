import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const deudoresService = {
  getAll: async () => {
    const res = await axios.get(`${API_URL}/deudores`);
    return res.data;
  },

  create: async (deudor) => {
    const res = await axios.post(`${API_URL}/deudores`, deudor);
    return res.data;
  }
};
