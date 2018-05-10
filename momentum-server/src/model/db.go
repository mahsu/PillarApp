package model

import (
	"database/sql"

	_ "github.com/lib/pq"
)

var db *sql.DB

func Init() {
	var err error
	db, err = sql.Open("postgres", "postgres://algovc:algovc@localhost:5432/algovc?sslmode=disable")

	if err != nil {
		panic(err)
	}

	err = db.Ping()
	if err != nil {
		panic(err)
	}
}
