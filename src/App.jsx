import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash, FaCheck } from 'react-icons/fa'

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos')
      setTodos(response.data)
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      await axios.post('/api/todos', { text: newTodo, completed: false })
      setNewTodo('')
      fetchTodos()
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      await axios.put(`/api/todos/${id}`, { completed: !completed })
      fetchTodos()
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`)
      fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold text-center mb-8">Todo App</h1>
                <form onSubmit={addTodo} className="flex gap-2">
                  <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Añadir nueva tarea..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    Añadir
                  </button>
                </form>
              </div>
              <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                <ul className="space-y-4">
                  {todos.map((todo) => (
                    <li key={todo._id} className="flex items-center gap-4">
                      <button
                        onClick={() => toggleTodo(todo._id, todo.completed)}
                        className={`flex-1 text-left p-3 rounded-lg ${
                          todo.completed ? 'bg-green-100 line-through' : 'bg-gray-100'
                        }`}
                      >
                        {todo.text}
                      </button>
                      <button
                        onClick={() => toggleTodo(todo._id, todo.completed)}
                        className="p-2 text-green-500 hover:text-green-600"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="p-2 text-red-500 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 