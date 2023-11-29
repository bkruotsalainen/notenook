import axios from 'axios';
const URL = 'http://localhost:3000/timezones';

const getAll = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { getAll };