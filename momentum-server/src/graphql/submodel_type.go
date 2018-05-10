package graphql

import (

	"github.com/graphql-go/graphql"
	"algovc/server/src/model"
)

var SubmodelType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Submodel",
	Fields: graphql.Fields{
		"id": &graphql.Field{
			Type: graphql.NewNonNull(graphql.ID),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if submodel, ok := p.Source.(*model.Submodel); ok == true {
					return submodel.ID, nil
				}
				return nil, nil
			},
		},
		"category": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if submodel, ok := p.Source.(*model.Submodel); ok == true {
					return submodel.Category, nil
				}
				return nil, nil
			},
		},
		"name": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if submodel, ok := p.Source.(*model.Submodel); ok == true {
					return submodel.Name, nil
				}
				return nil, nil
			},
		},
		"expression": &graphql.Field{
			Type: graphql.NewNonNull(graphql.String),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if submodel, ok := p.Source.(*model.Submodel); ok == true {
					return submodel.Expression, nil
				}
				return nil, nil
			},
		},
		"param_min": &graphql.Field{
			Type: graphql.NewNonNull(graphql.Float),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if submodel, ok := p.Source.(*model.Submodel); ok == true {
					return submodel.Param_min, nil
				}
				return nil, nil
			},
		},
		"param_max": &graphql.Field{
			Type: graphql.NewNonNull(graphql.Float),
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				if submodel, ok := p.Source.(*model.Submodel); ok == true {
					return submodel.Param_max, nil
				}
				return nil, nil
			},
		},
	},
})
