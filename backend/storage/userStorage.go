package storage

import (
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/jmoiron/sqlx"
)

type UserStorage struct {
	Conn *sqlx.DB
}

func NewUserStorage(conn *sqlx.DB) *UserStorage {
	return &UserStorage{Conn: conn}
}

type NewUser struct {
	Username string
	HashedPassword string
}

type User struct {
	Id int `db:"id"`
	Username string `db:"username"`
	HashedPassword string `db:"hashed_password"`
}

func (s *UserStorage) CreateNewUser(user NewUser) (int, error) {
	res, err := s.Conn.Exec(
		"INSERT INTO Users (username, hashed_password) values (?, ?)",
		user.Username, user.HashedPassword,
	)
	if err != nil {
		return 0, fiber.NewError(
			http.StatusBadRequest, 
			"failed to insert user into database",
		)
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(id), nil
}

func (s *UserStorage) GetUserByUsername(username string) (*User, error) {
	user := new(User)
	if err := s.Conn.Get(user, 
		"SELECT * FROM Users WHERE username=?",
		username,
	); err != nil {
		return nil, fiber.NewError(
			http.StatusBadRequest, 
			fmt.Sprintf("failed to get user %v", username),
		)
	}
	return user, nil
}