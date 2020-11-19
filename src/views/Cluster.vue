<template>
  <div v-loading="loading" id="clu">
 
    <el-divider></el-divider>
    <el-row
    
    >
        <el-col :span="4" v-for="(o, index) in onlineNodes" :key="index" >
          <el-card style="margin:5px; border-radius: 25px;border:2px solid black" >
            <i class="el-icon-loading" style="color:green;"></i>
            {{o.node[0]}}
            </el-card>
        </el-col>
    </el-row>
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
      this.$axios.get('http://111.229.14.128:8898/onlineNodes')
      .then(res=>{
        parser.parseString(res.data, function (err, result) {
          _this.loading=false
            _this.onlineNodes=result.serviceNodes.onlineServiceNodes
        })
      })
    }
     
  }
</script>

<style>
#clu{
 /* background-image: url('../../public/img/bk.png'); */
    height: 100%;
    background-image: url(../../public/img/bk.svg);
    background-size:100% 100%;
    /* -o-background-size: 100% 100%;
    -webkit-background-size:90% 90%; */
    background-size:center;
}
</style>
