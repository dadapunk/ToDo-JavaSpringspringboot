import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function TodoList() {
    const [todos, setTodos] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [usernameFilter, setUsernameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);

    function handleTitleFilterChange(event) {
        setTitleFilter(event.target.value);
    }

    function handleUsernameFilterChange(event) {
        setUsernameFilter(event.target.value);
    }

    async function fetchTodos() {
        const response = await fetch(`http://localhost:8080/todos/all?pageNumber=${currentPage}&pageSize=${pageSize}&title=${titleFilter}&username=${usernameFilter}`);
        const responseData = await response.json();
        setTodos(responseData.content);
        setTotalPages(responseData.totalPages);
        setCurrentPage(responseData.number);
        setIsLoading(false);
    }


    useEffect(() => {
        fetchTodos();
    }, []);

    function handleSearch() {
        fetchTodos();
    }

    function handlePageClick(pageNumber) {
        setCurrentPage(pageNumber);
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
                {todos.map((todo) => (
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
            <div className="pagination">
                <button disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)}>Anterior</button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} className={currentPage === i + 1 ? 'active' : ''} onClick={() => handlePageClick(i + 1)}>{i + 1}</button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => handlePageClick(currentPage + 1)}>Siguiente</button>
            </div>
        </div>
    );
}

export default TodoList;
