# 开发笔记

# 基础公共部分
## 用户

### 用户关联
- 本地用户关联到门户用户
- token就是用户在库中的id,保存在vuex中，验证是否登录，同时在请求头中，便于后台识别用户

# 核心功能部分
## 数据

### 面向协作建模的具体数据需要进行数据分类
- 具体的数据分类

- 文件夹数据结构设计
1. 基本思路
每次拿到一个层级的列表对象，
每一个列表项作为一个对象，其中包含内容列表属性
2. 数据结构
```
 instancesCont:{
            uid:'0',
            parentLevel:'-1',//上层instances的id,第一层默认为-1
            type:'Data',
            userToken:'',
            list:[
                {
                    id:'01',
                    name: 'folder',
                    date:'2020.1.1',
                    type:'folder',
                    subContentId:'1234',
                    authority:true//true表示公开，false表示未公开
                }, 
                {
                    id:'02',
                    oid:'',
                    name: 'file.zip',
                    date:'2020.1.1',
                    size:'12m',
                    type:'file',
                    authority:true//true表示公开，false表示未公开
                    meta:{
                       workspace:''
                       overview:'',
                       description:'',
                       tags:[],
                       dataPath:'‪D:\Projects\dataContainerFrontEnd\data\config.udxcfg', 
                    }
                }
            ]
       }

```








## 处理方法

- 脚本接口，输入数据，输出处理结果
- 先做基于shp的简单处理，先用python做一下















## 可视化方法

- 数据截图方面已做好，已初步实现shp和tiff数据的可视化
- 动态网页，考虑改19年和进哥做的可视化系统，兼容进来


1.19
搭载基本功能

3.23

两个例子
http://223.2.40.210:8084/dataItem/5f9d2fa23bb8564524739804

http://223.2.40.210:8084/dataItem/5f9c24593bb856345c3588cc


Ka3TsrKQGvgEikobDs8+PBcFg621lTGddu7oL0M/rZk=

模型的两个例子
fvcom
http://172.21.213.4:8084/task/322dcfb0-6a79-48a2-9b80-bb105f1bb36d

stars
http://172.21.213.4:8084/task/f71ee90c-8907-431f-a85f-e172a4a47db6



:1708/#/console/chart:1 Access to XMLHttpRequest at '' from origin '' has been blocked by CORS policy: The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' 



可视化测试数据
线状图、饼状图、散点图

http://111.229.14.128:8899/data?uid=07e48438-e5f7-4543-b578-b9de49cafa77
