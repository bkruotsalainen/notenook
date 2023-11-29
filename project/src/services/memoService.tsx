import axios from 'axios';
const URL = 'http://localhost:3000/memos';

const getAll = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const create = async (newObject: Memo) => {
  try {
    const response = await axios.post(URL, newObject);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const update = async (id: string, newObject: Memo) => {
  try {
    const response = await axios.put(`${URL}/${id}`, newObject);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const remove = async (id: string) => {
  try {
    await axios.delete(`${URL}/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export default { getAll, create, update, remove };