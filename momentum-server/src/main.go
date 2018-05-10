package main

import (
	"algovc/server/src/graphql"
	"algovc/server/src/model"
	"github.com/appleboy/gin-jwt"
	"github.com/gin-gonic/gin"
	"log"
	"time"
	"strconv"
)

func pingHandler(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func registerHandler(c *gin.Context) {
	user := model.User{
		ID:           -1,
		Email:        c.PostForm("email"),
		Company_name: c.PostForm("company_name"),
	}
	password := c.PostForm("password")

	err := model.RegisterUser(&user, password)
	if err != nil {
		log.Println(err)
		c.Status(500)
		return
	}
	c.Status(200)
	return
}

func main() {

	//Initialize the postgres connection
	model.Init()

	//Initialize the graphql schema
	graphql.Init()

	// the jwt middleware
	authMiddleware := &jwt.GinJWTMiddleware{
		Realm:      "momentum",
		Key:        []byte("secret key"),
		Timeout:    time.Hour * 24,
		MaxRefresh: time.Hour * 24,
		Authenticator: func(email string, password string, c *gin.Context) (string, bool) {
			user, err := model.GetUserByEmailPassword(email, password)
			if err != nil {
				log.Println(err)
				return "", false
			}
			return strconv.Itoa(user.ID), true
		},
		Authorizator: func(userId string, c *gin.Context) bool {
			return true
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},
		// TokenLookup is a string in the form of "<source>:<name>" that is used
		// to extract token from the request.
		// Optional. Default value "header:Authorization".
		// Possible values:
		// - "header:<name>"
		// - "query:<name>"
		// - "cookie:<name>"
		TokenLookup: "header:Authorization",
		// TokenLookup: "query:token",
		// TokenLookup: "cookie:token",

		// TokenHeadName is a string in the header. Default value is "Bearer"
		TokenHeadName: "Bearer",

		// TimeFunc provides the current time. You can override it to use another time value. This is useful for testing or if your server uses a different time zone than your tokens.
		TimeFunc: time.Now,
	}

	// Routes
	r := gin.Default()
	r.GET("/ping", pingHandler)

	api := r.Group("/api")
	{
		api.GET("/ping", pingHandler)
		api.POST("/login", authMiddleware.LoginHandler)
		api.POST("/register", registerHandler)
	}

	auth := r.Group("/auth")
	auth.Use(authMiddleware.MiddlewareFunc())
	{
		auth.POST("/graphql", graphql.Handler)
		auth.GET("/ping", pingHandler)
		auth.GET("/refresh_token", authMiddleware.RefreshHandler)
	}

	r.Run() // listen and serve on 0.0.0.0:8080
}
