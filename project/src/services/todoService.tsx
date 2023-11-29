import axios from 'axios';
const URL = 'http://localhost:3000/todos';

const getAll = () => {
  const request = axios.get(URL);
  return request;
};

const create = (newObject: Todo) => {
  const request = axios.post(URL, newObject);
  return request;
};

const update = (id: string, newObject: Todo) => {
  const request = axios.put((URL + '/' + id), newObject);
  return request;
};

const remove = (id: string) => {
  const request = axios.delete((URL + '/' + id));
  return request;
};

export default { getAll, create, update, remove };