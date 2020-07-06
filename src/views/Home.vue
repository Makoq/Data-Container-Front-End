<template>
  <div class="home">
    <!-- <p>&nbsp;&nbsp;In situ sharing of data in file, information, visualzation level.</p> -->
  <el-row  >
    <el-col :span="12">
      <el-card>
      
        <div slot="header" class="clearfix">
          <strong> <i class="el-icon-s-cooperation"> </i>   File Level In Situ Share</strong>
           <el-button style="float: right; padding: 3px 0" @click=" check('data')" type="text">Check</el-button>
        </div>
        <p>In situ sharing of dataset in entire file level ( eg: .shp, .tif, .txt, etc. ) for the collaborative geographical modeling.</p>
        <p>By this way, collaborators are able to directly exchange file data with each other from local storages  to meet the needs of modeling tasks.</p>
      
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
      
        <div slot="header" class="clearfix">
          <strong>   <i class="el-icon-info"> </i> Information Level In Situ Share</strong>
           <el-button style="float: right; padding: 3px 0" @click="check('pcs')" type="text">Check</el-button>

        </div>
        <p>In situ sharing of data in content or information level for collaborative modeling.</p>
        <p>A series of data processing scripts based designed programming templates in Python language are contributed to the sharing of data information, such as cliping ROI from the whole study area.</p>
        </el-card>
    </el-col>

  </el-row>
  <el-row   style="margin-top:20px;">
    <el-col :span="12" >
      <el-card  >
       
        <div slot="header" class="clearfix">
          <strong> <i class="el-icon-picture"> </i>  Visualzation Level In Situ Share</strong>
           <el-button style="float: right; padding: 3px 0" @click=" check('vis')" type="text">Check</el-button>

        </div>
        <p>In situ sharing of data in Visualzation level for collaborative modeling.</p>
<p>A series of data visualzation scripts based designed programming templates in Python language are contributed to the sharing of data visualzation, such as snapshot of data.

        </p>

        </el-card>
    </el-col>
    <el-col :span="12">
      <el-card>
       
         <div slot="header" class="clearfix">
          <strong> <i class="el-icon-s-order"> </i> Public Data Item List</strong>
           <el-button style="float: right; padding: 3px 0" @click="check('list')" type="text">Check</el-button>

        </div>
         <p>A public data item list with corresponding callable processing and visualization methods for data insitu sharing in<a href="https://geomodeling.njnu.edu.cn/" target="_blank"> OpenGMS Portal Website.</a></p>
        </el-card>
    </el-col>
  </el-row>

  </div> 
</template>

<script>
   

  export default {
     methods:{
       check(type){
         if(type=='data'){
           this.$router.push({path:'/instance',query:{type:'Data'}})
         }
         if(type=='pcs'){
           this.$router.push({path:'/instance',query:{type:'Processing'}})
         }
         if(type=='vis'){
           this.$router.push({path:'/instance',query:{type:'Visualization'}})
         }
         if(type=='list'){
           window.open('https://geomodeling.njnu.edu.cn/dataItem/repository')
         }
          
       }
     }
  }
</script>

<style scoped>
.home{
  height: 1000px;
   
}
 
.el-button{
  color: #0e28a7;
}
.el-card{
margin-left: 20px;
margin-right: 20px;

 height:260px;
 background-color: #c1cfda;
}
</style>>
