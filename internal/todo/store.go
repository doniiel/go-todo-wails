package todo

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/google/uuid"
)

type Store struct {
	tasks       []Task
	storagePath string
}

// NewStore возвращает новый экземпляр хранилища.
func NewStore(storagePath string) *Store {
	return &Store{
		tasks:       []Task{},
		storagePath: storagePath,
	}
}

// Load загружает задачи из файла (если он существует).
func (s *Store) Load() error {
	data, err := os.ReadFile(s.storagePath)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			// Файл ещё не создан – это не ошибка
			return nil
		}
		return err
	}
	if len(data) == 0 {
		// Пустой файл – задач нет
		return nil
	}
	err = json.Unmarshal(data, &s.tasks)
	if err != nil {
		return err
	}
	return nil
}

// Save сохраняет текущие задачи в JSON-файл.
func (s *Store) Save() error {
	data, err := json.MarshalIndent(s.tasks, "", "  ")
	if err != nil {
		return err
	}
	err = os.WriteFile(s.storagePath, data, 0644)
	if err != nil {
		return err
	}
	return nil
}

// GetTasks возвращает список всех задач.
func (s *Store) GetTasks() []Task {
	return s.tasks
}

func (s *Store) AddTask(title string, dueDate *time.Time, priority string) (Task, error) {
	if title == "" {
		return Task{}, errors.New("title cannot be empty")
	}

	newTask := Task{
		ID:        uuid.NewString(),
		Title:     title,
		Completed: false,
		CreatedAt: time.Now(),
		DueDate:   dueDate,
		Priority:  priority,
	}

	s.tasks = append(s.tasks, newTask)
	err := s.Save()
	if err != nil {
		return Task{}, err
	}
	return newTask, nil
}

// DeleteTask удаляет задачу по её ID.
func (s *Store) DeleteTask(taskID string) error {
	index := -1
	for i, t := range s.tasks {
		if t.ID == taskID {
			index = i
			break
		}
	}
	if index == -1 {
		return fmt.Errorf("task with ID %s not found", taskID)
	}
	s.tasks = append(s.tasks[:index], s.tasks[index+1:]...)
	return s.Save()
}

// ToggleComplete переворачивает состояние Completed (с true на false или наоборот).
func (s *Store) ToggleComplete(taskID string) (Task, error) {
	for i, t := range s.tasks {
		if t.ID == taskID {
			s.tasks[i].Completed = !s.tasks[i].Completed
			err := s.Save()
			if err != nil {
				return Task{}, err
			}
			return s.tasks[i], nil
		}
	}
	return Task{}, fmt.Errorf("task with ID %s not found", taskID)
}
