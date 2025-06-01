import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos'; // Asegúrate de que esta URL sea correcta

export const fetchTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching todos: ' + error.message);
    }
};

export const addTodo = async (title) => {
    try {
        const response = await axios.post(API_URL, { title, completed: false });
        return response.data;
    } catch (error) {
        throw new Error('Error adding todo: ' + error.message);
    }
};

export const updateTodo = async (id, completed, description) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { completed, description });
        return response.data;
    } catch (error) {
        throw new Error('Error updating todo: ' + error.message);
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting todo: ' + error.message);
    }
};