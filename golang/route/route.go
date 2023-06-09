package route

import (
	"github.com/kataras/iris/v12"
	"wemall/golang/config"
	"wemall/golang/controller/admin"
	"wemall/golang/controller/cart"
	"wemall/golang/controller/category"
	"wemall/golang/controller/comment"
	"wemall/golang/controller/common"
	"wemall/golang/controller/order"
	"wemall/golang/controller/product"
	"wemall/golang/controller/ueditor"
	"wemall/golang/controller/user"
	"wemall/golang/controller/visit"
	"wemall/golang/middleware"
)

func Route(app *iris.Application) {
	apiPrefix := config.APIConfig.Prefix
	
	router := app.Party(apiPrefix)
	{
		router.Get("/weAppLogin", user.WeAppLogin)
		router.Post("/setWeAppUser", user.SetWeAppUserInfo)
		/* Register login logout */
		router.Post("/register", user.SignUpUser)
		router.Post("/login", user.SignInUser)
		router.Get("/logout", middleware.DeserializeUser, user.LogoutUser)
		router.Post("/checkout", order.Checkout)
		router.Get("/delete-order/:orderId", order.DeleteOrder)
		router.Get("/orders/:userId", order.ListByUser)
		router.Get("/order/:orderId", order.ListByOrder)
		
		router.Get("/categories", category.List)
		router.Get("/products", product.List)
		router.Get("/product/:id", product.Info)
		// router.Get("/cart", cart.List)
		router.Post("/cart/create", cart.Create)
		router.Get("/cart/list/:userId", cart.List)
		router.Get("/visit", visit.PV)
		router.Get("/ueditor", ueditor.Handler)
		router.Post("/ueditor", ueditor.Handler)
	}
	
	adminRouter := app.Party(apiPrefix+"/admin", admin.Authentication)
	{
		adminRouter.Get("/categories", category.AllList)
		adminRouter.Get("/category/:id", category.Info)
		adminRouter.Post("/category/create", category.Create)
		adminRouter.Post("/category/update", category.Update)
		adminRouter.Post("/category/status/update", category.UpdateStatus)
		
		adminRouter.Get("/products", product.AdminList)
		adminRouter.Get("/product/:id", product.Info)
		adminRouter.Post("/product/create", product.Create)
		adminRouter.Post("/product/update", product.Update)
		adminRouter.Post("/product/status/update", product.UpdateStatus)
		adminRouter.Post("/product/property/saveval", product.AddPropertyValue)
		adminRouter.Post("/product/property/create", product.AddProperty)
		adminRouter.Post("/product/property/flag", product.UpdateHasProperty)
		adminRouter.Post("/product/inventory/save", product.SaveInventory)
		adminRouter.Post("/product/inventory/total", product.UpdateTotalInventory)
		adminRouter.Get("/categoryProducts", category.GetProductsByCategory)
		
		adminRouter.Get("/order/analyze", order.Analyze)
		adminRouter.Get("/order/todaycount", order.TodayCount)
		adminRouter.Get("/order/totalcount", order.TotalCount)
		adminRouter.Get("/order/todaysale", order.TodaySale)
		adminRouter.Get("/order/totalsale", order.TotalSale)
		adminRouter.Get("/order/latest/30", order.Latest30Day)
		adminRouter.Get("/order/amount/latest/30", order.AmountLatest30Day)
		
		adminRouter.Get("/user/today", user.TodayRegisterUser)
		adminRouter.Get("/user/yesterday", user.YesterdayRegisterUser)
		adminRouter.Get("/user/latest/30", user.Latest30Day)
		adminRouter.Get("/user/analyze", user.Analyze)
		
		adminRouter.Post("/upload", common.Upload)
		
		adminRouter.Get("/visit/pv/latest/30", visit.Latest30Day)
		adminRouter.Get("/comment/latest/30", comment.Latest30Day)
	}
}
