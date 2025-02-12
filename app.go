package main

import (
	"context"
	"fmt"
	"time"
	"todolist-app/internal/todo"
)

type App struct {
	ctx   context.Context
	store *todo.Store
}

func NewApp(store *todo.Store) *App {
	return &App{
		store: store,
	}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) GetTasks() []todo.Task {
	return a.store.GetTasks()
}

func (a *App) AddTask(title string, dueDateStr string, priority string) (todo.Task, error) {
	var parsedTime *time.Time
	if dueDateStr != "" {
		t, err := time.Parse("2006-01-02", dueDateStr)
		if err == nil {
			parsedTime = &t
		} else {
			fmt.Println("Ошибка парсинга dueDate:", err)
		}
	}
	return a.store.AddTask(title, parsedTime, priority)
}

func (a *App) DeleteTask(taskID string) error {
	return a.store.DeleteTask(taskID)
}

func (a *App) ToggleComplete(taskID string) (todo.Task, error) {
	return a.store.ToggleComplete(taskID)
}
