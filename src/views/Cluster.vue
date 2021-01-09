<template>
  <div v-loading="loading" id="clu">
 
    <el-divider></el-divider>
    <div
    style="display:flex;flex-wrap:wrap"
    >
        
          <div  class="nodes" v-for="(o, index) in onlineNodes" :key="index">
            <div style="margin-left:-20px;margin-top:20px">
            <!-- @mouseover="nodeInfo(o)" -->

            <strong style="color:blue"  
            >{{o.node[0]}}</strong>
            </div>
          </div>
          
            
         
    </div>
  </div>
</template>

<script>
import xml2js from 'xml2js';
const builder=new xml2js.Builder();
const parser= new xml2js.Parser();
  export default {
    data: () => ({
      onlineNodes:[],
      loading:false
    }),
    mounted(){
      let _this=this
      this.loading=true
      this.$axios.get('http://111.229.14.128:8898/onlineNodes',{
        headers:{
        "Content-Type":"application/json"
    }
      })
      .then(res=>{
        parser.parseString(res.data, function (err, result) {
          _this.loading=false
          console.log(result)
            _this.onlineNodes=result.root.serviceNodes[0].onlineServiceNode
        })
      })
    },
    methods:{
      nodeInfo(node){
          console.log(node)
          this.$alert(node.token,'title',{
            confirmButtonText: '确定',
            callback: action => {
             
          }

          }
          )
          
      }
    }
     
  }
</script>

<style>
#clu{
 /* background-image: url('../../public/img/bk.png'); */
    height: 100%;
    background-image: url(../../public/img/bk2.webp);
    background-size:100% 100%;
    /* -o-background-size: 100% 100%;
    -webkit-background-size:90% 90%; */
    background-size:center;
}
.nodes:hover{
  background-color: rgb(241, 23, 15);
}
 
.nodes{
    height: 50px;
    width: 50px;
    margin:55px; 
    border-radius: 50%;
     background-color: #13ff75;
    border:2px solid black;
 
}
 
.nodes:before {
            content: '';
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            opacity: .7;
            background-color: #13ff75;
            animation: scaless 1s infinite cubic-bezier(0, 0, .49, 1.02);
        }
@keyframes scaless {
      0% {
          transform: scale(1)
      }

      50%,
      75% {
          transform: scale(3)
      }

      78%,
      100% {
          opacity: 0
      }
  }
</style>
