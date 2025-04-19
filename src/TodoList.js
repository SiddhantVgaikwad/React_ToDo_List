import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TodoList = ({ 
    todos, 
    deleteTodo, 
    toggleComplete,
    editingId,
    startEditing,
    editText,
    setEditText,
    saveEdit,
    darkMode
}) => {
    return (
        <div className="space-y-2">
            <AnimatePresence>
                {todos.length > 0 ? (
                    todos.map((todo) => (
                        <motion.div
                            key={todo.id}
                            className={`rounded-lg p-3 ${darkMode ? 
                                'bg-gray-700 border-gray-600' : 
                                'bg-white border-gray-200'} border`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {editingId === todo.id ? (
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        className={`flex-1 px-3 py-1 rounded border focus:outline-none focus:ring-1 ${
                                            darkMode ? 
                                            'bg-gray-600 border-gray-500 text-white focus:ring-blue-500' : 
                                            'bg-white border-gray-300 text-gray-800 focus:ring-blue-400'
                                        }`}
                                        autoFocus
                                    />
                                    <button 
                                        className={`px-3 py-1 rounded font-medium ${
                                            darkMode ? 
                                            'bg-green-600 hover:bg-green-700 text-white' : 
                                            'bg-green-500 hover:bg-green-600 text-white'
                                        }`}
                                        onClick={() => saveEdit(todo.id)}
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <div className="flex items-center gap-2 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => toggleComplete(todo.id)}
                                            className={`h-5 w-5 rounded ${
                                                darkMode ? 
                                                'accent-blue-500' : 
                                                'accent-blue-600'
                                            }`}
                                        />
                                        <span className={`flex-1 ${todo.completed ? 'line-through opacity-70' : ''} ${
                                            darkMode ? 'text-gray-100' : 'text-gray-800'
                                        }`}>
                                            {todo.text}
                                        </span>
                                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {new Date(todo.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <button 
                                            className={`px-2 py-1 rounded text-sm ${
                                                darkMode ? 
                                                'bg-amber-600 hover:bg-amber-700 text-white' : 
                                                'bg-amber-500 hover:bg-amber-600 text-white'
                                            }`}
                                            onClick={() => startEditing(todo.id, todo.text)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className={`px-2 py-1 rounded text-sm ${
                                                darkMode ? 
                                                'bg-red-600 hover:bg-red-700 text-white' : 
                                                'bg-red-500 hover:bg-red-600 text-white'
                                            }`}
                                            onClick={() => deleteTodo(todo.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))
                ) : (
                    <motion.div
                        className={`p-4 text-center rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <p>No tasks found. Add a new task above!</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TodoList;