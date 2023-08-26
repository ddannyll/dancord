package handlers

import (
	"net/http"

	"github.com/ddannyll/dancord/backend/storage"
	"github.com/gofiber/fiber/v2"
)


type ServerHandler struct {
  Storage *storage.ServerStore 
}

func NewServerHandler(serverStore *storage.ServerStore) *ServerHandler {
  return &ServerHandler{Storage: serverStore}
}

// NewServer godoc
//	@Summary		Create a new server on dancord
//	@description	A logged in user is able to create a new server.
//	@Tags			server
//	@Accept			json
//	@Produce		json
//	@Router			/server/new [post]
func (s *ServerHandler) NewServer(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented)
}

func (s *ServerHandler) JoinServer(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented) 
}

func (s *ServerHandler) NewJoinLink(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented) 
}

func (s *ServerHandler) ListServers(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented) 
}

func (s *ServerHandler) DeleteServer(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented) 
}

