package cart

import (
	"sort"
	
	"github.com/jinzhu/gorm"
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
	
	var user model.User
	if model.DB.First(&user, cart.UserID).Error != nil {
		SendErrJSON("Wrong order Id.", ctx)
		return
	}
	
	/* 加的 */
	var lastCart model.Cart
	if err := model.DB.Where("user_id = ?", cart.UserID).Order("order_id desc").First(&lastCart).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			cart.OrderID = 1
		} else {
			SendErrJSON("error", ctx)
			return
		}
	} else {
		cart.OrderID = lastCart.OrderID + 1
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
	
	userId := ctx.Params().Get("userId")
	// cart.OpenID = openID
	// cart.OpenID = ""
	if model.DB.Find(&cart).Error != nil {
		SendErrJSON("error", ctx)
		return
	}
	
	// 加的
	if model.DB.Where("user_id = ?", userId).Order("order_id asc").Find(&cart).Error != nil {
		SendErrJSON("error", ctx)
		return
	}
	
	/*var cartList []model.CartInfo
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
			UserID:      v.UserID,
		})
	}*/
	
	groupedCarts := make(map[uint][]model.CartInfo)
	for _, cart := range cart {
		var product model.Product
		if model.DB.First(&product, cart.ProductID).Error != nil {
			SendErrJSON("错误的商品id", ctx)
			return
		}
		_ = model.DB.First(&product.Image, product.ImageID).Error
		cartInfo := model.CartInfo{
			ID:          cart.ID,
			ProductInfo: product,
			Count:       cart.Count,
			CreatedAt:   cart.CreatedAt,
			UserID:      cart.UserID,
		}
		
		groupedCarts[cart.OrderID] = append(groupedCarts[cart.OrderID], cartInfo)
	}
	
	var groupedCartList []model.GroupedCartInfo
	for orderId, cartItems := range groupedCarts {
		groupedCartList = append(groupedCartList, model.GroupedCartInfo{
			OrderID:   orderId,
			CartItems: cartItems,
		})
	}
	
	// 按照 orderId 排序分组后的购物车列表
	sort.SliceStable(groupedCartList, func(i, j int) bool {
		return groupedCartList[i].OrderID < groupedCartList[j].OrderID
	})
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  groupedCartList,
	})
	return
}
