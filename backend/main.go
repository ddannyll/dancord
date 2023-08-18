package main

import (
	"context"
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/jmoiron/sqlx"
	"go.uber.org/fx"
	"www.github.com/ddannyll/dancord/backend/config"
	"www.github.com/ddannyll/dancord/backend/db"
	"www.github.com/ddannyll/dancord/backend/handlers"
	"www.github.com/ddannyll/dancord/backend/storage"
)

func newFiberServer(lc fx.Lifecycle, db *sqlx.DB, userHandler *handlers.UserHandler) {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(logger.New())
	userGroup := app.Group("/user")
	userGroup.Post("/signup", userHandler.SignUpUser)

	lc.Append(fx.Hook{
		OnStart: func (ctx context.Context) error {
			fmt.Println("Starting fiber server on port 8080")
			go app.Listen(":8080")
			return nil
		},
		OnStop: func (ctx context.Context) error {
			return app.Shutdown()
		},
	})
}


func main() {
	fx.New(
		fx.Provide(
			config.LoadEnv,
			db.CreateMySQLConnection,
			storage.NewUserStorage,
			handlers.NewUserHandler,
		),
		fx.Invoke(newFiberServer),
	).Run()
}