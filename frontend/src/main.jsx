import "@wailsapp/runtime";
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Подключаем стили, если нужно:
import './app.css';

const root = createRoot(document.getElementById('app'));
root.render(<App />);

// Init().then(() => {
//     console.log("Wails runtime инициализирован");
//
//     const addTaskBtn = document.getElementById('addTaskBtn');
//     const newTaskInput = document.getElementById('newTaskInput');
//     const tasksList = document.getElementById('tasksList');
//
//     // Функция загрузки задач из бэкенда
//     function loadTasks() {
//         window.backend.App.GetTasks()
//             .then(tasks => {
//                 tasksList.innerHTML = '';
//                 tasks.forEach(task => {
//                     addTaskToDOM(task);
//                 });
//             })
//             .catch(err => console.error(err));
//     }
//
//     // Добавление задачи в DOM
//     function addTaskToDOM(task) {
//         const li = document.createElement('li');
//         li.setAttribute('data-id', task.id);
//         li.className = task.completed ? 'completed' : '';
//
//         const checkbox = document.createElement('input');
//         checkbox.type = 'checkbox';
//         checkbox.checked = task.completed;
//         checkbox.addEventListener('change', () => {
//             toggleTask(task.id);
//         });
//
//         const span = document.createElement('span');
//         span.textContent = task.description;
//
//         const deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'Удалить';
//         deleteBtn.addEventListener('click', () => {
//             deleteTask(task.id);
//         });
//
//         li.appendChild(checkbox);
//         li.appendChild(span);
//         li.appendChild(deleteBtn);
//         tasksList.appendChild(li);
//     }
//
//     // Обработчик для добавления новой задачи
//     addTaskBtn.addEventListener('click', () => {
//         const description = newTaskInput.value.trim();
//         if (!description) return;
//         console.log("Отправляем задачу:", description);
//         window.backend.App.AddTask(description)
//             .then(task => {
//                 console.log("Задача добавлена:", task);
//                 addTaskToDOM(task);
//                 newTaskInput.value = '';
//             })
//             .catch(err => console.error("Ошибка при добавлении задачи:", err));
//     });
//
//     // Функция для удаления задачи
//     function deleteTask(id) {
//         window.backend.App.DeleteTask(id)
//             .then(() => {
//                 const li = document.querySelector(`li[data-id='${id}']`);
//                 if (li) li.remove();
//             })
//             .catch(err => console.error(err));
//     }
//
//     // Функция для переключения состояния задачи (выполнено/не выполнено)
//     function toggleTask(id) {
//         window.backend.App.ToggleTask(id)
//             .then(() => {
//                 loadTasks();
//             })
//             .catch(err => console.error(err));
//     }
//
//     // Начальная загрузка задач
//     loadTasks();
// });
