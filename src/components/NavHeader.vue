<template>
<el-row class="head-nav">
 
  <el-col :span="22" class="logo"> 
    &nbsp;<img src="../assets/dataServiceContainer3.png"  style="width:350px;margin-top: 10px">
  </el-col>
  
  <el-col :span="2" class="eMenu">
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
        
        <el-menu-item v-if="this.$store.state.Authorization!='' "  index="2-3" @click="Setting" >Setting</el-menu-item>
        <el-menu-item v-if="this.$store.state.Authorization!='' "  index="2-2" @click="OnlineWithCenterServer" >State</el-menu-item>
      
        <el-menu-item   index="2-4" @click="Logout" >Log out</el-menu-item>
     
      </el-submenu>
       
    </el-menu>
  </el-col>
<!-- 关联门户模态框 -->
      <el-dialog
            title="Connect"
            :visible.sync="settingDialog"
            width="40%"
             >
             
              <el-form :model="connectPortalUsr" status-icon   ref="ruleForm" label-width="170px" class="demo-ruleForm">
              <el-form-item label="Account:" prop="account">
                <el-input type="text" v-model="connectPortalUsr.email" autocomplete="off" :readonly="connectPortalUsr.email!=''?true:false"></el-input>
              </el-form-item>
              <el-form-item  label="Your Token:" >
                                <el-input type="text" v-model="yourToken" ref="myOwnToken" readonly>
                                 <el-button slot="append" icon="el-icon-document-copy" @click="copyMyToken()"></el-button>    
                                </el-input> 
                </el-form-item>
                <el-form-item label="Python Environment:" prop="environment">
                <el-input type="text" v-model="pythonEnv" autocomplete="off" :readonly="pythonEnv!=''?true:false"></el-input>
              </el-form-item>
              </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="settingDialog = false">Cancel</el-button>
              <el-button type="primary" @click="connectPortal" :disabled="connectPortal!=''?false:true">Confirm</el-button>
            </span>
        </el-dialog>
 
</el-row>
</template>

<script>
import { mapMutations } from 'vuex';
import ws from '../utils/websocket.js'
import DecryptJS from '../utils/cycrypto.js';

  export default {
    data: () => ({
      
      activeIndex: '1',
      activeIndex2: '1',
      settingDialog:false,
      connectPortalUsr:{
        email:'',

      },
      yourToken:'',
      pythonEnv:''
      
      
      
    }),
    
    computed:{
      // myState:function(){
      //   return this.$root.$el.myWS?'Online':'Offline'
      // }
    },
    mounted(){
        let connUsr=localStorage.getItem('relatedUsr')
        if(connUsr){
           this.connectPortalUsr.email = DecryptJS.Decrypt(connUsr.split(',')[1])
           this.yourToken=localStorage.getItem('relatedUsr').split(',')[1]
        }
        this.pythonEnv = localStorage.getItem('pythonEnv');
    },
    methods: {
       ...mapMutations(['changerelatedUsr','changePythonEnv']),
      OnlineWithCenterServer(){
        ws(this)
        console.log(this.$root.$el.myWS)
      },
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
        
        let connUsr=localStorage.getItem('relatedUsr')
        if(connUsr){

               this.connectPortalUsr.email = DecryptJS.Decrypt(connUsr.split(',')[1])
                this.yourToken=localStorage.getItem('relatedUsr').split(',')[1]
        }
        this.settingDialog=true
      },
      connectPortal(){
         var _this=this;

         //通过门户的email关联用户
         _this.$axios.put('/api/connectusr',
          {
            email:_this.connectPortalUsr.email,
            pythonEnv:this.pythonEnv
          }
         ).then((res)=>{
           if(res.data.code === -2){
            _this.$message({
              message:'python environment is empty!',
              type:'error'
            })
           }else if(res.data.code===0){
                _this.$message({
                        message: 'Success! ',
                        type: 'success'
                });
                //将登录用户信息以及python路径信息存入vuex
                 _this.changerelatedUsr({relatedUsr:res.data.info.oid+','+res.data.info.email})
                 _this.changePythonEnv({pythonEnv:_this.pythonEnv});
                  this.$router.push('/Login') 
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
      },
      //点击复制到粘贴板
       copyMyToken(){
          
          // console.log(this.$refs.myOwnToken[0])
           this.$refs.myOwnToken.select()
           if (document.execCommand("copy")) {
                    document.execCommand("copy");
           }
       },

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
