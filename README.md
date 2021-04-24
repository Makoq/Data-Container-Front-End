
## Project setup
```
npm install
```

## Compiles and hot-reloads for development
```
npm run serve
```

## File Structure
```
├─.env
├─.env.development
├─.env.production
├─.gitignore         //git忽略配置
├─babel.config.js    //babel转译配置
├─DevelopNote.md
├─package-lock.json
├─package.json       //依赖项
├─README.md
├─vue.config.js   //Vue配置文件，主要在前后端分离开发时的端口代理配置
├─src
|  ├─App.vue //Vue父组件
|  ├─main.js   //Vue入口文件
|  ├─router.js //路由
|  ├─views  //页面
|  |   ├─About.vue         //关于页面
|  |   ├─Cluster.vue       //所有在线节点页面
|  |   ├─FormInput.vue     //创建服务条目页面
|  |   ├─Home.vue          //首页页面
|  |   ├─Index.vue         //组件挂载根页面
|  |   ├─Instances.vue     //服务条目页面
|  |   ├─State.vue         //服务状态页面
|  |   ├─Thematic.vue      //可扩展组件专题页面（未挂载在页面）
|  |   ├─Upload.vue        //大文件上传页面
|  |   ├─WorkSpace.vue     //工作空间页面
|  |   ├─WorldNodes.vue    //所有节点地图页面
|  |   ├─user              //用户相关页面
|  |   |  ├─Login.vue      //登录页面
|  |   |  └Register.vue    //注册页面
|  ├─utils //项目中用到的一些工具方法
|  |   ├─config.js         //配置
|  |   ├─cycrypto.js       //加密解密
|  |   ├─utils.js          //其他工具方法
|  |   └websocket.js       //websocket脚本
|  ├─store
|  |   └index.js           //Vuex 入口文件
|  ├─plugins               //插件文件，基本没有用到
|  |    ├─axios.js 
|  |    └vuetify.js
|  ├─components  //组件
|  |     ├─BottomFooter.vue  //底部栏
|  |     ├─LeftMenu.vue      //左侧栏 
|  |     ├─ManagerList.vue   //管理列表
|  |     ├─NavHeader.vue     //顶部栏
|  |     └template.vue       //组件初始化模板
|  ├─assets  //图片、视频等静态资源
|  |   ├─dataServiceContainer.png
|  |   ├─dataServiceContainer3.png
|  |   ├─folder.png
|  |   ├─logo.png
|  |   ├─logo.svg
|  |   ├─processing.png
|  |   ├─programing_template.png
|  |   ├─py.jpg
|  |   ├─visualization.png
|  |   ├─xml.png
|  |   ├─zip.png
|  |   ├─video
|  |   |   └earth.mp4        //首页背景视频
|  |   ├─markdown
|  |   |    └framework.JPG
|  |   ├─css
|  |   |  └manageList.css
├─public //静态资源
|   ├─favicon.ico
|   ├─index.html
|   ├─js
|   | ├─echart
|   | |   ├─browser.js
|   | |   ├─echarts-gl.js
|   | |   ├─echarts-gl.min.js
|   | |   └echarts.min.js
|   ├─img
|   |  ├─aboutInsitu.png
|   |  ├─aboutInsitu2.jpg
|   |  ├─bk.svg
|   |  ├─bk2.webp
|   |  ├─earth.gif
|   |  ├─file.gif
|   |  ├─info.gif
|   |  ├─ogms.jpg
|   |  └visual.gif


```
## Basic Framework

 ![在这里插入图片描述](/src/assets/markdown/framework.JPG)


 ## Dependencies


 ```json
    "@vue/ui": "^0.11.4",
    "async": "^3.2.0",
    "core-js": "^2.6.5",
    "crypto-js": "^4.0.0",
    "echarts": "^4.9.0",
    "element-ui": "^2.12.0",
    "font-awesome": "^4.7.0",
    "inspector": "^0.5.0",
    "ip": "^1.1.5",
    "js-md5": "^0.7.3",
    "mapbox-gl": "^1.13.0",
    "request": "^2.88.2",
    "vue": "^2.6.10",
    "vue-avatar": "^2.3.3",
    "vue-router": "^3.0.3",
    "vuetify": "^1.5.5",
    "vuex": "^3.1.1",
    "xml2js": "^0.4.23"

 ```

## Others

### Home Page

![在这里插入图片描述](/src/assets/readme/home.jpg)
