package common

import (
	"github.com/kataras/iris/v12"
	"wemall/golang/model"
	"wemall/golang/utils"
)

// SendErrJSON 有错误发生时，发送错误JSON
func SendErrJSON(msg string, ctx iris.Context) {
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.ERROR,
		"msg"   : msg,
		"data"  : iris.Map{},
	})
}