package model

import "time"

// Cart 购物车
type Cart struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	OpenID    string     `json:"openId"`
	ProductID uint       `json:"productId"`
	Count     int        `json:"count"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `sql:"index" json:"deletedAt"`
	OrderID   uint       `json:"orderId"`
}

// CartInfo 购物车
type CartInfo struct {
	ID          uint       `gorm:"primary_key" json:"id"`
	OpenID      string     `json:"openId"`
	ProductID   uint       `json:"productId"`
	ProductInfo Product    `json:"productInfo"`
	Count       int        `json:"count"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
	DeletedAt   *time.Time `sql:"index" json:"deletedAt"`
	OrderID     uint       `json:"orderId"`
}
