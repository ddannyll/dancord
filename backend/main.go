package main

import (
	"context"
	"errors"
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

//	@title			dancord API
//	@version		0.1
//	@description	Backend API sepcifications for dancord
func newFiberServer(
	lc fx.Lifecycle, 
	db *sqlx.DB, 
	userHandler *handlers.UserHandler, 
	pingHandler *handlers.PingHandler,
  serverHandler *handlers.ServerHandler,
	authMiddleware *handlers.AuthMiddleware,
	config config.EnvVars,
) {
	app := fiber.New(fiber.Config{
		ErrorHandler: func(ctx *fiber.Ctx, err error) error {
			ctx.Set(fiber.HeaderContentType, fiber.MIMETextPlainCharsetUTF8)
			// Overwrite the default error handler since we don't want to
			// send potentially sensitive information in the event of 
			// unexpected errors

			// If a handled error (one that is passed as *fiber.Error)
			// we just send that back normally
			var e *fiber.Error
			if errors.As(err, &e) {
				return ctx.Status(e.Code).SendString(e.Error())
			}

			// Otherwise send Internal Server Error
			return ctx.Status(fiber.StatusInternalServerError).SendString("Internal Server Error")
		},
	})

	// Middleware
	app.Use(cors.New())
	app.Use(logger.New())

	// Docs
	app.Get("/swagger/*", swagger.HandlerDefault)

	// API Routes
	app.Get("/ping", pingHandler.Ping)
	userGroup := app.Group("/user")
	userGroup.Post("/signup", userHandler.SignUpUser)
	userGroup.Post("/signin", userHandler.SignInUser)
	userGroup.Post("/signout", userHandler.SignOutUser)
	userGroup.Get("/healthcheck", authMiddleware.AuthenticateRoute, userHandler.HealthCheckUser)

  serverGroup := app.Group("/server")
  serverGroup.Post("/new", serverHandler.NewServer)
  serverGroup.Post("/join", serverHandler.JoinServer)
  serverGroup.Post("/join/new", serverHandler.NewJoinLink)
  serverGroup.Get("/list", serverHandler.ListServers)
  serverGroup.Delete("/", serverHandler.DeleteServer)

	lc.Append(fx.Hook{
		OnStart: func (ctx context.Context) error {
			fmt.Printf("Starting Fiber - %s:%s\n", config.LISTEN_ON, config.PORT)
			go app.Listen(fmt.Sprintf("%s:%s", config.LISTEN_ON, config.PORT))
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
			storage.NewSessionStorage,
      storage.NewServerStorage,
			handlers.NewUserHandler,
			handlers.NewPingHandler,
			handlers.NewAuthMiddleware,
      handlers.NewServerHandler,
		),
		fx.Invoke(newFiberServer),
	).Run()
}
