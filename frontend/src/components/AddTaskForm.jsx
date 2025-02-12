import React, { useState } from 'react';

export function AddTaskForm({ onAddTask }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddTask(title);
        setTitle("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Add Task</button>
        </form>
    );
}
