import React from 'react';

export function TaskList({ tasks, onDelete, onToggleComplete }) {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} style={{
                    textDecoration: task.completed ? 'line-through' : 'none'
                }}>
                    <span>{task.title}</span>
                    <button onClick={() => onToggleComplete(task.id)}>
                        {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}
