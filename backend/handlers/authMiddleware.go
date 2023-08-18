package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

type AuthMiddleware struct {
	Store *session.Store
}

func NewAuthMiddleware(store *session.Store) *AuthMiddleware {
	return &AuthMiddleware{Store: store}
}

func (a *AuthMiddleware) AuthenticateRoute(c *fiber.Ctx) error {
	sess, err := a.Store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).SendString("not authorized")
	}

	if sess.Get("auth") == nil {
		return c.Status(fiber.StatusUnauthorized).SendString("not authorized")
	}

	return c.Next()
}
