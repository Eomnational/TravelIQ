import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// 获取旅游数据的函数
export const viewgeoData = async () => {
  try {
    const response = await axios.get(`${API_URL}/geoData/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tourism data:', error);
    throw error;
  }
};
