package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/kataras/iris/v12"
	"golang.org/x/crypto/bcrypt"
	"reflect"
)

func setField(obj interface{}, name string, value interface{}) error {
	structData := reflect.ValueOf(obj).Elem()
	fieldValue := structData.FieldByName(name)

	if !fieldValue.IsValid() {
		return fmt.Errorf("No such field: %s in obj ", name)
	}

	if !fieldValue.CanSet() {
		return fmt.Errorf("Cannot set %s field value ", name)
	}

	fieldType := fieldValue.Type()
	val := reflect.ValueOf(value)

	valTypeStr := val.Type().String()
	fieldTypeStr := fieldType.String()
	if valTypeStr == "float64" && fieldTypeStr == "int" {
		val = val.Convert(fieldType)
	} else if fieldType != val.Type() {
		return errors.New("Provided value type " + valTypeStr + " didn't match obj field type " + fieldTypeStr)
	}
	fieldValue.Set(val)
	return nil
}

// SetStructByJSON 由json对象生成 struct
func SetStructByJSON(obj interface{}, mapData map[string]interface{}) error {
	for key, value := range mapData {
		if err := setField(obj, key, value); err != nil {
			fmt.Println(err.Error())
			return err
		}
	}
	return nil
}

// StrToIntMonth 字符串月份转整数月份
func StrToIntMonth(month string) int {
	var data = map[string]int{
		"January":   0,
		"February":  1,
		"March":     2,
		"April":     3,
		"May":       4,
		"June":      5,
		"July":      6,
		"August":    7,
		"September": 8,
		"October":   9,
		"November":  10,
		"December":  11,
	}
	return data[month]
}

// HashPassword 将密码加密
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return "", fmt.Errorf("could not hash password %w", err)
	}
	return string(hashedPassword), nil
}

// CheckPasswordHash 验证密码
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func Res(ctx iris.Context, code int, data iris.Map) {
	ctx.StatusCode(code)
	ctx.WriteString(ObjStr(data))
}

func ObjStr(v interface{}) string {
	str, _ := json.Marshal(v)
	return string(str)
}

func VerifyPassword(hashedPassword string, candidatePassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(candidatePassword))
}
