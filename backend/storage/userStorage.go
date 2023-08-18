package storage

import "github.com/jmoiron/sqlx"

type UserStorage struct {
	Conn *sqlx.DB
}

func NewUserStorage(conn *sqlx.DB) *UserStorage {
	return &UserStorage{Conn: conn}
}

type User struct {
	Username string
	HashedPassword string
}

func (s *UserStorage) CreateNewUser(user User) (int, error) {
	res, err := s.Conn.Exec(
		"INSERT INTO Users (username, hashed_password) values (?, ?)",
		user.Username, user.HashedPassword,
	)
	if err != nil {
		return 0, err
	}
	id, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}
	return int(id), nil
}