import axios from 'axios';
const URL = 'http://localhost:3000/users';

const getAll = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const get = async (id: string) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const create = async (newObject: User) => {
  try {
    const response = await axios.post(URL, newObject);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const update = async (id: string, newObject: User) => {
  try {
    const response = await axios.put(`${URL}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default { getAll, get, update, create }; 