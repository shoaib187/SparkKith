// utils/api/spark.js
import axios from 'axios';
import { baseUrl } from '../api';

export const getSpark = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/spark/get`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Spark IDs:', error);
    throw error.response?.data || { message: 'Failed to fetch Spark IDs' };
  }
};
