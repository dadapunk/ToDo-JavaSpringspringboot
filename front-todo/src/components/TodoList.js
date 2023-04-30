import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchTodos() {
            const response = await fetch('http://localhost:8080/todos/all');
            const data = await response.json();
            setTodos(data);
        }

        fetchTodos();
    }, []);

    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Título</th>
                    <th>Username</th>
                    <th>País</th>
                    <th>Completado</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => (
                    <tr key={todo.id}>
                        <td>{todo.title}</td>
                        <td>{todo.username}</td>
                        <td>{todo.country}</td>
                        <td>{todo.completed ? 'Sí' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <label htmlFor="title-filter">Filtrar por título:</label>
                <input type="text" id="title-filter" />
            </div>
            <div>
                <label htmlFor="username-filter">Filtrar por username:</label>
                <input type="text" id="username-filter" />
            </div>
            <button>Buscar</button>
            <div>
                {/* Aquí iría el componente de paginación */}
            </div>
        </div>
    );
}

export default TodoList;
