import axios from 'axios';
const URL = 'http://localhost:3000/users';

const getAll = () => {
  const request = axios.get(URL);
  return request;
};

const create = (newObject: User) => {
  const request = axios.post(URL, newObject);
  return request;
};


export default { getAll, create };