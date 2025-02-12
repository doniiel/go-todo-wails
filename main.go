package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"todolist-app/internal/todo"

	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed frontend/dist
var assets embed.FS

func main() {
	// Путь к JSON
	configDir, err := os.UserConfigDir()
	if err != nil {
		log.Fatalf("cannot get user config directory: %v", err)
	}
	storagePath := filepath.Join(configDir, "wails-todo", "tasks.json")

	// Создадим директорию (если её нет):
	err = os.MkdirAll(filepath.Dir(storagePath), 0755)
	if err != nil {
		log.Fatalf("cannot create config directory: %v", err)
	}

	// Инициализируем Store и загружаем задачи:
	store := todo.NewStore(storagePath)
	err = store.Load()
	if err != nil {
		log.Printf("failed to load tasks: %v", err)
	}

	// Создаём наш backend-хендлер App
	app := NewApp(store)

	// Запускаем Wails
	err = wails.Run(&options.App{
		Title:     "Wails To-Do",
		Width:     800,
		Height:    600,
		Assets:    assets,
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
	})
	if err != nil {
		fmt.Println("Error:", err.Error())
	}
}
