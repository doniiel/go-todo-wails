package todo

import "time"

// Task представляет задачу в To-Do списке.
type Task struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	Completed bool      `json:"completed"`
	CreatedAt time.Time `json:"created_at"`
}
