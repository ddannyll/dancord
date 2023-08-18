package handlers

import "github.com/gofiber/fiber/v2"

type PingHandler struct {}

func NewPingHandler() *PingHandler {
	return &PingHandler{}
}


// Ping godoc
//	@Summary	Ping the server
//	@Tags		ping
//	@Accept		json
//	@Produce	plain
//	@Success	200	string	pong
//	@Router		/ping [get]
func (p *PingHandler) Ping(c *fiber.Ctx) error {
	if _, err := c.WriteString("pong"); err != nil {
		return err
	}
	return nil
}
