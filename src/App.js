import React, { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import LiveDateTime from './LiveDateTime';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
    // Check user's preferred color scheme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const addTodo = () => {
    if (todo.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: todo,
        completed: false,
        createdAt: new Date().toISOString()
      };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      localStorage.setItem('todos', JSON.stringify(newTodos));
      setTodo("");
    }
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const toggleComplete = (id) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, text: editText } : todo
    );
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setEditingId(null);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  const clearCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <motion.div 
          className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="text-center mb-6">
            <div className="flex justify-between items-center mb-2">
              <motion.h1 
                className={`text-3xl font-bold ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Task Manager
              </motion.h1>
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
            <LiveDateTime darkMode={theme === 'dark'} />
            <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Organize your day efficiently
            </p>
          </header>

          <TodoInput 
            todo={todo} 
            setTodo={setTodo} 
            addTodo={addTodo}
            darkMode={theme === 'dark'}
          />

          <div className="flex justify-center gap-2 mb-4">
            <button 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 
                (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : 
                (theme === 'dark' ? 'text-gray-300 border-gray-500' : 'text-gray-700 border-gray-300')} border`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'active' ? 
                (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : 
                (theme === 'dark' ? 'text-gray-300 border-gray-500' : 'text-gray-700 border-gray-300')} border`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${filter === 'completed' ? 
                (theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') : 
                (theme === 'dark' ? 'text-gray-300 border-gray-500' : 'text-gray-700 border-gray-300')} border`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>

          <AnimatePresence>
            <TodoList 
              todos={filteredTodos} 
              deleteTodo={deleteTodo} 
              toggleComplete={toggleComplete}
              editingId={editingId}
              startEditing={startEditing}
              editText={editText}
              setEditText={setEditText}
              saveEdit={saveEdit}
              darkMode={theme === 'dark'}
            />
          </AnimatePresence>

          {todos.some(todo => todo.completed) && (
            <button 
              className={`block mx-auto mt-4 px-4 py-2 rounded-full text-sm ${theme === 'dark' ? 
                'text-red-400 border-red-400 hover:bg-red-900' : 
                'text-red-500 border-red-500 hover:bg-red-100'} border`}
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
          )}

          <div className={`flex justify-between mt-4 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
            <span>{todos.filter(t => !t.completed).length} tasks remaining</span>
            <span>{todos.length} total tasks</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;