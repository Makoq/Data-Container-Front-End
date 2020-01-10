<template>
<el-row class="head-nav">
  <el-col :span="8" class="logo"> 
    &nbsp;<img src="../assets/dataServiceContainer3.png"  style="width:350px;margin-top: 10px">
  </el-col>
  <el-col :span="16" class="eMenu">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      @open="openMenu"
      menu-trigger="click"
      background-color="rgb(56, 61, 66)"
      text-color="#fff"
      active-text-color="#ffd04b">
      

      <el-submenu index="1" >
        <template slot="title">
          <el-avatar v-if="this.$store.state.Authorization!=''"  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
         
          </template>
        <el-menu-item v-if="this.$store.state.Authorization==='' "   index="2-1" @click="Login" >login in</el-menu-item>
        <el-menu-item   index="2-2" @click="Logout" >Log out</el-menu-item>
     
      </el-submenu>
       
    </el-menu>
  </el-col>
 
</el-row>
</template>

<script>
  export default {
    data: () => ({
      
      activeIndex: '1',
      activeIndex2: '1'
    }),
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      openMenu(index){
         //登录样式设计
        document.getElementsByClassName('el-menu--horizontal')[1].style.width="50px"
      },
      Login(){
        this.$router.push('/Login')
      },
      Logout(){
          localStorage.removeItem('Authorization');
        this.$router.push('/Login')


      }
    }
    
  }
</script>

<style scoped>
.head-nav{
  background-color: rgb(56, 61, 66);
  
}
.eMenu /deep/ .el-menu{
  float: right;
}
 
</style>
