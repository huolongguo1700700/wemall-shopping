package order

import (
	"math"
	"strconv"
	"time"
	
	"github.com/kataras/iris/v12"
	"wemall/golang/controller/common"
	"wemall/golang/model"
	"wemall/golang/utils"
)

// TodayCount 今日总订单数
func TodayCount(ctx iris.Context) {
	var order model.Order
	now := time.Now()
	count := order.CountByDate(now)
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"count": count,
		},
	})
}

// TodaySale 今日总销售额
func TodaySale(ctx iris.Context) {
	var order model.Order
	now := time.Now()
	sale := order.TotalSaleByDate(now)
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"sale": sale,
		},
	})
}

// TotalCount 总订单数
func TotalCount(ctx iris.Context) {
	var order model.Order
	total := order.Total()
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"count": total,
		},
	})
}

// TotalSale 总销售额
func TotalSale(ctx iris.Context) {
	var order model.Order
	sale := order.TotalSale()
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"sale": sale,
		},
	})
}

// Latest30Day 近30天，每天的订单数
func Latest30Day(ctx iris.Context) {
	var orders model.OrderPerDay
	result := orders.Latest30Day()
	var data iris.Map
	if result == nil {
		data = iris.Map{
			"orders": [0]int{},
		}
	} else {
		data = iris.Map{
			"orders": result,
		}
	}
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  data,
	})
}

// AmountLatest30Day 近30天，每天的销售额
func AmountLatest30Day(ctx iris.Context) {
	var amount model.AmountPerDay
	result := amount.AmountLatest30Day()
	var data iris.Map
	if result == nil {
		data = iris.Map{
			"amounts": [0]int{},
		}
	} else {
		data = iris.Map{
			"amounts": result,
		}
	}
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  data,
	})
}

// Analyze 订单分析
func Analyze(ctx iris.Context) {
	now := time.Now()
	nowSec := now.Unix()
	yesterdaySec := nowSec - 24*60*60
	yesterday := time.Unix(yesterdaySec, 0)
	
	var order model.Order
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"todayOrderCount":     order.CountByDate(now),
			"yesterdayOrderCount": order.CountByDate(yesterday),
			"todayTotalSale":      order.TotalSaleByDate(now),
			"yesterdayTotalSale":  order.TotalSaleByDate(yesterday),
		},
	})
}

func Checkout(ctx iris.Context) {
	now := time.Now()
	SendErrJSON := common.SendErrJSON
	var createdOrder model.CreatedOrder
	
	if err := ctx.ReadJSON(&createdOrder); err != nil {
		SendErrJSON("Invalid parameters.", ctx)
		return
	}
	
	// Check if the user ID exists
	var user model.User
	if model.DB.First(&user, createdOrder.UserId).Error != nil {
		SendErrJSON("Invalid user ID.", ctx)
		return
	}
	
	var totalPrice float64
	
	// if model.DB.Where("user_id = ?", createdOrder.UserId).Where("delete_flag = 0").Order("order_id asc").Find(&carts).Error != nil {
	// 	SendErrJSON("error", ctx)
	// 	return
	// }
	
	for _, cart := range createdOrder.Carts {
		var product model.Product
		if model.DB.First(&product, cart.ProductID).Error != nil {
			SendErrJSON("Wrong product ID.", ctx)
			return
		}
		
		totalPrice = math.Round((totalPrice+product.Price*float64(cart.Count))*100) / 100
	}
	
	newOrder := model.Order{
		CreatedAt:    now,
		UpdatedAt:    now,
		UserID:       createdOrder.UserId,
		TotalPrice:   totalPrice,
		Payment:      totalPrice,
		DeliverStart: time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		DeliverEnd:   time.Date(2000, 1, 1, 0, 0, 0, 0, time.UTC),
		PayAt:        now,
	}
	
	if model.DB.Create(&newOrder).Error != nil {
		SendErrJSON("Create orders error", ctx)
		return
	}
	
	for _, cart := range createdOrder.Carts {
		cart.OrderID = newOrder.ID
		if model.DB.Create(&cart).Error != nil {
			SendErrJSON("Create order error", ctx)
			return
		}
	}
	
	// // Retrieve the created order using the getOrders function
	// orders, err := getOrders("", newOrder.ID)
	// if err != nil {
	// 	SendErrJSON("Error in getting orders", ctx)
	// 	return
	// }
	//
	// if len(orders) == 0 {
	// 	SendErrJSON("Order not found", ctx)
	// 	return
	// }
	//
	// // Generate the order data using the generateOrderInfo function
	// orderList, err := generateOrderInfo(orders)
	// if err != nil {
	// 	SendErrJSON("Error in generating order data", ctx)
	// 	return
	// }
	//
	// if len(orderList) == 0 {
	// 	SendErrJSON("Order data not found", ctx)
	// 	return
	// }
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"id": newOrder.ID,
		},
	})
	return
}

func ListByUser(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	
	userId := ctx.Params().Get("userId")
	
	orders, err := getOrders(userId, 0)
	if err != nil {
		SendErrJSON("Error in getting orders", ctx)
		return
	}
	
	orderList, err := generateOrderInfo(orders)
	if err != nil {
		SendErrJSON("Error in generating order info", ctx)
		return
	}
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"orders": orderList,
		},
	})
	return
}

func ListByOrder(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	
	orderID, err := strconv.ParseUint(ctx.Params().Get("orderId"), 10, 64)
	if err != nil {
		SendErrJSON("Invalid order ID.", ctx)
		return
	}
	
	orders, err := getOrders("", uint(orderID))
	if err != nil {
		SendErrJSON("Error in getting orders", ctx)
		return
	}
	
	if len(orders) == 0 {
		SendErrJSON("Order not found", ctx)
		return
	}
	
	orderList, err := generateOrderInfo(orders)
	if err != nil {
		SendErrJSON("Error in generating order info", ctx)
		return
	}
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  orderList[0],
	})
	return
}

func DeleteOrder(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	
	orderIDStr := ctx.Params().Get("orderId")
	orderID, err := strconv.ParseUint(orderIDStr, 10, 64)
	
	if err != nil {
		SendErrJSON("Invalid order ID.", ctx)
		return
	}
	
	var order model.Order
	if err := model.DB.First(&order, orderID).Error; err != nil {
		SendErrJSON("DELETE: Order not found.", ctx)
		return
	}
	
	// 将订单中的购物车项的 delete_flag 设置为 1
	model.DB.Model(&model.Order{}).Where("id = ?", orderID).Update("delete_flag", 1)
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"id": orderID,
		},
	})
}

func getOrders(userID string, orderID uint) ([]model.Order, error) {
	var orders []model.Order
	
	if userID != "" {
		if err := model.DB.Where("user_id = ?", userID).Order("delete_flag ASC, id ASC").Find(&orders).Error; err != nil {
			return nil, err
		}
	} else if orderID != 0 {
		if err := model.DB.Where("id = ?", orderID).Find(&orders).Error; err != nil {
			return nil, err
		}
	}
	
	return orders, nil
}

func generateOrderInfo(orders []model.Order) ([]model.OrderInfo, error) {
	var orderList []model.OrderInfo
	for _, order := range orders {
		var carts []model.Cart
		if err := model.DB.Where("order_id = ?", order.ID).Order("id ASC").Find(&carts).Error; err != nil {
			return nil, err
		}
		
		var products []model.OrderProductInfo
		for _, cart := range carts {
			var product model.Product
			if err := model.DB.Preload("Image").Where("id = ?", cart.ProductID).Find(&product).Error; err != nil {
				return nil, err
			}
			
			productInfo := model.OrderProductInfo{
				ProductID:    cart.ProductID,
				ProductName:  product.Name,
				ProductPrice: product.Price,
				ProductImage: product.Image,
				CategoryID:   product.CategoryID,
			}
			products = append(products, productInfo)
		}
		
		orderData := model.OrderInfo{
			OrderID:    order.ID,
			TotalPrice: order.TotalPrice,
			Products:   products,
		}
		orderList = append(orderList, orderData)
	}
	
	return orderList, nil
}
