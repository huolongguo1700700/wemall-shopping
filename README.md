# wemall

## 
### weixin mini app

## Project Environment Setup
* **Cloning Code**

```
$ git clone https://gitee.com/lv_right/wemall.git
``` 

* **Modification configuration.json**  
Enter wemall directory，change`configuration.dev.json`to`configuration.json`, and find`UploadImgDir`，Fill in the image upload directory as `{wemall location}/upload/img`, Example：C:\dev\src\wemall\upload\img (Windows system）或 /dev/src/wemall/upload/img (Mac OS X or Linux system)
  
```
{
  "go": {
    "UploadImgDir": "" /*Directory of image uploads*/
  }
}
```  

* **Modification config.js**  
enter `wemall/weixin/config`Catalog，change`config.dev.js`to`config.js`

* **Configuration nginx**  
Use`wemall/nginx/dev.wemall.com.conf`copy the file to the nginx virtual host directory, then`wemall/nginx/server.key`and`wemall/nginx/server.crt`copy it to a directory, then modify the nginx virtual host directory in the`dev.wemall.com.conf`in the file`server.key`and`server.crt`the path 

* **Configuration hosts**    
127.0.0.1 dev.wemall.com  
 
* **Create database**  
First create the database as`wemall`，Use wemall again, then import`wemall/sql/wemall.sql` 
>Note: In local development mode, the database is`wemall`，The users are`root`，The password is`test1234`  
>This can be done through`wemall/configuration.json`Configuration file for modification 

* **Installing node.js third-party modules**  
Enter`wemall/nodejs`directory, run the command
  
```
$ npm install
``` 

If the installation fails, or is slow, try Ali's mirror

```
$ npm install --registry=https://registry.npm.taobao.org
```

* **Start the node.js application**  
Enter`wemall/nodejs`directory, run the command

```
$ npm start
```

Open a new command line window and run the command

```
$ npm run staticServ
```

* **Run the go program**  
Enter`wemall`Catalog，change`configuration.dev.json`to`为configuration.json`, run

```
$ go run main.go
```

* **Run WeChat applet**   
Enter`wemall/weixin`Catalog，change`config.dev.js`to`为config.js`, Then by`WeChat web developer tools`to run the applet

* **Visit the website backend**  
In the browser address bar, typehttps://dev.wemall.com/admin  

## Technology Selection
### Front End
* web server: nginx
* Backend Rendering: node.js
* M-site framework set: vue, vuex, vue-router
* M-site UI component library: vux
* Backend management framework set: react, redux, react-router-redux
*Backend management UI component library: antd
* Data Visualization: echarts
* Rich Text Editor: ueditor
* Packing tools: webpack
* Build Tools: gulp  

### Backstage
* web framework: iris
* Routing: httprouter
* Persistence layer framework: gorm
* Database: mysql 

### go dependent third-party libraries

| Library| Instructions             |
|:---------|:-----------------------|
| github.com/kataras/iris/v12   | iris web framework   |
| github.com/jinzhu/gorm     | gorm Persistent Layer Framework |
| github.com/satori/go.uuid  | uuid Generate Tools    |

## Project Structure
| Directories or files | Instructions    |  
|:---------|:-------:|
| docs     |  Documentation|
| config                 |  Configuration|
| controller             |  Controller|
| model                  |  Data Model|
| utils                  |  Practical Tools|
| nginx    |  nginx configuration and credentials|
| nodejs   |  Front End Project Catalog|
| sql      |  sql file directory|
| weixin   | WeChat small program project directory |
| configuration.dev.json  | Project Profiles |
| main.go  | go main application entrance|
