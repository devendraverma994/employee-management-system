package controllers

import (
	"net/http"

	"employee_management_system/config"
	"employee_management_system/models"

	"github.com/gin-gonic/gin"
)

func Dashboard(c *gin.Context) {

	var total int64
	var itCount int64
	var hrCount int64

	config.DB.Model(&models.Employee{}).
		Count(&total)

	config.DB.Model(&models.Employee{}).
		Where("department = ?", "IT").
		Count(&itCount)

	config.DB.Model(&models.Employee{}).
		Where("department = ?", "HR").
		Count(&hrCount)

	c.JSON(http.StatusOK, gin.H{
		"TotalEmployees": total,
		"ITEmployees":    itCount,
		"HREmployees":    hrCount,
	})
}
