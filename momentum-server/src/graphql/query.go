package graphql

import (
	"strconv"

	"github.com/graphql-go/graphql"
	"algovc/server/src/model"
)

var QueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"user": &graphql.Field{
			Type: UserType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// only accept user id from authorization
				userID := p.Context.Value("currentUser").(string)
				id, err := strconv.Atoi(userID)
				if err != nil {
					return nil, err
				}
				return model.GetUserByID(id)
			},
		},
		"models": &graphql.Field{
			Type: graphql.NewList(ModelType),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// only accept user id from authorization
				id := p.Context.Value("currentUser").(string)
				userID, err := strconv.Atoi(id)
				if err != nil {
					return nil, err
				}
				return model.GetModelsForUser(userID)
			},
		},
		"model": &graphql.Field{
			Type: ModelType,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Description: "Model ID",
					Type:        graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				// only accept user id from authorization
				userid := p.Context.Value("currentUser").(string)
				userID, err := strconv.Atoi(userid)
				if err != nil {
					return nil, err
				}
				modelid := p.Args["id"].(string)
				modelID, err := strconv.Atoi(modelid)
				if err != nil {
					return nil, err
				}
				return model.GetModelByID(userID,modelID)
			},
		},
	},
})
