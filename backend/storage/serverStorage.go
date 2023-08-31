package storage

import "github.com/jmoiron/sqlx"

type ServerStore struct {
  Conn *sqlx.DB 
}

func NewServerStorage(db *sqlx.DB)  *ServerStore {
  return &ServerStore{Conn: db}
}

func (s ServerStore) CreateNewServer(serverName string) (string, error) {
  return "14", nil
}

func (s ServerStore) UserJoinServer(userId, serverName string) error {
  return nil
}
