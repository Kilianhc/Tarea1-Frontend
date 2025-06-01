import { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './apiServices';
import Cabecera from './Cabecera';
import TaskCard from './TaskCard';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const todosData = await fetchTodos();
      setTodos(todosData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      await addTodo(newTodo);
      setNewTodo('');
      loadTodos();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      await updateTodo(id, !completed);
      loadTodos();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleUpdateTodoDescription = async (id, description) => {
    try {
      const todoToUpdate = todos.find(todo => todo._id === id);
      await updateTodo(id, todoToUpdate.completed, description);
      loadTodos();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-blue-500 py-6 flex flex-col justify-center sm:py-12"> {/* Cambia el color de fondo aquí */}
      <div className="max-w-6xl mx-auto p-4 w-3/5"> {/* Establece el ancho al 60% */}
        <Cabecera newTodo={newTodo} setNewTodo={setNewTodo} addTodo={handleAddTodo} />
        <div className="pt-6">
          <ul className="space-y-4">
            {todos.map((todo) => (
              <TaskCard key={todo._id} todo={todo} toggleTodo={handleToggleTodo} deleteTodo={handleDeleteTodo} updateTodoDescription={handleUpdateTodoDescription} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;