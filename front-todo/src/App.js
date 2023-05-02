import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import CreateTodoForm from './components/CreateTodoForm';

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Llamar al API para obtener los TODOs
    }, []);

    return (
        <div className="container">
            {/*<h1>Listado de TODOs</h1>
            <TodoList todos={todos} />*/}
            <h1>Create TODO</h1>
            <CreateTodoForm />

        </div>
    );
}

export default App;
