package graphql

import (
	"strconv"

	"algovc/server/src/model"
	"github.com/graphql-go/graphql"
	"log"
)

var MutationType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Mutation",
	Fields: graphql.Fields{
		// add model
		"createModel": &graphql.Field{
			Type: ModelType,
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Description: "New model name",
					Type:        graphql.NewNonNull(graphql.String),
				},
				"description": &graphql.ArgumentConfig{
					Description: "New model description",
					Type:        graphql.NewNonNull(graphql.String),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				userid := p.Context.Value("currentUser").(string)
				name := p.Args["name"].(string)
				description := p.Args["description"].(string)

				userID, err := strconv.Atoi(userid)

				if err != nil {
					return nil, err
				}

				m := &model.Model{
					Name:        name,
					Description: description,
					User_id:     userID,
				}
				err = model.CreateModel(m)
				return m, err
			},
		},
		// TODO edit model
		// delete model
		"deleteModel": &graphql.Field{
			Type: graphql.Boolean,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Description: "Model ID to remove",
					Type:        graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				userid := p.Context.Value("currentUser").(string)
				modelid := p.Args["id"].(string)
				modelID, err := strconv.Atoi(modelid)
				if err != nil {
					return nil, err
				}
				userID, err := strconv.Atoi(userid)
				if err != nil {
					return nil, err
				}
				err = model.RemoveModel(userID, modelID)
				return (err == nil), err
			},
		},
		// add submodel
		"createSubmodel": &graphql.Field{
			Type: SubmodelType,
			Args: graphql.FieldConfigArgument{
				"model_id": &graphql.ArgumentConfig{
					Description: "ID of model to which the submodel belongs",
					Type:        graphql.NewNonNull(graphql.ID),
				},
				"category": &graphql.ArgumentConfig{
					Description: "Category of submodel",
					Type:        graphql.NewNonNull(graphql.String),
				},
				"name": &graphql.ArgumentConfig{
					Description: "New submodel name",
					Type:        graphql.NewNonNull(graphql.String),
				},
				"expression": &graphql.ArgumentConfig{
					Description: "New submodel expression",
					Type:        graphql.NewNonNull(graphql.String),
				},
				"param_min": &graphql.ArgumentConfig{
					Description: "Minimum sensitivity parameter",
					Type:        graphql.NewNonNull(graphql.Float),
				},
				"param_max": &graphql.ArgumentConfig{
					Description: "Maximum sensitivity parameter",
					Type:        graphql.NewNonNull(graphql.Float),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				userid := p.Context.Value("currentUser").(string)
				modelid := p.Args["model_id"].(string)

				userID, err := strconv.Atoi(userid)
				if err != nil {
					return nil, err
				}

				modelID, err := strconv.Atoi(modelid)
				if err != nil {
					return nil, err
				}
				category := p.Args["category"].(string)
				name := p.Args["name"].(string)
				expression := p.Args["expression"].(string)

				paramMin, _ := p.Args["param_min"].(float64)
				paramMax, _ := p.Args["param_max"].(float64)
				log.Printf("min: %v\n",paramMin)
				subModel := &model.Submodel{
					Model_id:   modelID,
					Category:   category,
					Name:       name,
					Expression: expression,
					Param_min:  paramMin,
					Param_max:  paramMax,
				}
				_, err = model.CreateSubmodel(userID, subModel)
				return subModel, err
			},
		},
		// update submodel
		"updateSubmodel": &graphql.Field{
			Type: SubmodelType,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Description: "ID of submodel",
					Type:        graphql.NewNonNull(graphql.ID),
				},
				"name": &graphql.ArgumentConfig{
					Description: "New submodel name",
					Type:        graphql.NewNonNull(graphql.String),
				},
				"expression": &graphql.ArgumentConfig{
					Description: "New submodel expression",
					Type:        graphql.NewNonNull(graphql.String),
				},
				"param_min": &graphql.ArgumentConfig{
					Description: "Minimum sensitivity parameter",
					Type:        graphql.NewNonNull(graphql.Float),
				},
				"param_max": &graphql.ArgumentConfig{
					Description: "Maximum sensitivity parameter",
					Type:        graphql.NewNonNull(graphql.Float),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				userid := p.Context.Value("currentUser").(string)
				userID, err := strconv.Atoi(userid)
				if err != nil {
					return nil, err
				}

				submodelid := p.Args["id"].(string)
				submodelID, err := strconv.Atoi(submodelid)
				if err != nil {
					return nil, err
				}

				name := p.Args["name"].(string)
				expression := p.Args["expression"].(string)
				paramMin, _ := p.Args["param_min"].(float64)
				paramMax, _ := p.Args["param_max"].(float64)


				submodel := &model.Submodel{
					ID:         submodelID,
					Name:       name,
					Expression: expression,
					Param_min:  paramMin,
					Param_max:  paramMax,
				}

				model.UpdateSubmodel(userID, submodel)
				return submodel, err
			},
		},
		// delete submodel
		"deleteSubmodel": &graphql.Field{
			Type: graphql.Boolean,
			Args: graphql.FieldConfigArgument{
				"id": &graphql.ArgumentConfig{
					Description: "Submodel ID to remove",
					Type:        graphql.NewNonNull(graphql.ID),
				},
			},
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				userid := p.Context.Value("currentUser").(string)
				userID, err := strconv.Atoi(userid)
				if err != nil {
					return nil, err
				}

				submodelid := p.Args["id"].(string)
				submodelID, err := strconv.Atoi(submodelid)
				if err != nil {
					return nil, err
				}
				err = model.RemoveSubmodel(userID, submodelID)
				return (err == nil), err
			},
		},
	},
})
