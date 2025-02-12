import React from 'react';

export function TaskList({ tasks, onDelete, onToggleComplete }) {
    return (
        <ul>
            {tasks.map((task) => {
                let color;
                switch (task.priority) {
                    case "High":
                        color = "red";
                        break;
                    case "Medium":
                        color = "orange";
                        break;
                    case "Low":
                        color = "green";
                        break;
                    default:
                        color = "black";
                }

                return (
                    <li
                        key={task.id}
                        className={task.completed ? "completed" : ""}
                    >
                        <div className="task-content" style={{ color }}>
                            <strong>{task.title}</strong>

                            {task.due_date && (
                                <em style={{ }}>
                                    Due: { new Date(task.due_date).toLocaleDateString() }
                                </em>
                            )}
                        </div>

                        <div className="task-actions">
                            <button
                                className={task.completed ? "undo-btn" : "complete-btn"}
                                onClick={() => onToggleComplete(task.id)}
                            >
                                {task.completed ? "Undo" : "Complete"}
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => onDelete(task.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
