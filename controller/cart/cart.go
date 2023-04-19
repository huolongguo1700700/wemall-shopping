package cart

import (
	"sort"
	"time"
	
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
		SendErrJSON("Wrong user Id.", ctx)
		return
	}
	
	now := time.Now()

	var lastCart model.Cart
	if err := model.DB.Where("user_id = ?", cart.UserID).Where("delete_flag = 0").Order("sort_id desc").First(&lastCart).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			cart.SortID = 1
			newOrder := model.Order{
				CreatedAt: now,
				UpdatedAt: now,
				UserID: cart.UserID,
				TotalPrice: product.Price * float64(cart.Count),
				DeliverStart: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
				DeliverEnd: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
				PayAt: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
			}
		
			if model.DB.Create(&newOrder).Error != nil {
				SendErrJSON("create order error", ctx)
				return
			}
		} else {
			SendErrJSON("error", ctx)
			return
		}
	} else {
		cart.SortID = lastCart.SortID + 1
		var existOrder model.Order
		if model.DB.First(&existOrder, lastCart.OrderID).Error != nil {
			SendErrJSON("Wrong user Id.", ctx)
			return
		}

		existOrder.UpdatedAt = now
		existOrder.TotalPrice = existOrder.TotalPrice + product.Price * float64(cart.Count)

		if model.DB.Save(&existOrder).Error != nil {
			SendErrJSON("update order error", ctx)
			return
		}
	}
	
	cart.OpenID = ""
	cart.DeleteFlag = 0
	if model.DB.Create(&cart).Error != nil {
		SendErrJSON("create cart error", ctx)
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
	var carts []model.Cart
	
	userId := ctx.Params().Get("userId")
	
	if model.DB.Where("user_id = ?", userId).Where("delete_flag = 0").Order("sort_id asc").Find(&carts).Error != nil {
		SendErrJSON("find cart error", ctx)
		return
	}
	
	groupedCarts := make(map[uint][]model.CartInfo)
	for _, cart := range carts {
		var product model.Product
		if model.DB.First(&product, cart.ProductID).Error != nil {
			SendErrJSON("wrong product id.", ctx)
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
		
		groupedCarts[cart.SortID] = append(groupedCarts[cart.SortID], cartInfo)
	}
	
	var groupedCartList []model.GroupedCartInfo
	for sortId, cartItems := range groupedCarts {
		groupedCartList = append(groupedCartList, model.GroupedCartInfo{
			SortID:  sortId,
			CartItems: cartItems,
		})
	}
	
	// sort by id
	sort.SliceStable(groupedCartList, func(i, j int) bool {
		return groupedCartList[i].SortID < groupedCartList[j].SortID
	})
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  groupedCartList,
	})
	return
}