import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactPaginate from 'react-paginate';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { useHistory, useParams } from "react-router-dom";



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
    const { isAuthenticated } = useAuth0();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const history = useHistory();




    function handleTitleFilterChange(event) {
        setTitleFilter(event.target.value);
    }

    function handleUsernameFilterChange(event) {
        setUsernameFilter(event.target.value);
    }


    async function fetchTodos() {
        console.log("calling fetch todo");
        console.log("currentPage is : "+currentPage);
        const response = await fetch(`http://localhost:8080/todos/all?pageNumber=${currentPage}&size=${pageSize}&title=${titleFilter}&username=${usernameFilter}`);
        const responseData = await response.json();
        setTodos(responseData.content);
        setTotalPages(responseData.totalPages);
        setIsLoading(false);
    }

    async function fetchFilterTodos() {
        const response = await fetch(`http://localhost:8080/todos/filters?pageNumber=${currentPage}&size=${pageSize}&title=${titleFilter}&username=${usernameFilter}`);
        const responseData = await response.json();
        setTodos(responseData.content);
        setTotalPages(responseData.totalPages);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchTodos();
    }, [sortColumn, currentPage]);

    function handleSearch() {
        fetchFilterTodos();
    }

    function handlePageClick(data) {
        setCurrentPage(parseInt(data));
    }

    useEffect(() => {
        fetchTodos();
    }, [sortColumn, currentPage]);




    function handleSort(columnName) {
        if (columnName === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortDirection('asc');
            setSortColumn(columnName);
        }
    }

    function sortTodos() {
        if (!todos) {
            return [];
        }

        const sortedTodos = [...todos].sort((a, b) => {
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
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el TODO');
        }
        return response.json();
      })
      .then(() => {
        // Actualizar la lista de TODOs manualmente
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);

        // Navegar a la página de lista de TODOs
        history.push("/list-todo");
      })
      .catch(error => console.error(error));
  }
};

      
      
      
      if (shouldRedirect) {
        return <Redirect to="/list-todo" />;
      }  

    if (!isAuthenticated) {
        return <div>Please log in to access this page.</div>;
      }

    return (
        <div>
            <table className="table">
                <thead>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ marginRight: '1rem' }}>
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
                </div>

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
                        <Link to={`/edit-todo/${todo.id}`}><button>Editar</button></Link>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(todo.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ReactPaginate
                    previousLabel={'Anterior'}
                    nextLabel={'Siguiente'}
                    breakLabel={'...'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={(data) => handlePageClick(data.selected)}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-link'}
                />
            </div>
        </div>
    );
}

export default TodoList;