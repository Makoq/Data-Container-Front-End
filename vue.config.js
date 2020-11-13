const reomte_url=require('./src/utils/config.js')
module.exports = {
    baseUrl:'/',//根路径
    lintOnSave:false,//关闭ESLint代码检验
    devServer:{
        open:true,//run启动的时候是否弹出页面
        host:'0.0.0.0',//本机地址
        port:'8080',//端口号
        https:false,
        hotOnly:false,
        proxy:{
            //配置跨域
            '/api':{
                target:'http://localhost:8899',
                ws:true,
                timeout:600000,
                changOrigin:true,
                pathRewrite:{
                    '^/api':'',
                }
            },
            //发布数据公开页面
            '/portal':{
                target:reomte_url.remote_test_url,
                ws:true,
                timeout:600000,
                changOrigin:true,
                pathRewrite:{
                    '^/portal':'',
                }
            },
            //
            '/my':{
                target:'http://223.2.38.183:8080',
                ws:true,
                timeout:600000,
                changOrigin:true,
                pathRewrite:{
                    '^/my':'/',
                }
            },
            //参与式平台
            '/geops':{
                target:reomte_url.remote_test_url,
                ws:true,
                timeout:600000,
                changOrigin:true,
                pathRewrite:{
                    '^/geops':'',
                }
            },

            //测试
            //参与式平台
            '/test':{
                target:'http://223.2.47.177:8081/',
                ws:true,
                timeout:600000,
                changOrigin:true,
                pathRewrite:{
                    '^/test':'',
                }
            },
            





        }
    }
}