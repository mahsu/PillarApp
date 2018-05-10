package model

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"log"
)

type User struct {
	ID           int
	Email        string
	Company_name string
}

func hashPassword(password string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashed[:]), err
}

func checkPassword(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func emailExists(email string) (bool, error) {
	var exists bool

	err := db.QueryRow(`
		SELECT EXISTS(SELECT 1 FROM users WHERE EMAIL=$1)
	`, email).Scan(&exists)

	return exists, err
}

func RegisterUser(user *User, password string) error {
	var id int

	exists, err := emailExists(user.Email)
	if err != nil {
		return err
	}

	if exists {
		//don't insert, but don't notify the user to prevent email farming
		log.Printf("Email already exists")
		return nil
	}

	hashed, err := hashPassword(password)

	if err != nil {
		return err
	}

	err = db.QueryRow(`
		INSERT INTO users(email, company_name, password)
		VALUES ($1, $2, $3)
		RETURNING id
	`, user.Email, user.Company_name, hashed).Scan(&id)

	if err != nil {
		return err
	}

	user.ID = id
	return err
}

func GetUserByEmailPassword(email string, password string) (*User, error) {
	var (
		id          int
		dbpass      string
		companyName string
	)

	err := db.QueryRow(`
		SELECT id, company_name, password
		FROM users
		WHERE email=$1
	`, email).Scan(&id, &companyName, &dbpass)

	if err != nil {
		return nil, err
	}
	log.Printf("%d\n", id)

	if !checkPassword(dbpass, password) {
		return nil, errors.New("incorrect password")
	}

	return &User{
		ID:           id,
		Email:        email,
		Company_name: companyName,
	}, nil
}

func GetUserByID(id int) (*User, error) {
	var email string
	var companyName string
	err := db.QueryRow("SELECT email, company_name FROM users WHERE id=$1", id).Scan(&email, &companyName)
	if err != nil {
		return nil, err
	}
	return &User{
		ID:           id,
		Email:        email,
		Company_name: companyName,
	}, nil
}
