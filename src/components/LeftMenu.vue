import LeftMenu from '@/components/LeftMenu';
<template>
<el-row style="height:100%">
   <el-col :span="24" class="eMenu">

    <el-button  @click="LeftMenuCollapse"    style="background:rgb(56, 61, 66);width:100%"   ref="leftBtnCollapse">
      <i :class="Collapse===true?'el-icon-s-unfold':'el-icon-s-fold'" style="color:white"></i>
    </el-button>
    <el-menu 
            default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            :collapse="Collapse"
            background-color="rgb(56, 61, 66"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            >
      
        <el-menu-item index="0">
          <i class="el-icon-s-home"></i>
          <span slot="title">HOME</span>
        </el-menu-item>
    
      <el-submenu index="1">

        <template slot="title">
          <i class="el-icon-files"></i>
          <span>File Data Service</span>
        </template>

        <el-menu-item index="1-1">Workspace</el-menu-item>
          <el-menu-item index="1-2">Service Instance</el-menu-item>
      </el-submenu>


      <el-submenu index="2">

        <template slot="title">
          <i class="el-icon-postcard"></i>
          <span>Udx Data Service</span>
        </template>

        <el-menu-item index="2-1">Workspace</el-menu-item>
          <el-menu-item index="2-2">Service Instance</el-menu-item>
          <el-menu-item index="2-3">Converting</el-menu-item>
          <el-menu-item index="2-4">Refactoring</el-menu-item>
          <el-menu-item index="2-5">Visualization</el-menu-item>




      </el-submenu>

       <el-submenu index="3">

        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>Setting</span>
        </template>

        <el-menu-item index="3-1">state</el-menu-item>
         
      </el-submenu>


       <el-submenu index="4">

        <template slot="title">
          <i class="el-icon-connection"></i>
          <span>Clusters</span>
        </template>

        <el-menu-item index="4-1">clusters</el-menu-item>
        
      </el-submenu>

     
      
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
import { mapMutations } from 'vuex';

  export default {
    data() {
      return {
        Collapse: false
      };
    },
    methods: {
       ...mapMutations(['isCollapse','notCollapse']),


      //leftbar methods
      handleOpen(key, keyPath) {
        console.log('open',key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //leftbar collapse button event
      LeftMenuCollapse(){
         let _this=this
        if(this.Collapse){
          
         
        

          this.$nextTick(() => {
            _this.$refs.leftBtnCollapse.$el.style.width='100%'
            _this.Collapse=false
            _this.notCollapse()
             

　　　　   }, 0)

         
          

        }else{

          
          this.$nextTick(() => {
            _this.$refs.leftBtnCollapse.$el.style.width='64px';
           
            _this.Collapse=true
             _this.isCollapse()
            

　　　　   }, 0)



        }
      }

    }
  }
</script>

<style scoped>
  .eMenu{
    height: 100%;
  }
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    width: 100%;
    min-height: 100%;
    
  }
  .el-menu--collapse{
    height: 100%;
  }
</style>
