package comment

import (
	"time"
	"wemall/golang/model"
	"wemall/golang/utils"

	"github.com/kataras/iris/v12"
)

// MOCK: Latest30Day 近30天，每天的评论数
func Latest30Day(ctx iris.Context) {
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)
	todaySec := today.Unix() //秒
	before := todaySec
	beforeDate := time.Unix(before, 0)
	strData := beforeDate.Format("2006-01-02")
	comments := make(map[string][]map[string]interface{}, 0)
	comment := map[string]interface{}{"count": 21, "createAt": strData}
	comments["comments"] = make([]map[string]interface{}, 0)
	comments["comments"] = append(comments["comments"], comment)
	utils.Res(ctx, iris.StatusOK, iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  comments,
	})
}
