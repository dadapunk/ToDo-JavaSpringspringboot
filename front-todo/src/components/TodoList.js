import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [titleFilter, setTitleFilter] = useState('');
    const [usernameFilter, setUsernameFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortColumn, setSortColumn] = useState('title');

    function handleTitleFilterChange(event) {
        setTitleFilter(event.target.value);
    }

    function handleUsernameFilterChange(event) {
        setUsernameFilter(event.target.value);
    }


    async function fetchTodos() {

        const response = await fetch(`http://localhost:8080/todos/all?pageNumber=${currentPage}&pageSize=${pageSize}`);
        console.log("la currentPage URL es: "+currentPage)
        const responseData = await response.json();
        setTodos(responseData.content);
        setTotalPages(responseData.totalPages);
        setCurrentPage(responseData.number);
        setIsLoading(false);
    }
    async function fetchFilterTodos() {
        const response = await fetch(`http://localhost:8080/todos/filters?pageNumber=${currentPage}&pageSize=${pageSize}&title=${titleFilter}&username=${usernameFilter}`);
        const responseData = await response.json();
        setTodos(responseData.content);
        setTotalPages(responseData.totalPages);
        setCurrentPage(responseData.number);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchTodos();
        console.log(sortColumn);

    }, [sortColumn]);
    function handleSearch() {
        fetchFilterTodos();
    }

    function handlePageClick(pageNumber) {
        console.log("HandlePageclick ")
        console.log("Page number is : "+pageNumber)
        console.log("CurrentPage is : "+currentPage)
        setCurrentPage(pageNumber);
        fetchTodos(pageNumber); // Pasamos el valor de `pageNumber` como argumento
    }



    function handleSort(columnName) {
        if (columnName === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortDirection('asc');
            setSortColumn(columnName);
            console.log(sortColumn);
        }
    }

    function sortTodos() {
        const sortedTodos = todos.sort((a, b) => {
            let valueA = a[sortColumn];
            let valueB = b[sortColumn];

            if (sortColumn === 'completed') {
                valueA = valueA ? 1 : 0;
                valueB = valueB ? 1 : 0;
            }

            if (valueA < valueB) {
                return sortDirection === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return sortDirection === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sortedTodos;
    }


    const sortedTodos = sortTodos();
    const handleDelete = (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este TODO? Esta operación no se puede deshacer.')) {
            fetch(`http://localhost:8080/todos/delete/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                            .then(window.location.reload())
                .catch(error => console.error(error));
        }
    };


    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th onClick={() => handleSort('title')}>
                        Título{' '}
                        {sortColumn === 'title' &&
                            sortDirection === 'asc' && <span>&#8593;</span>}
                        {sortColumn === 'title' &&
                            sortDirection === 'desc' && <span>&#8595;</span>}
                    </th>
                    <th onClick={() => handleSort('user.username')}>
                        Username{' '}
                        {sortColumn === 'user.username' &&
                            sortDirection === 'asc' && <span>&#8593;</span>}
                        {sortColumn === 'user.name' &&
                            sortDirection === 'desc' && <span>&#8595;</span>}
                    </th>
                    <th onClick={() => handleSort('user.address.country')}>
                        País{' '}
                        {sortColumn === 'user.address.country' &&
                            sortDirection === 'asc' && <span>&#8593;</span>}
                        {sortColumn === 'user.address.country' &&
                            sortDirection === 'desc' && <span>&#8595;</span>}
                    </th>
                    <th onClick={() => handleSort('completed')}>
                        Completado{' '}
                        {sortColumn === 'completed' &&
                            sortDirection === 'asc' && <span>&#8593;</span>}
                        {sortColumn === 'completed' &&
                            sortDirection === 'desc' && <span>&#8595;</span>}
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedTodos.map((todo) => (
                    <tr key={todo.id}>
                        <td>{todo.title}</td>
                        <td>{todo.user.username}</td>
                        <td>{todo.user.address.country}</td>
                        <td>{todo.completed ? 'Sí' : 'No'}</td>
                        <td>
                            <button onClick={() => window.location.href=`/edit-todo/${todo.id}`}>Editar</button>
                        </td>
                        <td><button onClick={() => handleDelete(todo.id)}>Eliminar</button>
                        </td>

                    </tr>
                ))}
                </tbody>
            </table>
            <div>
                <label htmlFor="title-filter">Filtrar por título:</label>
                <input
                    type="text"
                    id="title-filter"
                    value={titleFilter}
                    onChange={handleTitleFilterChange}
                />
            </div>
            <div>
                <label htmlFor="username-filter">Filtrar por username:</label>
                <input
                    type="text"
                    id="username-filter"
                    value={usernameFilter}
                    onChange={handleUsernameFilterChange}
                />
            </div>
            <button onClick={handleSearch}>Buscar</button>
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageClick(currentPage - 1)}
                >
                    Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        className={currentPage === i + 1 ? 'active' : ''}
                        onClick={() => handlePageClick(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageClick(currentPage + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
export default TodoList;