const util=require('./utils.js')
var websocket=function(it){
    let _this=it
    it.$axios.get('/api/state')
    .then((res)=>{
      if(res.data.code===0){
        _this.$message({
          message:'local service success',
          type:'success'
        })

        //连接中转服务器websocket
        
        if(_this.myWS==undefined){
           var ws = new WebSocket('ws://localhost:1708');
          _this.myWS=ws
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
                 
                delete  _this.myWS
            }
            ws.onerror = function(){
                 _this.$message({
                  message:'连接中转服务出错',
                  type:'fail'
                })
                delete  _this.myWS

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
               if(re.req){
                   _this.$axios.get('/api/transition',{
                       params:
                       {
                           id:re.id,
                           name:re.name,
                           token:re.token
                        }
                   }).then(resp=>{   
                        let dataRes={
                            "msg":"resdata",
                            "id":resp.data.uid,
                            "reqUsr":re.reqUsrOid
                        }
                        console.log(dataRes)
                        //数据下载信息发送回中转服务器
                        ws.send(JSON.stringify(dataRes))
                        
                   })
               }
                
            }

        }else{
            setTimeout(()=>{
                  _this.$message({
                  message:'已经成功连接中转服务器',
                  type:'fail'
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
export default{
    websocket
 }