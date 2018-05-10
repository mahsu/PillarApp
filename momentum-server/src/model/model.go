package model

type Model struct {
	ID          int
	Name        string
	Description string
	User_id     int
}

func CreateModel(model *Model) error {
	var id int
	err := db.QueryRow(`
		INSERT INTO models(name, description, user_id)
		VALUES ($1, $2, $3)
		RETURNING id
	`, model.Name, model.Description, model.User_id).Scan(&id)
	model.ID = id
	return err
}

func GetModelByID(userid int, modelid int,) (*Model, error) {
	var (
		name, description	string
	)
	err := db.QueryRow(`
		SELECT name, description
		FROM models
		WHERE user_id=$1 AND id=$2
	`, userid, modelid).Scan(&name, &description)

	if err != nil {
		return nil, err
	}
	return &Model{
		ID:          modelid,
		Name:        name,
		Description: description,
		User_id:     userid,
	}, nil
}

func GetModelsForUser(user_id int) ([]*Model, error) {
	var models = []*Model{}

	rows, err := db.Query(`
		SELECT id, name, description, user_id
		FROM models
		WHERE user_id=$1
	`, user_id)

	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var (
		name, description string
		id, uid           int
	)

	for rows.Next() {
		if err = rows.Scan(&id, &name, &description, &uid); err != nil {
			return nil, err
		}
		models = append(models, &Model{
			ID:          id,
			Name:        name,
			Description: description,
			User_id:     uid,
		})
	}
	return models, nil

}

func RemoveModel(userid int, modelid int) error {
	_, err := db.Query(`
        DELETE FROM models
        WHERE id=$1 AND user_id=$2
    `, modelid,userid)
	return err
}
