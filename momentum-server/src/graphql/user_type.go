package graphql

import (
	"algovc/server/src/model"
	"github.com/graphql-go/graphql"
)

var UserType = graphql.NewObject(graphql.ObjectConfig{
	Name: "User",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if user, ok := p.Source.(*model.User); ok == true {
					return user.ID, nil
				}
				return nil, nil
			},
		},
		"email": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if user, ok := p.Source.(*model.User); ok == true {
					return user.Email, nil
				}
				return nil, nil
			},
		},
		"company_name": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if user, ok := p.Source.(*model.User); ok == true {
					return user.Company_name, nil
				}
				return nil, nil
			},
		},
	},
})

func init() {
	UserType.AddFieldConfig("models", &graphql.Field{
		Type: graphql.NewNonNull(graphql.NewList(graphql.NewNonNull(ModelType))),
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			if user, ok := p.Source.(*model.User); ok == true {
				return model.GetModelsForUser(user.ID)
			}
			return []model.Model{}, nil
		},
	})
}
