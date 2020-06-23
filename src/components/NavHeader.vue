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
        
        <el-menu-item v-if="this.$store.state.Authorization!='' "  index="2-2" @click="Setting" >Connect</el-menu-item>
      
        <el-menu-item   index="2-2" @click="Logout" >Log out</el-menu-item>
     
      </el-submenu>
       
    </el-menu>
  </el-col>
<!-- 关联门户模态框 -->
      <el-dialog
            title="Connect"
            :visible.sync="settingDialog"
            width="30%"
             >
             
              <el-form :model="connectPortalUsr" status-icon   ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Account:" prop="account">
                <el-input type="text" v-model="connectPortalUsr.email" autocomplete="off"></el-input>
            </el-form-item>
              </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="settingDialog = false">取 消</el-button>
              <el-button type="primary" @click="connectPortal">确 定</el-button>
            </span>
        </el-dialog>
 
</el-row>
</template>

<script>
import { mapMutations } from 'vuex';

  export default {
    data: () => ({
      
      activeIndex: '1',
      activeIndex2: '1',
      settingDialog:false,
      connectPortalUsr:{
        email:'',

      }
    }),
    methods: {
       ...mapMutations(['changerelatedUsr']),

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
          localStorage.removeItem('relatedUsr');

        this.$router.push('/Login')
      },
      Setting(){
        this.settingDialog=true
      },
      connectPortal(){
         var _this=this
         //通过门户的email关联用户
         _this.$axios.put('/api/connectusr',
          {
            email:_this.connectPortalUsr.email
          }
         ).then((res)=>{
           if(res.data.code===0){
                _this.$message({
                        message: 'Success! ',
                        type: 'success'
                });
                //将登录用户信息存入vuex
                 _this.changerelatedUsr({relatedUsr:res.data.message.info.oid+','+res.data.message.info.email})

                _this.settingDialog=false
           }else{//门户中找不到用户
             if(res.data.message=='no usr in portal'){
                 _this.$message({
                        message: 'no usr in portal! ',
                        type: 'fail'
                });
             }else{
               //其他错误
                _this.$message({
                        message: 'connect failed ',
                        type: 'fail'
                });
             }
           }
         })
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
