package utils

import (
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
	"time"
)

var httpClient = http.Client{Timeout: 30 * time.Second}

//Post http post
func Post(logID, url, param string) (string, error) {
	retryCount := 0
RETRY:
	fmt.Println("####Post: url: ", url, " param : ", param)
	request, err := http.NewRequest("POST", url, strings.NewReader(param))
	if err != nil {
		fmt.Println(err.Error())
		return "", errors.New("SERVER_INNER_ERROR")
	}
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")
	response, err := httpClient.Do(request)
	if err != nil {
		fmt.Println(err.Error())
		if strings.Contains(err.Error(), "timeout") || strings.Contains(err.Error(), "connection refused") {
			err = errors.New("REQUEST_TIME_OUT")
			//超时重试3次
			if retryCount < 3 {
				retryCount++
				time.Sleep(1 * time.Second)
				goto RETRY
			}
		}
		return "", err
	}
	defer response.Body.Close()
	result, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}
	return string(result), nil
}

//PostData http raw data
func PostData(logID string, url, param, charset string) (string, error) {
	fmt.Println(logID, "####Post: url: ", url, " param : ", param)
	request, err := http.NewRequest("POST", url, strings.NewReader(param))
	if err != nil {
		fmt.Println(logID, err.Error())
		return "", err
	}
	cst := "UTF-8"
	if charset != "" {
		cst = charset
	}
	request.Header.Set("Content-Type", "application/json;charset="+cst)
	request.Header.Set("User-Agent", "iRainService")
	response, err := httpClient.Do(request)
	if err != nil {
		fmt.Println(logID, err.Error())
		if strings.Contains(err.Error(), "timeout") {
			err = errors.New("REQUEST_TIME_OUT")
		}
		return "", err
	}
	defer response.Body.Close()
	result, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(logID, err.Error())
		return "", err
	}
	return string(result), nil
}

//PostDataBasic 基础认证http post
func PostDataBasic(logID string, url, param, charset, authInfo string) (string, error) {
	fmt.Println(logID, "####Post: url: ", url, " param : ", param)
	request, err := http.NewRequest("POST", url, strings.NewReader(param))
	if err != nil {
		fmt.Println(logID, err.Error())
		return "", err
	}
	cst := "UTF-8"
	if charset != "" {
		cst = charset
	}
	request.Header.Set("Content-Type", "application/json;charset="+cst)
	request.Header.Set("Authorization", "Basic "+authInfo)
	response, err := httpClient.Do(request)
	if err != nil {
		fmt.Println(logID, err.Error())
		if strings.Contains(err.Error(), "timeout") {
			err = errors.New("REQUEST_TIME_OUT")
		}
		return "", err
	}
	defer response.Body.Close()
	result, err := ioutil.ReadAll(response.Body)
	if err != nil {
		fmt.Println(logID, err.Error())
		return "", err
	}
	return string(result), nil
}

//Get http get
func Get(logID, url, param string) (string, error) {
	uri := url + "?" + param
	fmt.Println(logID, "url:=", uri)
	resp, err := http.Get(uri)
	if err != nil {
		fmt.Println(logID, err.Error())
		if strings.Contains(err.Error(), "timeout") {
			err = errors.New("REQUEST_TIME_OUT")
		} else {
			err = errors.New("SERVER_INNER_ERROR")
		}
		return "", err
	}

	defer resp.Body.Close()
	reply, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(logID, err.Error())
		return "", errors.New("SERVER_INNER_ERROR")
	}

	return string(reply), nil
}
