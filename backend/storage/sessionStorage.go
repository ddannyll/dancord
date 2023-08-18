package storage

import "github.com/gofiber/fiber/v2/middleware/session"

func NewSessionStorage() *session.Store {
	return session.New()
}