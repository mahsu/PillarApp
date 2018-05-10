package graphql

import (

	"github.com/graphql-go/graphql"
	"algovc/server/src/model"
	"strconv"
)

var ModelType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Model",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if m, ok := p.Source.(*model.Model); ok == true {
					return m.ID, nil
				}
				return nil, nil
			},
		},
		"name": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if m, ok := p.Source.(*model.Model); ok == true {
					return m.Name, nil
				}
				return nil, nil
			},
		},
		"description": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if m, ok := p.Source.(*model.Model); ok == true {
					return m.Description, nil
				}
				return nil, nil
			},
		},
	},
})

func init() {
	/*ModelType.AddFieldConfig("user", &graphql.Field{
		Type: graphql.NewNonNull(UserType),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			if m, ok := p.Source.(*model.Model); ok == true {

				return model.GetUserByID(m.User_id)
			}
			return nil, nil
		},
	})*/
	ModelType.AddFieldConfig("submodels", &graphql.Field{
		Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(SubmodelType))),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			userid := p.Context.Value("currentUser").(string)
			userID, err := strconv.Atoi(userid)
			if err != nil {
				return nil, err
			}
			if m, ok := p.Source.(*model.Model); ok == true {
				return model.GetSubmodelsForModel(userID, m.ID)
			}
			return []model.Submodel{}, nil
		},
	})
}
