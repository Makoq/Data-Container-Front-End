const util=require('./utils.js')
const decryptjs =require('./cycrypto.js')
import DecryptJS from './cycrypto.js';
const ip = require('ip');
const websocket=function(it){
    let _this=it
    it.$axios.get('/api/state')
    .then((res)=>{
      if(res.data.code===0){
        _this.$message({
          message:'本地服务正常',
          type:'success'
        })
        // 注释获取本地ip,写死一个北京ip作为测试
        // _this.$root.$el.insitu_ip=DecryptJS.Encrypt(res.data.ip)

        //例子114.247.50.2
        _this.$root.$el.insitu_ip=DecryptJS.Encrypt(res.data.ip)

        //连接中转服务器websocket
        
        if(_this.$root.$el.myWS==undefined){
           var ws = new WebSocket('ws://111.229.14.128:1708');
           
          _this.$root.$el.myWS=ws
           ws.onopen = function(e){
                
                let token=localStorage.getItem('relatedUsr')
                let cont={
                    msg:'regist',
                    token:token.split(',')[1],
                    nodeIp:_this.$root.$el.insitu_ip,
                    date:new Date()
                }
                let msg= JSON.stringify(cont)
                 
                ws.send(msg);
            }
            ws.onclose = function(e){
                 _this.$message({
                  message:'中转服务器关闭',
                  type:'fail'
                })
              
                delete _this.$root.$el.myWS 

            }
            ws.onerror = function(){
                 _this.$message({
                  message:'连接中转服务出错',
                  type:'fail'
                })
                

                delete _this.$root.$el.myWS 


            }
            setInterval(()=>{
                ws.send('{ "msg":"beat" }')
           },60000);
             ws.onmessage = function(e){
               
                //中转服务器发来success，证明建立websocket通信成功
               if(e.data==='success'){
                    console.log("连接中转服务器成功");
                    _this.$message({
                        message:'连接中转服务器成功',
                        type:'success'
                    })
                     
                   return
               } 
               if(e.data==='beat'){
                   console.log('connect with center server stable',new Date().toLocaleString())
                   return
               }
          

               
               let re=JSON.parse(e.data)
               
               if(re.msg&&re.msg=="beat"){
                    
                    
                    console.log('connection with center server is stable',new Date().toLocaleString())
                   
               }
               //接到上传请求后上传数据
               if(re.req!=undefined&&re.req){
                   _this.$axios.get('/api/transition',{
                       params:
                       {
                           id:re.id,
                           name:re.name!=undefined?re.name:undefined,
                           token:re.token,
                           reqUsrOid:re.reqUsrOid!=undefined?re.reqUsrOid:undefined
                        }
                   }).then(resp=>{  
                       if(resp.data.code===-1){
                           if(resp.data.message=='no authority'){
                                let noAuthority={
                                    "msg":"resdata",
                                    "type":"noAuthority",
                                    "wsToken":re.wsToken
                                }
                                ws.send(JSON.stringify(noAuthority))
                           }else if(resp.data.message=='db find err'){
                                    let noAuthority={
                                        "msg":"resdata",
                                        "type":"db find err",
                                        "wsToken":re.wsToken
                                    }
                                    ws.send(JSON.stringify(noAuthority))
                            }
                       }else if(resp.data.code==-2){
                            let dataInvaild={
                                'msg':'resdata',
                                'id':resp.data.id,
                                'reqUsr':resp.data.reqUsr,
                                'stoutErr':resp.data.stoutErr,
                                "wsToken":re.wsToken

                            }
                            ws.send(JSON.stringify(dataInvaild))
                       }
                       else{ 
                            let dataRes={
                                "msg":"resdata",
                                "id":resp.data.uid,
                                "reqUsr":re.reqUsrOid,
                                "wsToken":re.wsToken
                            }

                            re.name
                            _this.$notify({
                                message:'In situ share in file level: '+re.name,
                                type: 'success',
                                duration: 0
                            })

                            
                            //数据下载信息发送回中转服务器
                            ws.send(JSON.stringify(dataRes))
                       }
                   })
               }else if(re.reqUrls!=undefined&&re.reqUrls){

                _this.$axios.get('/api/multiFiles',{
                    params:
                    {
                       
                        id:re.id,
                        name:re.name!=undefined?re.name:undefined,
                        token:re.token,
                        reqUsrOid:re.reqUsrOid!=undefined?re.reqUsrOid:undefined
                     }
                }).then(resp=>{  
                    if(resp.data.code===-1){
                        if(resp.data.message=='no authority'){
                             let noAuthority={
                                 "msg":"resdata",
                                 "type":"noAuthority",
                                 "wsToken":re.wsToken
                             }
                             ws.send(JSON.stringify(noAuthority))
                        }else if(resp.data.message=='db find err'){
                                 let noAuthority={
                                     "msg":"resdata",
                                     "type":"db find err",
                                     "wsToken":re.wsToken
                                 }
                                 ws.send(JSON.stringify(noAuthority))
                         }
                    }else if(resp.data.code==-2){
                         let dataInvaild={
                             'msg':'resdata',
                            
                             'stoutErr':resp.data.stoutErr,
                             "wsToken":re.wsToken

                         }
                         ws.send(JSON.stringify(dataInvaild))
                    }
                    else{ 
                         let dataRes={
                             "msg":"resdata",
                             "id":resp.data.data,
                             "reqUsr":re.reqUsrOid,
                             "wsToken":re.wsToken
                         }

                         re.name
                         _this.$notify({
                             message:'In situ share in file level: '+re.name,
                             type: 'success',
                             duration: 0
                         })

                         
                         //数据下载信息发送回中转服务器
                         ws.send(JSON.stringify(dataRes))
                    }
                })

               }
               else if(re.capability!=undefined&&re.capability){//数据元数信息 capability
                        _this.$axios.get('/api/capability',{
                            params:
                            {
                                id:re.id,
                                type:re.type
                            }
                        }).then(resp=>{  
                            if(resp.data.code===-1){
                                if(resp.data.message=='no authority'){
                                    let noAuthority={
                                        "msg":"resdata",
                                        "capability":true,
                                        "type":"noAuthority",
                                        "wsToken":re.wsToken
                                    }
                                    ws.send(JSON.stringify(noAuthority))
                                }else if(resp.data.message=='db find err'){
                                        let noAuthority={
                                            "msg":"resdata",
                                            "capability":true,
                                            "type":"db find err",
                                            "wsToken":re.wsToken
                                        }
                                        ws.send(JSON.stringify(noAuthority))
                                }else{
                                    let err={
                                        "msg":"resdata",
                                        "stoutErr":"find err",
                                        'id':re.id,
                                        "capability":true,
                                        "wsToken":re.wsToken
                                    }
                                    ws.send(JSON.stringify(err))
                                }
                            }else if(resp.data.code==-2){
                                let dataInvaild={
                                    'msg':'resdata',
                                    'id':resp.data.id,
                                    
                                    'stoutErr':resp.data.stoutErr,
                                    "wsToken":re.wsToken

                                }
                                ws.send(JSON.stringify(dataInvaild))
                            }
                            else{ 
                                let dataRes={
                                    "msg":"resdata",
                                    "data":resp.data.data,
                                    "capability":true,
                                    "wsToken":re.wsToken
                                }

                                
                                _this.$notify({
                                    message:'In situ share in file level: '+re.name,
                                    type: 'success',
                                    duration: 0
                                })

                                
                                //数据下载信息发送回中转服务器
                                ws.send(JSON.stringify(dataRes))
                            }
                        })


               }
               
               else if(re.reqPcs!=undefined&&re.reqPcs){
                   _this.$axios.get("/api/executeprcs",{
                       params:
                       {                     
                           dataId:re.dataId,
                           pcsId:re.pcsId,
                           params:re.params!=undefined?re.params:undefined,
                           token:re.token,
                           name:re.name
                       }
                })
                   .then(resp=>{
                        if(resp.data.code===0){
                            let dataRes={
                                "msg":"resdata",
                                "id":resp.data.uid,
                                'stout':resp.data.stout,    
                                "reqUsr":re.reqUsrOid,
                                "wsToken":re.wsToken
                            }

                           
                            _this.$notify({
                                message:'In situ share in content level: '+re.name,
                                type: 'success',
                                duration: 0
                            })

                            console.log(dataRes)
                            //数据下载信息发送回中转服务器
                            ws.send(JSON.stringify(dataRes))
                        }else if(resp.data.code===-2){

                            
                            let executeError={
                                "msg":"resdata",
                                "id":resp.data.uid,
                                'stoutErr':resp.data.message,
                                "reqUsr":re.reqUsrOid,
                                "wsToken":re.wsToken
                            }

                            
                            
                            ws.send(JSON.stringify(executeError))

                           
                            _this.$notify({
                                message:'本地方法调用失败\n'+resp.data.message,
                                type:'fail',
                                duration: 0
                            })
                        }

                   })
               }else if(re.msg=='MigRcv'){

                if(re.off!=undefined){
                    _this.$message({
                        message:'目标节点离线',
                        type:'fail',
                        duration:0,
                        showClose:true
                       
                    })
                }else if(re.reply!=undefined){
                    _this.$message({
                        message:'目标节点已收到消息',
                        type:'success',
                        duration:0,
                        showClose:true
                    })
                }
                else{
                    _this.$message({
                        message:'收到服务迁移消息',
                        type:'success',
                        showClose:true
                    })
                    window.location.href='http://111.229.14.128:8899/data?uid='+re.dataId
                }

               }else if(re.msg=="AvbPcs"){
                   console.log(re.msg=='AvbPcs'?true:false)
                    _this.$axios.get('/api/availablePcs',{
                        params:{
                            type:re.type
                        }
                    }).then(res=>{
                        if(res.data.code==0){
                            _this.$message({
                                message:'收到可用服务请求',
                                type:'success',
                                showClose:true
                            })

                            let availablePcs={
                                msg:'AvailablePcs',
                                pcs:res.data.data
                            }
                            ws.send(JSON.stringify(availablePcs))
                            
                        }else{
                            _this.$message({
                                message:'收到可用服务请求失败',
                                type:'fail',
                                showClose:true
                            })
                        }
                    })
               }else if(re.msg=="ivkDPcs"){
                    //  两种情况，一种是拿着数据容器的下载id过来，另一种情况是拿着外部可下载数据的url过来（目前值兼容了模型容器输出的url）
                    if(re.contDtId!=undefined){
                                            
                        _this.$axios.get('/api/exewithotherdata',{
                            params:{
                                contDtId:re.contDtId,
                                pcsId:re.pcsId,
                                params:re.params!=undefined?re.params:undefined,
                                type:re.type,
                                token:re.token
                            }
                        }).then(res=>{
                            if(res.data.code==0){
                                let availablePcs={
                                    msg:'invokDisPcs',
                                    uid:res.data.uid,
                                    stout:res.data.stout,
                                }
                                ws.send(JSON.stringify(availablePcs))
                            }else if(res.data.code==-2){
                                let executeError={
                                    "msg":"invokDisPcs",
                                    "uid":'none',
                                    'stout':res.data.message,
                                    
                                }

                                ws.send(JSON.stringify(executeError))

                            }
                            else{
                                _this.$message({
                                    message:'失败',
                                    type:'fail',
                                    showClose:true
                                })
                            }
                        })
                    }else if(re.url!=undefined){
                        
                       
                        const params = new URLSearchParams();
                        params.append("pcsId",re.pcsId)
                        params.append("token",re.token)
                        params.append("url",re.url)

                        params.append("params",re.params!=undefined?re.params:undefined)

                         
                        _this.$axios.post('/api/invokeProUrl',params,{
                            headers:{
                                'Content-Type':'application/x-www-form-urlencoded'
                            }
                        }
                        ).then(res=>{
                            if(res.data.code==0){
                                let availablePcs={
                                    msg:'invokDisPcs',
                                    uid:res.data.uid,
                                    stout:res.data.stout,
                                }
                                ws.send(JSON.stringify(availablePcs))
                            }else if(res.data.code==-2){
                                let executeError={
                                    "msg":"invokDisPcs",
                                    "uid":'none',
                                    'stout':res.data.message,
                                    
                                }

                                ws.send(JSON.stringify(executeError))

                            }
                            else{
                                _this.$message({
                                    message:'失败',
                                    type:'fail',
                                    showClose:true
                                })
                            }
                        })
                    }else if(re.urls!=undefined){
                        
                       
                        const params = new URLSearchParams();
                        params.append("pcsId",re.pcsId)
                        params.append("token",re.token)
                        params.append("urls",re.urls)

                        params.append("params",re.params!=undefined?re.params:undefined)

                         
                        _this.$axios.post('/api/invokeProUrls',params,{
                            headers:{
                                'Content-Type':'application/x-www-form-urlencoded'
                            }
                        }
                        ).then(res=>{
                            if(res.data.code==0){
                                let availablePcs={
                                    msg:'invokDisPcs',
                                    uid:res.data.uid,
                                    stout:res.data.stout,
                                }
                                ws.send(JSON.stringify(availablePcs))
                            }else if(res.data.code==-2){
                                let executeError={
                                    "msg":"invokDisPcs",
                                    "uid":'none',
                                    'stout':res.data.message,
                                    
                                }

                                ws.send(JSON.stringify(executeError))

                            }
                            else{
                                _this.$message({
                                    message:'失败',
                                    type:'fail',
                                    showClose:true
                                })
                            }
                        })
                    }
               }                
            }

        }else{
            setTimeout(()=>{
                  _this.$message({
                  message:'中转服务器连接正常',
                  type:'succsee'
                })
            },1000)
         
            
        }
           







      }else{
        _this.$message({
          message:'service offline',
          type:'fail'
        })
      }
    })

}
export default websocket;
 