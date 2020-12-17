<template>
  <div class="about">
      <el-col :span="22"  :offset="1" class="about">
        <el-card shadow='hover'>
          <div slot="header" class="clearfix">
            <i class="el-icon-info"></i>
          <strong>About In-Situ Share</strong>
          </div>
        <div  class="container">
            
           <div class="imgFather">
            <img class="netImg" align="right"  src="../../public/img/aboutInsitu.png">
            <img class="netImg" align="right"  src="../../public/img/aboutInsitu2.jpg">

                 <p>Facing the data demand of distributed application of geographic models, a new servitization sharing method of data resources of geographic model is proposed to solve the shortage of existing data service sharing methods, that is, the multi-angle data sharing method that takes into account file, content and expression in place.The overall research idea is as follows: Firstly, based on distributed application of geographic model, data requirements in application link are summarized.</p>
             <p>Then, the problems of existing data service sharing methods to meet the data requirements of model application are clarified.Secondly, in order to meet the requirements and solve the shortcomings of existing methods, combined with the model data resource description method containing metadata and other contents, a data sharing method based on data description and extensible components is proposed.Taking into account the data requirements at the file, content and expression levels, it solves the problem of file data requirements in the application of model services through the servitization sharing at the data file level.Through the servitization sharing of data content level, the problem of acquiring data resources on demand in the application of model service is solved.Through the servitization sharing of data expression level, the problem of data resource expression in the application of model service is solved.Finally, on the basis of network sharing, it is proposed that the multi-disciplinary and decentralized data resources can be servitized and shared by means of in-place sharing to support the distributed application of the model.</p>
         
           </div>
        </div>
        </el-card>
      </el-col>

      <el-col :span="22"  :offset="1" class="about">
        <el-card shadow='hover'>
          <div slot="header" class="clearfix">
            <i class="el-icon-info"></i>
          <strong>About Developers</strong>
          </div>
        <div   >
          <h4>Main developer and coordinator :</h4>
          <ul>
          <li><a href="https://github.com/Makoq" target="_blank">Zhenxv Lan</a> </li>
          <li><a href="https://github.com/limingyuan123" target="_blank">Mingyuan Li</a> </li>
           
        </ul>

        <br>
        <h4> Team Of Developer :</h4> 
        <ul>
          <li> <a href="http://opengmsteam.com/" target="_blank">OpenGMS Team</a></li>
        </ul>
        </div>
        </el-card>
      </el-col>
       

   

     

  </div>
</template>

<script>
  export default {
    data: () => ({
      
    }),
     
  }
</script>

<style scoped>
.about{
  margin-top: 10px;
  background-color: #f8f8f8;
}
 
.container{
  display: flex;
}
 .imgFather{
   /* display: table-cell;
   text-align: center; */
 }
 .netImg{
   width:400px;
   height: 400px;
   margin: 10px;
 }
</style>
