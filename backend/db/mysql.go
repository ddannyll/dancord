package db

import (
	"github.com/ddannyll/dancord/backend/config"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

func CreateMySQLConnection(env config.EnvVars) *sqlx.DB {
	db := sqlx.MustConnect("mysql", env.DSN)
	if err := db.Ping(); err != nil {
		panic(err)
	}
	println("DB CONNECTED")
	return db
}