const util=require('./utils.js')
const websocket=function(it){
    let _this=it
    it.$axios.get('/api/state')
    .then((res)=>{
      if(res.data.code===0){
        _this.$message({
          message:'本地服务正常',
          type:'success'
        })

        //连接中转服务器websocket
        
        if(_this.$root.$el.myWS==undefined){
           var ws = new WebSocket('ws://111.229.14.128:1708');
           
          _this.$root.$el.myWS=ws
           ws.onopen = function(e){
                
                let token=localStorage.getItem('relatedUsr')
                let cont={
                    msg:'regist',
                    token:token.split(',')[1],
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
                   ws.send('online')
                   return
               }
               let re=JSON.parse(e.data)
               //接到上传请求后上传数据
               if(re.req!=undefined&&re.req){
                   _this.$axios.get('/api/transition',{
                       params:
                       {
                           id:re.id,
                           name:re.name,
                           token:re.token
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
                           }else
                                if(resp.data.message=='db find err'){
                                    let noAuthority={
                                        "msg":"resdata",
                                        "type":"db find err",
                                        "wsToken":re.wsToken
                                    }
                                    ws.send(JSON.stringify(noAuthority))
                            }
                       }else{ 
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
               }else if(re.reqPcs!=undefined&&re.reqPcs){
                   _this.$axios.get("/api/executeprcs",{
                       params:
                       {                     
                           dataId:re.dataId,
                           pcsId:re.pcsId,
                           param:re.params,
                           token:re.token,
                           name:re.name
                       }
                })
                   .then(resp=>{
                        if(resp.data.code===0){
                            let dataRes={
                                "msg":"resdata",
                                "id":resp.data.uid,
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
                        }else if(resp.data.code===-1){
                            _this.$notify({
                                message:'本地方法调用失败',
                                type:'fail',
                                duration: 0
                            })
                        }

                   })
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
 