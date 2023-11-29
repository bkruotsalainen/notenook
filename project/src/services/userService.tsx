import axios from 'axios';
const URL = 'http://localhost:3000/users/';

const getAll = () => {
  const request = axios.get(URL);
  return request;
};

const get = (id: string) => {
  const request = axios.get(URL + id);
  return request;
};

const update = (id: string, newObject: User) => {
  const request = axios.put((URL + id), newObject);
  return request;
};

const create = (newObject: User) => {
  const request = axios.post(URL, newObject);
  return request;
};


export default { getAll, get, update, create }; 