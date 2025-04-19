import React from 'react';
import { motion } from 'framer-motion';

const TodoInput = ({ todo, setTodo, addTodo, darkMode }) => {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <motion.div 
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
        >
            <div className="flex gap-2">
                <input 
                    type="text"
                    placeholder="What needs to be done?"
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 ${
                        darkMode ? 
                        'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 placeholder-gray-400' : 
                        'bg-white border-gray-300 text-gray-800 focus:ring-blue-400 placeholder-gray-500'
                    }`}
                />
                <motion.button 
                    className={`px-4 py-2 rounded-lg font-medium ${
                        darkMode ? 
                        'bg-blue-600 hover:bg-blue-700 text-white' : 
                        'bg-blue-500 hover:bg-blue-600 text-white'
                    } ${!todo.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={addTodo}
                    whileHover={{ scale: todo.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: todo.trim() ? 0.95 : 1 }}
                    disabled={!todo.trim()}
                >
                    Add
                </motion.button>
            </div>
        </motion.div>
    );
};

export default TodoInput;