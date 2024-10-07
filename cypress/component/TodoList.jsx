import React, { useState } from 'react';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            setError('Görev boş olamaz!');
            return;
        }

        setTodos([...todos, {
            id: Date.now(),
            text: inputValue.trim(),
            completed: false
        }]);
        setInputValue('');
        setError('');
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <h1 className="text-2xl font-bold mb-4" data-cy="title">Yapılacaklar Listesi</h1>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Yeni görev ekle..."
                        className="flex-1 p-2 border rounded"
                        data-cy="todo-input"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        data-cy="add-button"
                    >
                        Ekle
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 mt-2" data-cy="error-message">{error}</p>
                )}
            </form>

            <ul className="space-y-2">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className="flex items-center justify-between border p-2 rounded"
                        data-cy="todo-item"
                    >
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                data-cy="todo-checkbox"
                            />
                            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
                        </div>
                        <button
                            onClick={() => deleteTodo(todo.id)}
                            className="text-red-500 hover:text-red-700"
                            data-cy="delete-button"
                        >
                            Sil
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;