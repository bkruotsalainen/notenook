import axios from 'axios';

const Api_BASE_URL = 'http://localhost:3000';

const Api = axios.create({
  baseURL: Api_BASE_URL,
});

export const getTodos = async () => {
  try {
    const response = await Api.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', 'error');
    throw error;
  }
};
export const getTodoById = async (id: string) => {
  try {
    const response = await Api.get(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', 'error');
    throw error;
  }
};

export const addTodo = async (todo: Todo) => {
  try {
    const response = await Api.post('/todos', todo);
    return response.data;
  } catch (error) {
    console.error('Error fetching memos:', 'error');
    throw error;
  }
};

export const deleteTodo = async () => {
  try {
    const response = await Api.delete('/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching memos:', 'error');
    throw error;
  }
};

export const updateTodo = async (id: string, todo: Todo) => {
  try {
    const response = await Api.put(`/todos/${id}`, todo);
    return response.data;
  } catch (error) {
    console.error('Error fetching memos:', 'error');
    throw error;
  }
};

export const getMemos = async () => {
  try {
    const response = await Api.get('/memos');
    return response.data;
  } catch (error) {
    console.error('Error fetching memos:', 'error');
    throw error;
  }
};

export default Api;