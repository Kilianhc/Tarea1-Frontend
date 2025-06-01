import React from 'react';

const Cabecera = ({ newTodo, setNewTodo, addTodo }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-full"> {/* Asegúrate de que ocupe el ancho completo */}
            <h1 className="text-3xl font-bold text-center mb-4">To-do App</h1>
            <form onSubmit={addTodo} className="flex flex-col sm:flex-row">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Añadir nueva tarea..."
                    className="flex-1 px-2 py-1 border rounded-lg mb-2 sm:mb-0 sm:mr-2" // Ajustar tamaño y margen
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                >
                    Añadir
                </button>
            </form>
        </div>
    );
};

export default Cabecera;