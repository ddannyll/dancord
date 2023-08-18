package handlers

import (
	"github.com/ddannyll/dancord/backend/storage"
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

type userCredentialsBody struct {
	Username string `json:"username" validate:"required" example:"daniel"`
	Password string `json:"password" validate:"required,min=6" example:"daniel321"`
}//@name UserCredentials

type userSigninSuccessResponse struct {
	Id int `json:"id"`
}//@name UserSigninResponse

// SignUp godoc
//	@Summary		Sign a user up to dancord
//	@description	Insert description here
//	@Tags			user
//	@Accept			json
//	@Param			SignUpBody	body	userCredentialsBody	true	"Password must be atleast 6 characters."
//	@Produce		json
//	@Success		200	{object}	userSigninSuccessResponse
//	@Router			/user/signup [post]
func (u *UserHandler) SignUpUser(c *fiber.Ctx) error {
	var user userCredentialsBody
	if err := parseAndValidateBody(c, &user); err != nil {
		return err
	}

	userId, err := u.Storage.CreateNewUser(storage.NewUser{
		Username: user.Username,
		HashedPassword: user.Password,
	})
	if err != nil {
		return err
	}

	sess, err := u.SessionStore.Get(c)
	if err != nil {
		return err
	}
	sess.Set("auth", true)
	sess.Set("user_id", userId)
	sess.Save()

	resp := userSigninSuccessResponse{
		Id: userId,
	}
	return c.JSON(resp)
}

// Signin godoc
//	@Summary	Sign a user into dancord
//	@description
//	@Tags		user
//	@Accept		json
//	@Param		SignInBody	body	userCredentialsBody	true	"Password must be atleast 6 characters."
//	@Produce	json
//	@Success	200	{object}	userSigninSuccessResponse
//	@Failure	400	"Invalid Credentials"
//	@Router		/user/signin [post]
func (u *UserHandler) SignInUser(c * fiber.Ctx) error {
	var user userCredentialsBody
	if err := parseAndValidateBody(c, &user); err != nil {
		return err
	}

	userFromStorage, err := u.Storage.GetUserByUsername(user.Username)
	if err != nil {
		return fiber.NewError(fiber.StatusUnauthorized, "invalid username and/or password")
	}
	if userFromStorage.HashedPassword != user.Password { // rn pw isnt hashed
		return fiber.NewError(fiber.StatusUnauthorized, "invalid username and/or password")
	}

	sess, err := u.SessionStore.Get(c)
	if err != nil {
		return err
	}
	sess.Set("auth", true)
	sess.Set("user_id", userFromStorage.Id)
	sess.Save()

	return c.JSON(userSigninSuccessResponse{
		Id: userFromStorage.Id,
	})
}