package main

import (
	"employee_management_system/config"
	"employee_management_system/models"
	"employee_management_system/controllers"
	"employee_management_system/middleware"
	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	godotenv.Load()

	config.ConnectDB()

	config.DB.AutoMigrate(
		&models.User{},
		&models.Employee{},
	)

	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
			"https://employee-management-system-olive-seven.vercel.app",
		},
		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},
		AllowCredentials: true,
	}))

	r.OPTIONS("/*path", func(c *gin.Context) {
		c.AbortWithStatus(204)
	})

	r.POST("/api/register", controllers.Register)
	r.POST("/api/login", controllers.Login)

	r.GET(
    "/api/employees",
    middleware.AuthMiddleware(),
    controllers.GetEmployees,
	)

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "API Running",
		})
	})

	r.POST(
		"/api/employees",
		middleware.AuthMiddleware(),
		controllers.CreateEmployee,
	)

	r.GET(
		"/api/employees/:id",
		middleware.AuthMiddleware(),
		controllers.GetEmployee,
	)

	r.PUT(
		"/api/employees/:id",
		middleware.AuthMiddleware(),
		controllers.UpdateEmployee,
	)

	r.DELETE(
		"/api/employees/:id",
		middleware.AuthMiddleware(),
		controllers.DeleteEmployee,
	)

	r.GET(
		"/api/dashboard",
		middleware.AuthMiddleware(),
		controllers.Dashboard,
	)


	r.Run(":8080")
}