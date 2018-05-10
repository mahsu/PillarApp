package model

type Submodel struct {
	ID         int
	Model_id   int
	Category   string
	Name       string
	Expression string
	Param_min  float64
	Param_max  float64
}

func CreateSubmodel(userid int, submodel *Submodel) (bool, error) {
	var id int

	err := db.QueryRow(`
		INSERT INTO submodels (model_id, name, category, expression, param_min, param_max)
		SELECT $1, $2, $3, $4, $5, $6
		WHERE EXISTS(SELECT 1 FROM models as M WHERE M.id=$1 AND M.user_id=$7)
		RETURNING id;
	  `, submodel.Model_id, submodel.Name, submodel.Category,
		submodel.Expression, submodel.Param_min, submodel.Param_max, userid).Scan(&id)

	submodel.ID = id
	return true, err
}

func UpdateSubmodel(user_id int, submodel *Submodel) error {

	_, err := db.Query(`
		UPDATE submodels AS S
		SET name=$1, expression=$2, param_min=$3, param_max=$4
		FROM models as M
		WHERE S.id=$5 AND M.id=S.model_id AND M.user_id=$6;
    `, submodel.Name, submodel.Expression, submodel.Param_min, submodel.Param_max,
		submodel.ID, user_id)

	return err
}

func GetSubmodelsForModel(user_id int, model_id int) ([]*Submodel, error) {
	var submodels = []*Submodel{}

	rows, err := db.Query(`
		SELECT S.id, S.model_id, S.category, S.name, S.expression, S.param_min, S.param_max
		FROM submodels as S 
		LEFT JOIN models as M
		ON S.model_id=M.id
		WHERE S.model_id=$1
		AND M.user_id=$2;
	`, model_id, user_id)

	if err != nil {
		return nil, err
	}

	defer rows.Close()
	var (
		name, expr, cat 	string
		id, mid         	int
		param_min, param_max float64
	)

	for rows.Next() {
		if err = rows.Scan(&id, &mid, &cat, &name, &expr, &param_min, &param_max); err != nil {
			return nil, err
		}
		submodels = append(submodels, &Submodel{
			ID:         id,
			Model_id:   mid,
			Category:   cat,
			Name:       name,
			Expression: expr,
			Param_min: param_min,
			Param_max: param_max,
		})
	}
	return submodels, nil
}

func RemoveSubmodel(user_id int, submodel_id int) error {
	_, err := db.Query(`
        DELETE FROM submodels AS S
		USING models as M
        WHERE S.id=$1 AND S.model_id = M.id AND M.user_id = $2
    `, submodel_id, user_id)
	return err
}
