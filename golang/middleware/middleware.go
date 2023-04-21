package middleware

import (
	"fmt"
	"github.com/kataras/iris/v12"
	"strings"
	"wemall/golang/controller/common"
	"wemall/golang/model"
	"wemall/golang/utils"
)

func DeserializeUser(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var token string
	cookie, err := ctx.Request().Cookie("token")
	
	authorizationHeader := ctx.GetHeader("Authorization")
	fields := strings.Fields(authorizationHeader)

	if len(fields) != 0 && fields[0] == "Bearer" {
		token = fields[1]
	} else if err == nil {
		token = cookie.Value
	}

	if token == "" {
		SendErrJSON("not login.", ctx)
		return
	}

	sub, err := utils.ValidateToken(token, "tokenSecret")
	if err != nil {
		SendErrJSON("error.", ctx)
		return
	}

	var user model.User
	result := model.DB.First(&user, "id = ?", fmt.Sprint(sub))
	if result.Error != nil {
		SendErrJSON("token expired.", ctx)
		return
	}

	ctx.Values().Set("currentUser", user)
	ctx.Next()

}
