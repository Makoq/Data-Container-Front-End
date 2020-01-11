<template>
  <el-row class="bottom-footer">
    <el-col :span="24" class="eMenu">
         
        <span> &nbsp;&nbsp;<strong> OpenGMS Data Service Container</strong> &nbsp;&nbsp;  苏ICP 备05007121. Copyright © 2017 南京师范大学. All rights reserved.</span>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    data: () => ({
      
    }),
  
  }
</script>

<style scoped>
.bottom-footer{
  background-color: rgb(56, 61, 66);
  position:fixed;
  bottom: 0px;
  width: 100%;
  height: 30PX;

}
 .eMenu{
     color: aliceblue;
     height: 100%;
     padding: 5px
 }
  .eMenu span{
      font-family:'Times New Roman', Times, serif;
  }

</style>
