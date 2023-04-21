package category

import (
	"strconv"
	"strings"
	"unicode/utf8"
	
	"github.com/kataras/iris/v12"
	"wemall/golang/config"
	"wemall/golang/controller/common"
	"wemall/golang/model"
	"wemall/golang/utils"
)

// Save 保存分类（创建或更新）
func Save(ctx iris.Context, isEdit bool) {
	SendErrJSON := common.SendErrJSON
	// name, parentId, status, order 必须传的参数
	// remark 非必须
	minOrder := config.ServerConfig.MinOrder
	maxOrder := config.ServerConfig.MaxOrder
	var category model.Category
	err := ctx.ReadJSON(&category)
	
	if err != nil {
		SendErrJSON("Invalid parameters.", ctx)
		return
	}
	
	category.Name = strings.TrimSpace(category.Name)
	if category.Name == "" {
		SendErrJSON("Category name can't be empty.", ctx)
		return
	}
	
	if utf8.RuneCountInString(category.Name) > config.ServerConfig.MaxNameLen {
		msg := "Category name length can't exceed " + strconv.Itoa(config.ServerConfig.MaxNameLen) + "."
		SendErrJSON(msg, ctx)
		return
	}
	
	if category.Status != model.CategoryStatusOpen && category.Status != model.CategoryStatusClose {
		SendErrJSON("Status is invalid.", ctx)
		return
	}
	
	if category.Sequence < minOrder || category.Sequence > maxOrder {
		msg := "Category should between " + strconv.Itoa(minOrder) + " and " + strconv.Itoa(maxOrder) + "."
		SendErrJSON(msg, ctx)
		return
	}
	
	if category.Remark != "" && utf8.RuneCountInString(category.Remark) > config.ServerConfig.MaxRemarkLen {
		msg := "Remark length can't exceed " + strconv.Itoa(config.ServerConfig.MaxRemarkLen) + "."
		SendErrJSON(msg, ctx)
		return
	}
	
	if category.ParentID != 0 {
		var parentCate model.Category
		if err := model.DB.First(&parentCate, category.ParentID).Error; err != nil {
			SendErrJSON("Invalid category.", ctx)
			return
		}
	}
	
	var updatedCategory model.Category
	if !isEdit {
		// 创建分类
		if err := model.DB.Create(&category).Error; err != nil {
			SendErrJSON("error", ctx)
			return
		}
	} else {
		// 更新分类
		if err := model.DB.First(&updatedCategory, category.ID).Error; err == nil {
			updatedCategory.Name = category.Name
			updatedCategory.Sequence = category.Sequence
			updatedCategory.ParentID = category.ParentID
			updatedCategory.Status = category.Status
			updatedCategory.Remark = category.Remark
			if err := model.DB.Save(&updatedCategory).Error; err != nil {
				SendErrJSON("error", ctx)
				return
			}
		} else {
			SendErrJSON("Invalid category Id.", ctx)
			return
		}
	}
	
	var categoryJSON model.Category
	if isEdit {
		categoryJSON = updatedCategory
	} else {
		categoryJSON = category
	}
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"category": categoryJSON,
		},
	})
	return
}

// Create 创建分类
func Create(ctx iris.Context) {
	Save(ctx, false)
}

// Update 更新分类
func Update(ctx iris.Context) {
	Save(ctx, true)
}

// Info 获取分类信息
func Info(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	id := ctx.Params().Get("id")
	
	var category model.Category
	queryErr := model.DB.First(&category, id).Error
	
	if queryErr != nil {
		SendErrJSON("Wrong category Id.", ctx)
		return
	}
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"category": category,
		},
	})
}

// AllList 所有的分类列表
func AllList(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var categories []model.Category
	pageNo, err := strconv.Atoi(ctx.FormValue("pageNo"))
	
	if err != nil || pageNo < 1 {
		pageNo = 1
	}
	
	// 默认按创建时间，降序来排序
	var orderStr = "created_at"
	if ctx.FormValue("order") == "1" {
		// 根据id排序
		orderStr = "id"
	}
	if ctx.FormValue("asc") == "1" {
		orderStr += " asc"
	} else {
		orderStr += " desc"
	}
	
	// 去你粮的分页，尼玛的类别还分页是吧！傻逼！害老子弄半天！
	// offset := (pageNo - 1) * config.ServerConfig.PageSize
	// queryErr := model.DB.Offset(offset).Limit(config.ServerConfig.PageSize).Order(orderStr).Find(&categories).Error
	
	queryErr := model.DB.Order(orderStr).Find(&categories).Error
	
	if queryErr != nil {
		SendErrJSON("error.", ctx)
		return
	}
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"categories": categories,
		},
	})
}

// List 公开的分类列表
func List(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var categories []model.Category
	
	if model.DB.Where("status = 1").Order("sequence asc").Find(&categories).Error != nil {
		SendErrJSON("error", ctx)
		return
	}
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"categories": categories,
		},
	})
}

// UpdateStatus 开启或关闭分类
func UpdateStatus(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var category model.Category
	err := ctx.ReadJSON(&category)
	
	if err != nil {
		SendErrJSON("Invalid Id or status.", ctx)
		return
	}
	
	id := category.ID
	status := category.Status
	
	if status != model.CategoryStatusOpen && status != model.CategoryStatusClose {
		SendErrJSON("Invalid status.", ctx)
		return
	}
	
	var cate model.Category
	dbErr := model.DB.First(&cate, id).Error
	
	if dbErr != nil {
		SendErrJSON("Invalid Id.", ctx)
		return
	}
	
	cate.Status = status
	
	saveErr := model.DB.Save(&cate).Error
	if saveErr != nil {
		SendErrJSON("Filter status refresh faild.", ctx)
		return
	}
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"id":     id,
			"status": status,
		},
	})
}

func GetProductsByCategory(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	
	// Get categoryID
	categoryIDStr := ctx.URLParam("categoryId")
	if categoryIDStr == "" {
		SendErrJSON("Missing category ID", ctx)
		return
	}
	
	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		SendErrJSON("Invalid category ID", ctx)
		return
	}
	
	// Check if the category is a top-level category or a subcategory
	var requestedCategory model.Category
	queryErr := model.DB.Where("id = ?", categoryID).First(&requestedCategory).Error
	if queryErr != nil {
		SendErrJSON("Error while fetching category.", ctx)
		return
	}
	
	// Fetch the category sequence for the products
	categorySequence := make([]model.Category, 0)
	
	// If it's a top-level category, add it to the categorySequence
	if requestedCategory.ParentID == 0 {
		categorySequence = append(categorySequence, requestedCategory)
	} else { // If it's a subcategory, fetch its parent category and add both to the categorySequence
		var parentCategory model.Category
		queryErr = model.DB.Where("id = ?", requestedCategory.ParentID).First(&parentCategory).Error
		if queryErr != nil {
			SendErrJSON("Error while fetching parent category.", ctx)
			return
		}
		categorySequence = append(categorySequence, parentCategory, requestedCategory)
	}
	
	// Pagination logic
	pageNo, err := strconv.Atoi(ctx.URLParamDefault("pageNo", "1"))
	if err != nil || pageNo < 1 {
		pageNo = 1
	}
	offset := (pageNo - 1) * config.ServerConfig.PageSize
	all, _ := strconv.ParseBool(ctx.URLParamDefault("all", "true"))
	
	var products []model.Product
	
	if requestedCategory.ParentID == 0 { // Top-level category
		// Find all subcategories belonging to the top category
		var subCategories []model.Category
		queryErr = model.DB.Where("parent_id = ?", categoryID).Find(&subCategories).Error
		if queryErr != nil {
			SendErrJSON("Error while fetching subcategories.", ctx)
			return
		}
		
		// Get all subcategory IDs
		var subCategoryIDs []int
		for _, subCategory := range subCategories {
			subCategoryIDs = append(subCategoryIDs, int(subCategory.ID))
		}
		// Find all products related to the subcategories with pagination
		if all {
			queryErr = model.DB.Where("category_id IN (?)", subCategoryIDs).Find(&products).Error
		} else {
			queryErr = model.DB.Where("category_id IN (?)", subCategoryIDs).Offset(offset).Limit(config.ServerConfig.PageSize).Find(&products).Error
		}
		if queryErr != nil {
			SendErrJSON("Error while fetching products.", ctx)
			return
		}
	} else { // Subcategory
		// Find all products related to the subcategory with pagination
		if all {
			queryErr = model.DB.Where("category_id = ?", categoryID).Find(&products).Error
		} else {
			queryErr = model.DB.Where("category_id = ?", categoryID).Offset(offset).Limit(config.ServerConfig.PageSize).Find(&products).Error
		}
		if queryErr != nil {
			SendErrJSON("Error while fetching products.", ctx)
			return
		}
	}
	
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"products":         products,
			"categorySequence": categorySequence,
		},
	})
}
