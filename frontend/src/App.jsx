import React, { useEffect, useState } from 'react';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskList } from './components/TaskList';
import { GetTasks, AddTask, DeleteTask, ToggleComplete } from '../wailsjs/go/main/App';

function App() {
    const [tasks, setTasks] = useState([]);

    const activeTasks = tasks.filter(t => !t.completed);
    const completedTasks = tasks.filter(t => t.completed);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const result = await GetTasks();
            console.log("Tasks from backend:", result);
            setTasks(result);
        } catch (err) {
            console.error("Failed to load tasks:", err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        const confirmed = window.confirm("Are you sure you want to delete the task?");
        if (!confirmed) return;

        try {
            await DeleteTask(taskId);
            await loadTasks();
        } catch (err) {
            console.error("DeleteTask error:", err);
        }
    };

    const handleAddTask = async (title, dueDateStr, priority) => {
        try {
            console.log("handleAddTask:", title, dueDateStr, priority);
            await AddTask(title, dueDateStr, priority);
            await loadTasks();
        } catch (err) {
            console.error("AddTask error:", err);
        }
    };

    const handleToggleComplete = async (taskId) => {
        try {
            await ToggleComplete(taskId);
            await loadTasks();
        } catch (err) {
            console.error("ToggleComplete error:", err);
        }
    };

    return (
        <div className="container">
            <h1>Wails To-Do List</h1>
            <AddTaskForm onAddTask={handleAddTask} />

            <h2>Active Tasks</h2>
            <TaskList
                tasks={activeTasks}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
            />

            <h2>Completed Tasks</h2>
            <TaskList
                tasks={completedTasks}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
            />
        </div>
    );
}

export default App;
