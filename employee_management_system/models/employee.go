package models

type Employee struct {
	ID         uint    `gorm:"primaryKey"`
	Name       string  `json:"name" binding:"required"`
	Email      string  `json:"email" binding:"required,email"`
	Department string  `json:"department" binding:"required"`
	Salary     float64 `json:"salary" binding:"required"`
}