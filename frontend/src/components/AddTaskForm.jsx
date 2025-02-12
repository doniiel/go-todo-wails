import React, { useState } from 'react';

export function AddTaskForm({ onAddTask }) {
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("Medium");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert("Title is required");
            return;
        }
        onAddTask(title.trim(), dueDate, priority);
        setTitle("");
        setDueDate("");
        setPriority("Medium");
    };

    return (
        <form onSubmit={handleSubmit} className="task-input">
            <input
                type="text"
                placeholder="Enter new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <button type="submit">Add Task</button>
        </form>
    );
}
