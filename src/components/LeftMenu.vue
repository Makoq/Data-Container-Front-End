 
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
          <span>File</span>
        </template>
          <el-menu-item index="1-1"><span>Instances</span></el-menu-item>
          <el-menu-item index="1-2"><span>Results</span></el-menu-item>

      </el-submenu>


      <el-submenu index="2">

        <template slot="title">
          <i style="color:white" class="el-icon-postcard"></i>
          <span>Content</span>
        </template>
          <el-menu-item index="2-1"><span>Instances</span></el-menu-item>
          <el-menu-item index="2-2"><span>Methods</span></el-menu-item>
      </el-submenu>

      <el-submenu index="3">

        <template slot="title">
          <i style="color:white"  class="el-icon-picture"></i>
          <span>Visualization</span>
        </template>        
            <el-menu-item index="3-1"><span>Instances</span></el-menu-item>
            <el-menu-item index="3-2"><span>Methods</span></el-menu-item>
            <!-- <el-menu-item index="3-2"><span>Thematic</span></el-menu-item> -->

        
       </el-submenu>

       <el-submenu index="4">

        <template slot="title">
          <i style="color:white"  class="el-icon-setting"></i>
          <span>Manage</span>
        </template>
       <el-menu-item index="4-2"><span>Workspace</span></el-menu-item>
        <el-menu-item index="4-1"><span>State</span></el-menu-item>
       <el-menu-item index="4-3"><span>Large File</span></el-menu-item>

         <!-- <el-menu-item index="4-2"><span>Functions</span></el-menu-item> -->
         
         
      </el-submenu>


       <el-submenu index="5">

        <template slot="title">
          <i style="color:white" class="el-icon-connection"></i>
          <span>Clusters</span>
        </template>

        <el-menu-item index="5-1"><span>Nodes</span></el-menu-item>
        <el-menu-item index="5-2"><span>World</span></el-menu-item>

        
      </el-submenu>

      

      <el-menu-item index="6">
          <i  style="color:white" class="el-icon-info"></i>
          <span slot="title">About</span>
        </el-menu-item>
      <div class="innerBorderGrey60" style="margin: 3px;background-color: rgb(228 224 224); height: 2px;"></div>
      <el-menu-item index="7">
        <i style="color:white" class="el-icon-user"></i>
        <span slot="title">My Information</span>
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
      //组件初始化后，通过localstorage判断登录状态，若未登录跳转至登录界面
        let userState=localStorage.getItem('Authorization')
        if(!userState){//如果未登录，则跳转登录界面
          alert("please login first")
          this.$router.push('/Login')
        }
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

        let userState=localStorage.getItem('Authorization')
         
          if(index==='5'){
            this.$router.push('/about')
          }else if(index==='0'){
            this.$router.push('/Home')
          }else if(index==='1-1'){
            this.$router.push({path:'/instance',query:{type:'Data'}})

          }else if(index==='1-2'){
            this.$router.push({path:'/instance',query:{type:'DataOut'}})

          }else if(index==='2-1'){
            this.$router.push({path:'/instance',query:{type:'Processing'}})

          }else if(index==='2-2'){
            this.$router.push({path:'/instance',query:{type:'ProcessingMethod'}})

          }else if(index==='3-1'){
            this.$router.push({path:'/instance',query:{type:'Visualization'}})
            
          }else if(index==='3-2'){
            this.$router.push({path:'/instance',query:{type:'VisualizationMethod'}})
            
          }else if(index==='4-1'){
            this.$router.push({path:'/state'})
          }else if(index==='4-2'){
            this.$router.push({path:'/workSpace'})
          }else if(index==='4-3'){
            this.$router.push({path:'/upload'})
          }
          else if(index==='5-1'){
            this.$router.push({path:'/cluster',query:{type:'Cluster'}})
          }else if(index==='5-2'){
            this.$router.push({path:'/worldCluster',query:{type:'worldCluster'}})
          }else if(index==='6'){
            this.$router.push({path:'/about',query:{type:'About'}})
          }else if(index === '7'){
            this.$router.push({path:'/userInfo', query:{type:'UserInfo'}})
          }
        
        
         
      },
      //leftbar collapse button event
      LeftMenuCollapse(){
         let _this=this
        if(this.Collapse){
          _this.notCollapse()

          this.$nextTick(() => { 
            _this.$refs.leftBtnCollapse.$el.style.width='100%'
            _this.Collapse=false
　　　　   }, 0)

        }else{

          _this.isCollapse()
          this.$nextTick(() => {
            _this.$refs.leftBtnCollapse.$el.style.width='64px';
            _this.Collapse=true
            

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
