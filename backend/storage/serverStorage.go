package storage

import "github.com/jmoiron/sqlx"

type ServerStore struct {
  Conn *sqlx.DB 
}

func NewServerStorage(db *sqlx.DB)  *ServerStore {
  return &ServerStore{Conn: db}
}
