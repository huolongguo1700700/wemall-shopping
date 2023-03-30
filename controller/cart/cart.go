package cart

import (
	"github.com/kataras/iris/v12"
	"wemall/controller/common"
	"wemall/model"
	"wemall/utils"
)

// Create: add product to cart
func Create(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var cart model.Cart
	
	if ctx.ReadJSON(&cart) != nil {
		SendErrJSON("Invalid parameters.", ctx)
		return
	}
	
	if cart.Count <= 0 {
		SendErrJSON("Count can't less than 0.", ctx)
		return
	}
	
	var product model.Product
	if model.DB.First(&product, cart.ProductID).Error != nil {
		SendErrJSON("Wrong product Id.", ctx)
		return
	}
	
	var order model.Order
	if model.DB.First(&order, cart.OrderID).Error != nil {
		SendErrJSON("Wrong order Id.", ctx)
		return
	}
	
	cart.OpenID = ""
	if model.DB.Create(&cart).Error != nil {
		SendErrJSON("error", ctx)
		return
	}
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"id": cart.ID,
		},
	})
	return
}

func List(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var cart []model.Cart
	
	// cart.OpenID = openID
	// cart.OpenID = ""
	if model.DB.Find(&cart).Error != nil {
		SendErrJSON("error", ctx)
		return
	}
	var cartList []model.CartInfo
	for _, v := range cart {
		var product model.Product
		if model.DB.First(&product, v.ProductID).Error != nil {
			SendErrJSON("错误的商品id", ctx)
			return
		}
		_ = model.DB.First(&product.Image, product.ImageID).Error
		cartList = append(cartList, model.CartInfo{
			ID:          v.ID,
			OpenID:      v.OpenID,
			ProductID:   v.ProductID,
			ProductInfo: product,
			Count:       v.Count,
			CreatedAt:   v.CreatedAt,
			UpdatedAt:   v.UpdatedAt,
			DeletedAt:   v.DeletedAt,
			OrderID:     v.OrderID,
		})
	}
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  cartList,
	})
	return
}
