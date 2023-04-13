package main

import (
	"fmt"
	"os"
	"strconv"
	
	"github.com/go-redis/redis"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"
	"github.com/kataras/iris/v12/sessions"
	"github.com/rs/cors"
	"wemall/config"
	"wemall/model"
	"wemall/route"
)

func init() {
	var (
		cookieNameForSessionID = "mycookiesessionnameid"
		sess                   = sessions.New(sessions.Config{Cookie: cookieNameForSessionID})
	)
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(-1)
	}
	
	if config.DBConfig.SQLLog {
		db.LogMode(true)
	}
	
	db.DB().SetMaxIdleConns(config.DBConfig.MaxIdleConns)
	db.DB().SetMaxOpenConns(config.DBConfig.MaxOpenConns)
	
	model.DB = db
	config.Sess = sess
	
	config.Rdb = redis.NewClient(&redis.Options{
		Addr:     config.ServerConfig.RedisHost,
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	_, err = config.Rdb.Ping().Result()
	if err != nil {
		fmt.Println(err)
	}
}

func Cors(ctx iris.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	if ctx.Method() == "OPTIONS" {
		ctx.Header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS")
		ctx.Header("Access-Control-Allow-Headers", "Content-Type,Accept,Authorization")
		ctx.StatusCode(204)
		return
	}
	ctx.Next()
}

func main() {
	app := iris.New()
	
	// app.Use(Cors) 这行是原来用的Cors
	// 我加进来的部分，换成原来的会报错：blocked by CORS policy
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})
	app.WrapRouter(c.ServeHTTP)
	
	// 下面的是没用变化的
	app.Use(recover.New())
	app.Use(logger.New())
	
	route.Route(app)
	
	app.Listen(":" + strconv.Itoa(config.ServerConfig.Port))
}
