package controllers

import (
	"net/http"
	"strconv"

	"employee_management_system/config"
	"employee_management_system/models"

	"github.com/gin-gonic/gin"
)

func GetEmployees(c *gin.Context) {

	var employees []models.Employee

	search := c.Query("search")

	page, _ := strconv.Atoi(
		c.DefaultQuery("page", "1"),
	)

	limit, _ := strconv.Atoi(
		c.DefaultQuery("limit", "10"),
	)

	offset := (page - 1) * limit

	query := config.DB

	if search != "" {
		query = query.Where(
			"name ILIKE ? OR department ILIKE ?",
			"%"+search+"%",
			"%"+search+"%",
		)
	}

	var total int64

	query.Model(&models.Employee{}).
	Count(&total)

	query.
		Offset(offset).
		Limit(limit).
		Find(&employees)

	c.JSON(http.StatusOK, gin.H{
		"page": page,
		"limit": limit,
		"total": total,
		"employees": employees,
	})
}

func CreateEmployee(c *gin.Context) {

	var employee models.Employee

	if err := c.ShouldBindJSON(&employee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	config.DB.Create(&employee)

	c.JSON(http.StatusCreated, employee)
}

func GetEmployee(c *gin.Context) {

	id := c.Param("id")

	var employee models.Employee

	result := config.DB.First(
		&employee,
		id,
	)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Employee not found",
		})
		return
	}

	c.JSON(http.StatusOK, employee)
}

func UpdateEmployee(c *gin.Context) {

	id := c.Param("id")

	var employee models.Employee

	if err := config.DB.First(
		&employee,
		id,
	).Error; err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": "Employee not found",
		})
		return
	}

	c.ShouldBindJSON(&employee)

	config.DB.Save(&employee)

	c.JSON(http.StatusOK, employee)
}

func DeleteEmployee(c *gin.Context) {

	id := c.Param("id")

	config.DB.Delete(
		&models.Employee{},
		id,
	)

	c.JSON(http.StatusOK, gin.H{
		"message": "Employee deleted",
	})
}