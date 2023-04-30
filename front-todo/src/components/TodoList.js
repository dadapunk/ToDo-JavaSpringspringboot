import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [titleFilter, setTitleFilter] = useState("");
    const [usernameFilter, setUsernameFilter] = useState("");
    const [loading, setLoading] = useState(false);

    function handleTitleFilterChange(event) {
        setTitleFilter(event.target.value);
    }

    function handleUsernameFilterChange(event) {
        setUsernameFilter(event.target.value);
    }

    function fetchTodos(titleFilter, usernameFilter) {
        setLoading(true);
        fetch(`http://localhost:8080/todos/all?title=${titleFilter}&username=${usernameFilter}`)
            .then(response => response.json())
            .then(data => {
                setTodos(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetchTodos(titleFilter, usernameFilter);
    }, [titleFilter, usernameFilter]);

    function handleSearch() {
        fetchTodos(titleFilter, usernameFilter);
    }

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
                        <td>{todo.user.name}</td>
                        <td>{todo.user.address.country}</td>
                        <td>{todo.completed ? 'Sí' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <label htmlFor="title-filter">Filtrar por título:</label>
                <input type="text" id="title-filter" value={titleFilter} onChange={handleTitleFilterChange} />
            </div>
            <div>
                <label htmlFor="username-filter">Filtrar por username:</label>
                <input type="text" id="username-filter" value={usernameFilter} onChange={handleUsernameFilterChange} />
            </div>
            <button onClick={handleSearch}>Buscar</button>
            {loading && <p>Cargando...</p>}
        </div>
    );
}

export default TodoList;
