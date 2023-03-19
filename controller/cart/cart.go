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
		SendErrJSON("Wrong item Id.", ctx)
		return
	}

	cart.OpenID = ""
	if model.DB.Create(&cart).Error != nil {
		SendErrJSON("error", ctx)
		return
	}
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"id": cart.ID,
		},
	})
	return
}

