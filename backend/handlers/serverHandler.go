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

/* ---------------------------------------------------------------------------------------------
    Handlers
   ---------------------------------------------------------------------------------------------*/

// NewServer godoc
//	@Summary		Create a new server on dancord
//	@description	A logged in user is able to create a new server.
//	@Tags			server
//	@Produce		json
//	@Success		200	{object}	newServerResponse
//	@Router			/server/new [post]
func (s *ServerHandler) NewServer(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented)
}
type newServerResponse struct {
  Id string `json:"id" example:"5020"`
}

// JoinServer godoc
//	@Summary		Join a server given an invite code
//	@description	A logged in user is able to join a server given a valid invite code, the serverId is returned
//	@Tags			server
//	@Accept			json
//	@Param			inviteCode	body	joinServerRequest	true	"Valid invite code"
//	@Produce		json 
//	@Success		200	{object}	joinServerResponse	
//	@Failure		401	"User is not logged in/not authorized"
//	@Failure		400	"Invalid invite code"
//	@Router			/server/join [post]
func (s *ServerHandler) JoinServer(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented) 
}
type joinServerRequest struct {
  JoinCode string `json:"joinCode" example:"53Asd2ds"`
}
type joinServerResponse struct {
  ServerId string `json:"serverId" example:"5020"`
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

