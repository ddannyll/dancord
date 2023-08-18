package main

import (
	"context"
	"fmt"

	"github.com/ddannyll/dancord/backend/config"
	"github.com/ddannyll/dancord/backend/db"
	_ "github.com/ddannyll/dancord/backend/docs"
	"github.com/ddannyll/dancord/backend/handlers"
	"github.com/ddannyll/dancord/backend/storage"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/swagger"
	"github.com/jmoiron/sqlx"

	"go.uber.org/fx"
)

//	@title						dancord API
//	@version					0.1
//	@description				Backend API sepcifications for dancord
//	@securityDefinitions.apikey	ApiKeyAuth
//	@in							header
//	@name						Authorization
//	@description				Token in Bearer format to authenticate the user
//	@host						localhost:8080
//	@BasePath					/
func newFiberServer(
	lc fx.Lifecycle, 
	db *sqlx.DB, 
	userHandler *handlers.UserHandler, 
	pingHandler *handlers.PingHandler,
) {
	app := fiber.New()
	app.Use(cors.New())
	app.Use(logger.New())

	app.Get("/swagger/*", swagger.HandlerDefault)


	app.Get("/ping", pingHandler.Ping)
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
			handlers.NewPingHandler,
		),
		fx.Invoke(newFiberServer),
	).Run()
}