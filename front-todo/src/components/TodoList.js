import React, { useState } from "react";
import TodoList from "./TodoList";

function CreateTodoForm() {
    const [user, setUser] = useState("");
    const [title, setTitle] = useState("");
    const [completed, setCompleted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                completed: completed,
                user: {
                    id: user,
                },
            }),
        };

        fetch("http://localhost:8080/todos/new", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));

        setUser("");
        setTitle("");
        setCompleted(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User:
                <select value={user} onChange={(e) => setUser(e.target.value)}>
                    <option value="">Select a user</option>
                    <option value="1">John</option>
                    <option value="2">Jane</option>
                    <option value="3">Bob</option>
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
            <button type="submit">Create</button>
        </form>
    );
}

export default CreateTodoForm;
