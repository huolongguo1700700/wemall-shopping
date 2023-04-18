package order

import (
	"github.com/kataras/iris/v12"
	"time"
	"wemall/model"
	"wemall/utils"
	"wemall/controller/common"
)

// TodayCount 今日总订单数
func TodayCount(ctx iris.Context) {
	var order model.Order;
	now   := time.Now()
	count := order.CountByDate(now)

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"count": count,
		},
	})
}

// TodaySale 今日总销售额
func TodaySale(ctx iris.Context) {
	var order model.Order;
	now   := time.Now()
	sale  := order.TotalSaleByDate(now)

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"sale": sale,
		},
	})
}

// TotalCount 总订单数
func TotalCount(ctx iris.Context) {
	var order model.Order;
	total  := order.Total()

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"count": total,
		},
	})
}

// TotalSale 总销售额
func TotalSale(ctx iris.Context) {
	var order model.Order;
	sale  := order.TotalSale()

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"sale": sale,
		},
	})
}

// Latest30Day 近30天，每天的订单数
func Latest30Day(ctx iris.Context) {
	var orders model.OrderPerDay;
	result := orders.Latest30Day()
	var data iris.Map;
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
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}

// AmountLatest30Day 近30天，每天的销售额
func AmountLatest30Day(ctx iris.Context) {
	var amount model.AmountPerDay;
	result := amount.AmountLatest30Day()
	var data iris.Map;
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
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}

// Analyze 订单分析
func Analyze(ctx iris.Context) {
	now            := time.Now()
	nowSec         := now.Unix()
	yesterdaySec   := nowSec - 24 * 60 * 60
	yesterday      := time.Unix(yesterdaySec, 0)

	var order model.Order

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"todayOrderCount"     : order.CountByDate(now),
			"yesterdayOrderCount" : order.CountByDate(yesterday),
			"todayTotalSale"      : order.TotalSaleByDate(now),
			"yesterdayTotalSale"  : order.TotalSaleByDate(yesterday),
		},
	})
}

func Checkout(ctx iris.Context){
	now := time.Now()
	SendErrJSON := common.SendErrJSON
	var createdOrder model.CreatedOrder

	if err := ctx.ReadJSON(&createdOrder); err != nil {
		SendErrJSON("Invalid parameters.", ctx)
		return
	}

	var totalPrice float64

	for _, cart := range createdOrder.Carts{
		var product model.Product
		if model.DB.First(&product, cart.ProductID).Error != nil {
			SendErrJSON("wrong product id.", ctx)
			return
		}

		totalPrice = totalPrice + product.Price * float64(cart.Count)
	}

	newOrder := model.Order{
		CreatedAt: now,
		UpdatedAt: now,
		UserID: createdOrder.UserId,
		TotalPrice: totalPrice,
	}

	if model.DB.Create(newOrder).Error != nil {
		SendErrJSON("create order error", ctx)
		return
	}

	var existCarts []model.Cart
	if model.DB.Where("user_id = ?", createdOrder.UserId).Where("delete_flag = 0").Find(&existCarts).Error != nil {
		SendErrJSON("find carts  by userId error", ctx)
		return
	}

	for _, cart := range existCarts {
		cart.DeleteFlag = 1
		if model.DB.Save(cart).Error != nil {
			SendErrJSON("delete cart error", ctx)
			return
		}
	}
}