package handlers

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func parseAndValidateBody(c *fiber.Ctx, out interface{}) error {
	if err := c.BodyParser(out); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, "failed to parse request body") 
	}
	validate := validator.New()
	if err := validate.Struct(out); err != nil {
		return fiber.NewError(fiber.StatusBadRequest, err.Error())
	}
	return nil
}
