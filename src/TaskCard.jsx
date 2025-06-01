import React, { useState } from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';

const TaskCard = ({ todo, toggleTodo, deleteTodo, updateTodoDescription }) => {
    const [description, setDescription] = useState(''); // Asegúrate de que esta línea esté presente
    const [isEditing, setIsEditing] = useState(false);

    const handleAddDescription = async () => {
        if (description.trim()) {
            await updateTodoDescription(todo._id, description); // Llama a la función pasada como prop
            setDescription('');
            setIsEditing(false);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full">
            <button
                onClick={() => toggleTodo(todo._id, todo.completed)}
                className={`flex-1 text-left p-3 rounded-lg ${todo.completed ? 'bg-red-300 line-through' : 'bg-gray-100'
                    }`}
            >
                <span className="font-bold text-lg">{todo.title}</span> {/* Título en negrita y más grande */}
            </button>
            <div className="flex justify-between mt-2">
                <button
                    onClick={() => toggleTodo(todo._id, todo.completed)}
                    className="p-2 text-green-500 hover:text-green-600 text-2xl" // Aumentar tamaño del ícono
                >
                    <FaCheck />
                </button>
                <button
                    onClick={() => deleteTodo(todo._id)}
                    className="p-2 text-red-500 hover:text-red-600 text-2xl" // Aumentar tamaño del ícono
                >
                    <FaTrash />
                </button>
            </div>
            <div className="mt-2">
                {isEditing ? (
                    <div className="flex flex-col sm:flex-row"> {/* Cambia a flex-row en pantallas grandes */}
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Añadir descripción..."
                            className="flex-1 px-2 py-1 border rounded-lg mb-2 sm:mb-0 sm:mr-2" // Ajustar tamaño y margen
                        />
                        <button
                            onClick={handleAddDescription}
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                        >
                            Añadir Descripción
                        </button>
                    </div>
                ) : (
                    <div>
                        <p className="text-gray-600">{todo.description}</p>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-2 text-blue-800 hover:text-blue-400"
                        >
                            Editar Descripción
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;