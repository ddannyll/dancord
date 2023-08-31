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
//	@Description	A logged in user is able to create a new server.
//	@Tags			server
//	@Produce		json
//	@Success		200	{object}	newServerResponse
//	@Router			/server/new [post]
//  @Failure    401 "User is not logged in"
func (s *ServerHandler) NewServer(ctx *fiber.Ctx) error {
  serverId, err := s.Storage.CreateNewServer("test")
  if err != nil {
    return err
  } 
  err = s.Storage.UserJoinServer("userId", serverId)
  return ctx.JSON(newServerResponse{
    Id: serverId,
  })
}
type newServerResponse struct {
  Id string `json:"id" example:"5020"`
}

// JoinServer godoc
//	@Summary		Join a server given an invite code
//	@Description	A logged in user is able to join a server given a valid invite code. 
//	@Description	The serverId is returned
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

// NewJoinCode godoc
//	@Summary		Create a new join link for a specified server
//	@Description	Only server admins should be able to do this
//	@Tags			server
//	@Accept			json 
//	@Param			serverId	body	newJoinCodeReqeust	true	"Valid serverId"
//	@Produce		json 
//	@Success		200	{object}	newJoinCodeResponse
//	@Failure		401	"User is not logged in"
//	@Failure		403	"User is not an admin"
//	@Router			/server/join/new [post] 
func (s *ServerHandler) NewJoinCode(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented) 
}
type newJoinCodeReqeust struct {
  ServerId string `json:"serverId" example:"5020"`
}
type newJoinCodeResponse struct {
  JoinCode string `json:"joinCode" example:"53Asd2ds"`
}

// ListServers godoc 
//	@Summary		List the servers the user is in 
//	@Description	Return a list of servers the user is currently in 
//	@Tags			server 
//	@Produce		json 
//	@Success		200	{object}	listServersResponse
//	@Failure		401	"User is not logged in"
//	@Router			/server/list [get]
func (s *ServerHandler) ListServers(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented) 
}
type listServersResponse struct {
  Servers []string
}

// DeleteServer godoc 
//	@Summary		Delete a server
//	@Description	Only admins can delete their server 
//	@Tags			server 
//	@Produce		json 
//	@Success		200	"`{success: true}`"
//	@Failure		401	"User is not logged in"
//	@Failure		403	"User is not an admin in te server"
//	@Router			/server [delete]
func (s *ServerHandler) DeleteServer(ctx *fiber.Ctx) error {
  return fiber.NewError(http.StatusNotImplemented) 
}

