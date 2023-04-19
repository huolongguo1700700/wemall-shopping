package model

import "time"

// Cart 购物车
type Cart struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	SortID   uint       `json:"sortId"`
	OpenID    string     `json:"openId"`
	ProductID uint       `json:"productId"`
	Count     int        `json:"count"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `sql:"index" json:"deletedAt"`
	UserID    uint       `json:"userId"`
	DeleteFlag uint
	OrderID    uint
}

// CartInfo 购物车
type CartInfo struct {
	ID          uint       `gorm:"primary_key" json:"id"`
	SortID      string     `json:"sortId"`
	ProductID   uint       `json:"productId"`
	ProductInfo Product    `json:"productInfo"`
	Count       int        `json:"count"`
	CreatedAt   time.Time  `json:"createdAt"`
	UpdatedAt   time.Time  `json:"updatedAt"`
	DeletedAt   *time.Time `sql:"index" json:"deletedAt"`
	UserID      uint       `json:"userId"`
}

type GroupedCartInfo struct {
	SortID   uint       `json:"sortId"`
	CartItems []CartInfo `json:"cartItems"`
}
