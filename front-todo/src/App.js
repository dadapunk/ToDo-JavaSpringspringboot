import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import CreateTodoForm from './components/CreateTodoForm';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Llamar al API para obtener los TODOs
    }, []);

    return (
        <BrowserRouter basename="/">
            <div className="container">
                <h1>Listado de TODOs</h1>
                <Routes>
                    <Route path="/" element={<TodoList todos={todos} />} />
                    <Route path="/new-todo" element={<CreateTodoForm />} />
                    <Route path="/edit-todo/:id" element={<CreateTodoForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
