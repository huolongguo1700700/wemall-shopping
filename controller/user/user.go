package user

import (
	"strings"
	"time"

	"github.com/kataras/iris/v12"
	"wemall/controller/common"
	"wemall/model"
	"wemall/utils"
)

// [...] SignUp User
func SignUpUser(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var user model.SignUpInput

	if err := ctx.ReadJSON(&user); err != nil {
		SendErrJSON("Invalid parameters.", ctx)
		return
	}

	if user.Password != user.PasswordConfirm {
		SendErrJSON("password not matched.", ctx)
		return
	}

	hashedPassword, err := utils.HashPassword(user.Password)
	if err != nil {
		SendErrJSON("error.", ctx)
		return
	}

	now := time.Now()
	newUser := model.User{
		Name:      user.Name,
		Email:     strings.ToLower(user.Email),
		Password:  hashedPassword,
		CreatedAt: now,
		UpdatedAt: now,
	}

	result := model.DB.Create(&newUser)

	if result.Error != nil && strings.Contains(result.Error.Error(), "Duplicate entry") {
		SendErrJSON("duplicate email.", ctx)
		return
	} else if result.Error != nil {
		SendErrJSON("error.", ctx)
		return
	}

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"name": newUser.Email,
		},
	})
}

// [...] SignIn User
func SignInUser(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var payload model.SignInInput

	if err := ctx.ReadJSON(&payload); err != nil {
		SendErrJSON("Invalid parameters.", ctx)
		return
	}

	var user model.User
	result := model.DB.First(&user, "email = ?", strings.ToLower(payload.Email))
	if result.Error != nil {
		SendErrJSON("invalid email or password.", ctx)
		return
	}

	if err := utils.VerifyPassword(user.Password, payload.Password); err != nil {
		SendErrJSON("invalid email or password.", ctx)
		return
	}

	// Generate Token
	token, err := utils.GenerateToken(60, user.ID, "tokenSecret")
	if err != nil {
		SendErrJSON("error.", ctx)
		return
	}

	ctx.SetCookieKV("token", token, iris.CookieHTTPOnly(false), iris.CookieExpires(60))

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"name": user.Email,
		},
	})
}

// [...] SignOut User
func LogoutUser(ctx iris.Context) {
	ctx.SetCookieKV("token", "", iris.CookieHTTPOnly(false), iris.CookieExpires(60))
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg": "success",
	})
}

func GetMe(ctx iris.Context) {
	user := ctx.Values().Get("currentUser").(model.User)

	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"id": user.ID,
			"name": user.Name,
			"email": user.Email,
			"createdAt": user.CreatedAt,
			"updatedAt": user.UpdatedAt,
		},
	})
}

