package handlers

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"www.github.com/ddannyll/dancord/backend/storage"
)

type UserHandler struct {
	Storage *storage.UserStorage
}

func NewUserHandler(storage *storage.UserStorage) *UserHandler {
	return &UserHandler{Storage: storage}
}

type userSignupBody struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required,min=6"`
}

type userSignupSuccessResponse struct {
	Id int `json:"id"`
}

func (u *UserHandler) SignUpUser(c *fiber.Ctx) error {
	var user userSignupBody
	if err := c.BodyParser(&user); err != nil {
		return err
	}

	validate := validator.New()
	if err := validate.Struct(user); err != nil {
		return err
	}

	id, err := u.Storage.CreateNewUser(storage.User{
		Username: user.Username,
		HashedPassword: user.Password,
	})
	if err != nil {
		return err
	}

	resp := userSignupSuccessResponse{
		Id: id,
	}
	return c.JSON(resp)
}
