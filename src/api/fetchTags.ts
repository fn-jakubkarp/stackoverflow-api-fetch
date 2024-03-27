import axios from 'axios';
import { BASE_URL } from '../const/stackexchangeApi';

export const fetchTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tags?&site=stackoverflow`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};