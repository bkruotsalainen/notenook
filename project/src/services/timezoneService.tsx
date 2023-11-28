import axios from 'axios';
const URL = 'http://localhost:3000/timezones';

const getAll = () => {
  const request = axios.get(URL);
  return request;
};

export { getAll };