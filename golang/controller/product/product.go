package product

import (
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"

	"wemall/golang/config"
	"wemall/golang/controller/common"
	"wemall/golang/model"
	"wemall/golang/utils"

	"github.com/kataras/iris/v12"
)

// List 商品列表
func List(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var products []model.Product
	pageNo, err := strconv.Atoi(ctx.FormValue("pageNo"))

	if err != nil || pageNo < 1 {
		pageNo = 1
	}

	offset := (pageNo - 1) * config.ServerConfig.PageSize

	// 默认按创建时间，降序来排序
	var orderStr = "created_at"
	if ctx.FormValue("order") == "1" {
		orderStr = "total_sale"
	} else if ctx.FormValue("order") == "2" {
		orderStr = "created_at"
	}
	if ctx.FormValue("asc") == "1" {
		orderStr += " asc"
	} else {
		orderStr += " desc"
	}

	cateID, err := strconv.Atoi(ctx.FormValue("cateId"))

	if err != nil {
		fmt.Println(err.Error())
		SendErrJSON("Invalid category Id.", ctx)
		return
	}

	var category model.Category

	if model.DB.First(&category, cateID).Error != nil {
		SendErrJSON("Invalid category Id.", ctx)
		return
	}

	pageSize := config.ServerConfig.PageSize
	queryErr := model.DB.Offset(offset).Limit(pageSize).Order(orderStr).Find(&products).Error

	if queryErr != nil {
		SendErrJSON("error", ctx)
		return
	}

	for i := 0; i < len(products); i++ {
		err := model.DB.First(&products[i].Image, products[i].ImageID).Error
		if err != nil {
			fmt.Println(err.Error())
			SendErrJSON("error", ctx)
			return
		}
	}

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"products": products,
		},
	})
}

// AdminList 商品列表，后台管理提供的接口
func AdminList(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var products []model.Product
	pageNo, err := strconv.Atoi(ctx.FormValue("pageNo"))

	if err != nil || pageNo < 1 {
		pageNo = 1
	}

	offset := (pageNo - 1) * config.ServerConfig.PageSize

	// 默认按创建时间，降序来排序
	var orderStr = "created_at"
	if ctx.FormValue("order") == "1" {
		orderStr = "total_sale"
	} else if ctx.FormValue("order") == "2" {
		orderStr = "created_at"
	} else if ctx.FormValue("order") == "3" {
		// 根据id排序
		orderStr = "id"
	}

	if ctx.FormValue("asc") == "1" {
		orderStr += " asc"
	} else {
		orderStr += " desc"
	}

	all, _ := strconv.ParseBool(ctx.URLParamDefault("all", "false"))

	if all {
		queryErr := model.DB.Order(orderStr).Find(&products).Error

		if queryErr != nil {
			SendErrJSON("error.", ctx)
			return
		}
	} else {
		queryErr := model.DB.Offset(offset).Limit(config.ServerConfig.PageSize).Order(orderStr).Find(&products).Error

		if queryErr != nil {
			SendErrJSON("error.", ctx)
			return
		}
	}

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"products": products,
		},
	})
}

func save(ctx iris.Context, isEdit bool) {
	SendErrJSON := common.SendErrJSON
	var product model.Product

	if err := ctx.ReadJSON(&product); err != nil {
		fmt.Println(err.Error())
		SendErrJSON("Invalid parameters.", ctx)
		return
	}

	var queryProduct model.Product
	if isEdit {
		if model.DB.First(&queryProduct, product.ID).Error != nil {
			SendErrJSON("Invalid product Id.", ctx)
			return
		}
	}

	if isEdit {
		product.BrowseCount = queryProduct.BrowseCount
		product.BuyCount = queryProduct.BuyCount
		product.TotalSale = queryProduct.TotalSale
		product.CreatedAt = queryProduct.CreatedAt
		product.UpdatedAt = time.Now()
	} else {
		product.BrowseCount = 0
		product.BuyCount = 0
		product.TotalSale = 0
		if product.Status != model.ProductUpShelf && product.Status != model.ProductDownShelf && product.Status != model.ProductPending {
			product.Status = model.ProductPending
		}
		product.CategoryID = queryProduct.CategoryID
	}

	product.Name = strings.TrimSpace(product.Name)
	product.Detail = strings.TrimSpace(product.Detail)
	product.Remark = strings.TrimSpace(product.Remark)

	if product.Name == "" {
		SendErrJSON("Product name can't be empty", ctx)
		return
	}

	if utf8.RuneCountInString(product.Name) > config.ServerConfig.MaxNameLen {
		msg := "Category name length can't exceed " + strconv.Itoa(config.ServerConfig.MaxNameLen) + "."
		SendErrJSON(msg, ctx)
		return
	}

	if isEdit && product.Status != model.ProductUpShelf && product.Status != model.ProductDownShelf && product.Status != model.ProductPending {
		SendErrJSON("Inavlid status.", ctx)
		return
	}

	if product.ImageID <= 0 {
		SendErrJSON("Invalid images Id.", ctx)
		return
	}

	if product.Remark != "" && utf8.RuneCountInString(product.Remark) > config.ServerConfig.MaxRemarkLen {
		msg := "Remark length can't exceed " + strconv.Itoa(config.ServerConfig.MaxRemarkLen) + "."
		SendErrJSON(msg, ctx)
		return
	}

	if product.Detail == "" || utf8.RuneCountInString(product.Detail) <= 0 {
		SendErrJSON("Product detail can't be empty.", ctx)
		return
	}

	if utf8.RuneCountInString(product.Detail) > config.ServerConfig.MaxContentLen {
		msg := "Prodcut detail can't exceed " + strconv.Itoa(config.ServerConfig.MaxContentLen) + "."
		SendErrJSON(msg, ctx)
		return
	}

	if product.Categories == nil || len(product.Categories) <= 0 {
		product.CategoryID = queryProduct.CategoryID
	} else {
		product.CategoryID = int(product.Categories[0].ID)
	}

	// if len(product.Categories) > config.ServerConfig.MaxProductCateCount {
	// 	msg := "Maximum product categories number should be " + strconv.Itoa(config.ServerConfig.MaxProductCateCount) + "."
	// 	SendErrJSON(msg, ctx)
	// 	return
	// }

	if product.Price < 0 {
		SendErrJSON("Invalid product selling price.", ctx)
		return
	}

	if product.OriginalPrice < 0 {
		SendErrJSON("Invalid original product.", ctx)
		return
	}

	var images []uint
	if err := json.Unmarshal([]byte(product.ImageIDs), &images); err != nil {
		SendErrJSON("Invlid product images.", ctx)
		return
	}

	if images == nil || len(images) <= 0 {
		SendErrJSON("Product images can't be empty.", ctx)
		return
	}

	if len(images) > config.ServerConfig.MaxProductImgCount {
		msg := "Product images can't exceed " + strconv.Itoa(config.ServerConfig.MaxProductImgCount) + "."
		SendErrJSON(msg, ctx)
		return
	}

	// for i := 0; i < len(product.Categories); i++ {
	// 	var category model.Category
	// 	queryErr := model.DB.First(&category, product.Categories[i].ID).Error
	// 	if queryErr != nil {
	// 		SendErrJSON("Invalid category Id.", ctx)
	// 		return
	// 	}
	// 	product.Categories[i] = category
	// }

	if isEdit {
		var sql = "DELETE FROM product_category WHERE product_id = ?"
		err := model.DB.Exec(sql, product.ID).Error
		if err != nil {
			SendErrJSON(fmt.Sprintf("db err: %s, product_id: %v", err.Error(), product.ID), ctx)
			return
		}
		err = model.DB.Save(&product).Error
		if err != nil {
			SendErrJSON(fmt.Sprintf("db err: %s, product_id: %v", err.Error(), product.ID), ctx)
			return
		}
	} else {
		err := model.DB.Create(&product).Error
		if err != nil {
			SendErrJSON(fmt.Sprintf("db err: %s, product_id: %v", err.Error(), product.ID), ctx)
			return
		}
	}

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  product,
	})
}

// Create 创建产品
func Create(ctx iris.Context) {
	save(ctx, false)
}

// Update 更新产品
func Update(ctx iris.Context) {
	save(ctx, true)
}

// Info 获取商品信息
func Info(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	reqStartTime := time.Now()
	id := ctx.Params().Get("id")
	var product model.Product

	if model.DB.First(&product, id).Error != nil {
		SendErrJSON("Wrong product Id.", ctx)
		return
	}

	// Fetch main image
	if model.DB.First(&product.Image, product.ImageID).Error != nil {
		product.Image = model.Image{}
	}

	// Initialize product.Images with main image
	if product.Image.ID != 0 {
		product.Images = []model.Image{product.Image}
	} else {
		product.Images = []model.Image{}
	}

	// Fetch additional images from product.ImageIDs
	var imageIDs []uint
	if err := json.Unmarshal([]byte(product.ImageIDs), &imageIDs); err == nil && len(imageIDs) > 0 {
		var images []model.Image
		if model.DB.Where("id in (?)", imageIDs).Find(&images).Error == nil {
			// Append additional images to the product.Images slice
			product.Images = append(product.Images, images...)
		}
	}

	// Fetch main image
	/*if model.DB.First(&product.Image, product.ImageID).Error != nil {
		product.Image = model.Image{}
	}*/

	/*var imagesSQL []uint
	if err := json.Unmarshal([]byte(product.ImageIDs), &imagesSQL); err == nil {
		var images []model.Image
		if model.DB.Where("id in (?)", imagesSQL).Find(&images).Error != nil {
			product.Images = nil
		} else {
			product.Images = images
		}
	} else {
		product.Images = nil
	}*/

	if err := model.DB.Model(&product).Related(&product.Categories, "categories").Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("error", ctx)
		return
	}

	// if product.HasProperty {
	// 	if err := model.DB.Model(&product).Related(&product.Properties).Error; err != nil {
	// 		fmt.Println(err.Error())
	// 		SendErrJSON("error", ctx)
	// 		return
	// 	}

	// 	for i := 0; i < len(product.Properties); i++ {
	// 		property := product.Properties[i]
	// 		if err := model.DB.Model(&property).Related(&property.PropertyValues).Error; err != nil {
	// 			fmt.Println(err.Error())
	// 			SendErrJSON("error", ctx)
	// 			return
	// 		}
	// 		product.Properties[i] = property
	// 	}

	// 	if err := model.DB.Model(&product).Related(&product.Inventories).Error; err != nil {
	// 		fmt.Println(err.Error())
	// 		SendErrJSON("error", ctx)
	// 		return
	// 	}

	// 	for i := 0; i < len(product.Inventories); i++ {
	// 		inventory := product.Inventories[i]
	// 		if err := model.DB.Model(&inventory).Related(&inventory.PropertyValues, "property_values").Error; err != nil {
	// 			fmt.Println(err.Error())
	// 			SendErrJSON("error", ctx)
	// 			return
	// 		}
	// 		product.Inventories[i] = inventory
	// 	}
	// }

	fmt.Println("duration: ", time.Now().Sub(reqStartTime).Seconds())
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"product": product,
		},
	})
}

// UpdateStatus 更新产品状态
func UpdateStatus(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var tmpProduct model.Product
	tmpErr := ctx.ReadJSON(&tmpProduct)

	if tmpErr != nil {
		SendErrJSON("Invalid Id or status.", ctx)
		return
	}

	productID := tmpProduct.ID
	status := tmpProduct.Status

	var product model.Product
	if err := model.DB.First(&product, productID).Error; err != nil {
		SendErrJSON("Invlaid product Id.", ctx)
		return
	}

	if status != model.ProductDownShelf && status != model.ProductUpShelf && status != model.ProductPending {
		SendErrJSON("Invlid product status.", ctx)
		return
	}

	product.Status = status

	if err := model.DB.Save(&product).Error; err != nil {
		SendErrJSON("error.", ctx)
		return
	}

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"id":     product.ID,
			"status": product.Status,
		},
	})
}

// UpdateHasProperty 更新是否含有商品属性
func UpdateHasProperty(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	type Data struct {
		ProductID   uint `json:"productID"`
		HasProperty bool `json:"hasProperty"`
	}
	var data Data
	if err := ctx.ReadJSON(&data); err != nil {
		SendErrJSON("Invalid parameters.", ctx)
		return
	}

	var product model.Product
	if err := model.DB.First(&product, data.ProductID).Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("Wrong product Id.", ctx)
		return
	}

	// if (data.HasProperty && !product.HasProperty) || (!data.HasProperty && product.HasProperty) {
	// 	tx := model.DB.Begin()
	// 	var sql = "DELETE FROM properties WHERE product_id = ?"
	// 	if err := tx.Exec(sql, product.ID).Error; err != nil {
	// 		tx.Rollback()
	// 		SendErrJSON("error", ctx)
	// 		return
	// 	}

	// 	sql = "DELETE FROM inventories WHERE product_id = ?"
	// 	if err := tx.Exec(sql, product.ID).Error; err != nil {
	// 		tx.Rollback()
	// 		SendErrJSON("error", ctx)
	// 		return
	// 	}

	// 	product.HasProperty = data.HasProperty
	// 	product.TotalInventory = 0
	// 	if err := model.DB.Save(&product).Error; err != nil {
	// 		tx.Rollback()
	// 		SendErrJSON("error", ctx)
	// 		return
	// 	}
	// 	tx.Commit()
	// }

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  iris.Map{},
	})
}

// UpdateTotalInventory 更新商品总库存(没有商品属性时才会调此接口)
func UpdateTotalInventory(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	type Data struct {
		ProductID      uint `json:"productID"`
		TotalInventory uint `json:"totalInventory"`
	}
	var data Data
	if err := ctx.ReadJSON(&data); err != nil {
		SendErrJSON("Invalid parameter.", ctx)
		return
	}

	var product model.Product
	if err := model.DB.First(&product, data.ProductID).Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("Wrong product Id.", ctx)
		return
	}

	// if product.HasProperty {
	// 	SendErrJSON("Product has added property.", ctx)
	// 	return
	// }

	product.TotalInventory = data.TotalInventory

	if err := model.DB.Save(&product).Error; err != nil {
		SendErrJSON("error", ctx)
		return
	}

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  iris.Map{},
	})
}
