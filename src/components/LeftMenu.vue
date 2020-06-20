 
<template>
<el-row style="height:100%">
   <el-col :span="24" class="eMenu">

    <el-button  id="colbtn"  @click="LeftMenuCollapse"    style=""   ref="leftBtnCollapse">
      <i :class="Collapse===true?'el-icon-s-unfold':'el-icon-s-fold'" style="color:white"></i>
    </el-button>
    <el-menu 
            default-active="1-4-1" 
            class="el-menu-vertical-demo" 
            @open="handleOpen" 
            @close="handleClose" 
            @select="selectMenuItem"
            :collapse="Collapse"
            mode="vertical"
            text-color="#fff"
            background-color="#545c64"
            active-text-color="#ffd04b"
            :unique-opened="true"
            >
      
        <el-menu-item index="0">
          <i  style="color:white" class="el-icon-s-home"></i>
          <span slot="title">Home</span>
        </el-menu-item>
    
      <el-submenu index="1">

        <template slot="title">
          <i  style="color:white" class="el-icon-files"></i>
          <span>Data</span>
        </template>
          <el-menu-item index="1-1"><span>Instances</span></el-menu-item>
      </el-submenu>


      <el-submenu index="2">

        <template slot="title">
          <i style="color:white" class="el-icon-postcard"></i>
          <span>Processing</span>
        </template>
          <el-menu-item index="2-1"><span>Instances</span></el-menu-item>
    
      </el-submenu>

      <el-submenu index="3">

        <template slot="title">
          <i style="color:white"  class="el-icon-setting"></i>
          <span>Visualization</span>
        </template>        
            <el-menu-item index="3-1"><span>Instances</span></el-menu-item>
        
       </el-submenu>

       <el-submenu index="4">

        <template slot="title">
          <i style="color:white"  class="el-icon-setting"></i>
          <span>Manage</span>
        </template>
       <el-menu-item index="4-1"><span>Workspace</span></el-menu-item>
        <el-menu-item index="4-3"><span>State</span></el-menu-item>
         <el-menu-item index="4-2"><span>Functions</span></el-menu-item>
         
         
      </el-submenu>


       <el-submenu index="5">

        <template slot="title">
          <i style="color:white" class="el-icon-connection"></i>
          <span>Clusters</span>
        </template>

        <el-menu-item index="5-1"><span>Clusters</span></el-menu-item>
        
      </el-submenu>

      <el-menu-item index="6">
          <i  style="color:white" class="el-icon-info"></i>
          <span slot="title">About</span>
        </el-menu-item>

     
      
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
    mounted(){
      
    },
    methods: {
       ...mapMutations(['isCollapse','notCollapse']),


      //leftbar methods
      handleOpen(key, keyPath) {
          
          console.log('open',key, keyPath );
 
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //路由跳转
      selectMenuItem(index){

        console.log("st", index )
         
        if(index==='5'){
          this.$router.push('/about')
        }else if(index==='0'){
          this.$router.push('/Home')
        }else if(index==='1-1'){
          this.$router.push({path:'/instance',query:{type:'Data'}})
        }else if(index==='2-1'){
          this.$router.push({path:'/instance',query:{type:'Processing'}})
        }else if(index==='3-1'){
          this.$router.push({path:'/instance',query:{type:'Visualization'}})
        }else if(index==='4-1'){
          this.$router.push({path:'/workSpace',query:{type:'WorkSpace'}})
        }
         
      },
      //leftbar collapse button event
      LeftMenuCollapse(){
         let _this=this
        if(this.Collapse){

          this.$nextTick(() => {
          
             setTimeout(()=>{
            _this.$refs.leftBtnCollapse.$el.style.width='100%'
           
            },150)
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
    background-color:rgb(69, 73, 76)
  }

 .el-submenu__icon-arrow el-icon-arrow-down {
   color: aliceblue
 }
  
 
  
  .el-menu--collapse{
    height: 100%;
  }
  span{
    font-family: 'Times New Roman', Times, serif;
    font-size: larger
  }
  #colbtn{
       height:35px ; border-radius: 0px; border: 1px solid rgb(56, 61, 66);background:rgb(69, 73, 76);width:100%
  }
</style>
