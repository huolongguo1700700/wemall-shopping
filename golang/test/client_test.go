package test

import (
	"encoding/json"
	
	"testing"
	"wemall/golang/utils"
)

var Host = "127.0.0.1:8012"

type Res struct {
	Data  interface{} `json:"data"`
	ErrNo int         `json:"err_no"`
	msg   string      `json:"msg"`
}

// Test_Category ...
func Test_Category(t *testing.T) {
	data, err := utils.Get("", "/api/categories", "")
	if err != nil {
		t.Log(" api check failed")
		t.Failed()
	}
	var resData Res
	err = json.Unmarshal([]byte(data), &resData)
	if err != nil || resData.ErrNo != 0{
		t.Failed()
	}
	t.Log("success ")
}

// Test_Product ...
func Test_Product(t *testing.T) {
	data, err := utils.Get("", "/api/products?cateId=4", "")
	if err != nil {
		t.Log(" api check failed")
		t.Failed()
	}
	var resData Res
	err = json.Unmarshal([]byte(data), &resData)
	if err != nil || resData.ErrNo != 0{
		t.Failed()
	}
	t.Log("success ")
}
