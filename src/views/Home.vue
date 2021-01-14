<template>
  <div class="home">
    <br>
   <div style="position: fixed;z-index: 999">
      <el-row style="min-width:965px" >

        <el-col :span="12">
          <el-card>
          
            <div slot="header" class="clearfix">
              <strong style="color:white"> <i class="el-icon-s-cooperation"> </i>   File Level In Situ Share</strong>
              <el-button style="float: right; padding: 3px 0" @click=" check('data')" type="text"><strong>
                <strong style="color:#24fff5">Check</strong>
                </strong></el-button>
            </div>
          <el-col :span="12" >
            <p>In situ sharing of dataset in entire file level ( eg: .shp, .tif, .txt, etc. ) for the collaborative geographical modeling.</p>
            <p>By this way, collaborators are able to directly exchange file data with each other from local storages  to meet the needs of modeling tasks.</p>
          </el-col>
          <div class="homeImg">
          <img width="200px" height="180px" src="../../public/img/file.gif">
          </div>
          </el-card>
        </el-col>
        
        <el-col :span="12">
          <el-card>
          
            <div slot="header" class="clearfix">
              <strong style="color:white">   <i class="el-icon-info"> </i> Content Level In Situ Share</strong>
              <el-button style="float: right; padding: 3px 0" @click="check('pcs')" type="text">
                <strong style="color:#24fff5">Check</strong>
                </el-button>

            </div>
            <el-col :span="12" >
            <p>In situ sharing of data in content or information level for collaborative modeling.</p>
            <p>A series of data processing scripts based designed programming templates in Python language are contributed to the sharing of data information, such as cliping ROI from the whole study area.</p>
            </el-col>
                <div class="homeImg">
              <img width="200px" height="180px" src="../../public/img/info.gif">
            </div>
            </el-card>
        </el-col>

      </el-row>
      <el-row   style="margin-top:20px;">
        <el-col :span="12" >
          <el-card  >
          
            <div slot="header" class="clearfix">
              <strong style="color:white"> <i class="el-icon-picture"> </i>  Visualzation Level In Situ Share</strong>
              <el-button style="float: right; padding: 3px 0" @click=" check('vis')" type="text">
                <strong style="color:#24fff5">Check</strong>
                </el-button>

            </div>
            <el-col :span="12" >
            <p>In situ sharing of data in Visualzation level for collaborative modeling.</p>
    <p>A series of data visualzation scripts based designed programming templates in Python language are contributed to the sharing of data visualzation, such as snapshot of data.

            </p>
            </el-col>
            <div class="homeImg">
            <img width="200px" height="180px" src="../../public/img/visual.gif">
            </div>
            </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
          
            <div slot="header" class="clearfix">
              <strong style="color:white"> <i class="el-icon-s-order"> </i> Public Data Item List</strong>
              <el-button style="float: right; padding: 3px 0" @click="check('list')" type="text">
                <strong style="color:#24fff5">Check</strong>
                </el-button>

            </div>
            <el-col :span="12" >
            <p>A public data item list with corresponding callable processing and visualization methods for data insitu sharing in<a href="https://geomodeling.njnu.edu.cn/" target="_blank" style="color:white"> OpenGMS Portal Website.</a></p>
            </el-col>

            <el-col :span="12" class="homeImg">
            <img width="200px" height="190px" src="../../public/img/ogms.jpg">
            </el-col>
            </el-card>
        </el-col>
      </el-row>
   </div>

  <video class="" 
    autoplay loop muted
    tabindex="2" 
    mediatype="video" 
    
    style="position: inherit;width: -webkit-fill-available; height: inherit;z-index:-9999">
          <source src="../assets/video/earth.mp4"  type="video/mp4"  />
    </video>
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
  background-color: black;
  
  /* height: 1000px;
   
 
    height: 100%;
    
    background-image: url(../../public/img/earth.gif);
    background-size:100% 190%;
     
    background-size:center; */
 
   
}
 
.el-button{
  color: #ff0800;
}
.el-card{
margin-left: 20px;
margin-right: 20px;
opacity:0.6;
 height:300px;
 background-color: #222525;
}
.el-card:hover{
  opacity: 1;
}

p{
  color:#8bfb7d;
}
img{
  float:right;
  border: 2px solid white;
}
.homeImg{
margin-bottom: 0px;
}
</style>>
