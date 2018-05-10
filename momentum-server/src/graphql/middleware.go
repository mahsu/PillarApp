package graphql

import (
	"github.com/gin-gonic/gin"
	"github.com/graphql-go/graphql"
	"log"
	"context"
	"github.com/appleboy/gin-jwt"
	"github.com/graphql-go/handler"
)

var schema graphql.Schema

func Init() {
	var err error
	schema, err = graphql.NewSchema(graphql.SchemaConfig{
		Query:    QueryType,
		Mutation: MutationType,
	})
	if err != nil {
		log.Fatal(err)
	}
}

func Handler(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	id := claims["id"]
	h := handler.New(&handler.Config{
		Schema: &schema,
		Pretty: true,
	})
	ctx := context.WithValue(context.Background(), "currentUser", id)
	h.ContextHandler(ctx, c.Writer, c.Request)

}