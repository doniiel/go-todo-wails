import React, { useEffect, useState } from 'react';
import './app.css';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskList } from './components/TaskList';

// Wails API (импортируется из auto-generated)
import { GetTasks, AddTask, DeleteTask, ToggleComplete } from '../wailsjs/go/main/App';

function App() {
    const [tasks, setTasks] = useState([]);

    // Загружаем задачи при монтировании компонента
    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const result = await GetTasks();
            setTasks(result);
        } catch (err) {
            console.error("Failed to load tasks:", err);
        }
    };

    const handleAddTask = async (title) => {
        if (!title) return;
        try {
            await AddTask(title);
            await loadTasks(); // перезагрузим список
        } catch (err) {
            console.error("AddTask error:", err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await DeleteTask(taskId);
            await loadTasks();
        } catch (err) {
            console.error("DeleteTask error:", err);
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
        <div className="App">
            <h1>Wails To-Do List</h1>
            <AddTaskForm onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onDelete={handleDeleteTask}
                onToggleComplete={handleToggleComplete}
            />
        </div>
    );
}

export default App;
