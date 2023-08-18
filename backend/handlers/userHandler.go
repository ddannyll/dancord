package handlers

import (
	"github.com/ddannyll/dancord/backend/storage"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
)

type UserHandler struct {
	Storage *storage.UserStorage
	SessionStore *session.Store
}

func NewUserHandler(storage *storage.UserStorage, sessionStore *session.Store) *UserHandler {
	return &UserHandler{Storage: storage, SessionStore: sessionStore}
}

type userSignupBody struct {
	Username string `json:"username" validate:"required" example:"daniel"`
	Password string `json:"password" validate:"required,min=6" example:"daniel321"`
}//@name SignUpBody

type userSignupSuccessResponse struct {
	Id int `json:"id"`
}//@name SignUpResponse

// SignUp godoc
//	@Summary		Sign a user up to dancord
//	@description	Insert description here
//	@Tags			user
//	@Accept			json
//	@Param			SignUpBody	body	userSignupBody	true	"Password must be atleast 6 characters."
//	@Produce		json
//	@Success		200	{object}	userSignupSuccessResponse
//	@Router			/user/signup [post]
func (u *UserHandler) SignUpUser(c *fiber.Ctx) error {
	var user userSignupBody
	if err := c.BodyParser(&user); err != nil {
		return err
	}

	validate := validator.New()
	if err := validate.Struct(user); err != nil {
		return err
	}

	userId, err := u.Storage.CreateNewUser(storage.User{
		Username: user.Username,
		HashedPassword: user.Password,
	})
	if err != nil {
		return err
	}

	sess, err := u.SessionStore.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).SendString("idk bro")
	}
	sess.Set("auth", true)
	sess.Set("user_id", userId)

	sess.Save()
	resp := userSignupSuccessResponse{
		Id: userId,
	}
	return c.JSON(resp)
}
