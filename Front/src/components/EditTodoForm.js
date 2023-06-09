import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


function EditTodoForm() {
    const { id } = useParams();
    const history = useHistory();
    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);
    const { isAuthenticated } = useAuth0();


    useEffect(() => {
        fetch(`http://localhost:8080/todos/id/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setUser(data.user.id);
                setTitle(data.title);
                setCompleted(data.completed);
            })
            .catch((error) => console.log(error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:8080/todos/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                completed: completed,
                user: { id: user },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Aquí puedes imprimir la respuesta en la consola
                history.push("/list-todo");
            })
            .catch((error) => console.log(error));
    };

     if (!isAuthenticated) {
    return <div>Please log in to access this page.</div>;
  }
    return (

        <form onSubmit={handleSubmit}>
            <label>
                User:
                <select value={user} onChange={(e) => setUser(e.target.value)}>
                    <option value="">Select a user</option>
                    <option value="1">wendy_cat</option>
                    <option value="2">irene_love</option>
                </select>
            </label>
            <br />
            <label>
                Title:
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <br />
            <label>
                Completed:
                <select
                    value={completed ? "completed" : "not-completed"}
                    onChange={(e) => setCompleted(e.target.value === "completed")}
                >
                    <option value="not-completed">Not completed</option>
                    <option value="completed">Completed</option>
                </select>
            </label>
            <br />
            <button type="submit">Update</button>
        </form>
    );
}

export default EditTodoForm;
