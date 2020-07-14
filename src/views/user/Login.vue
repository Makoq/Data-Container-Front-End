<template>
  <el-row style="height:100%">
    <el-col :span="24" class="login-back">
        <el-card class="login">
            <div slot="header" class="clearfix">
              <img src="@/assets/dataServiceContainer.png"  style="width:200px;height:60px">
                
            </div>
           <el-form :model="ruleForm" status-icon   ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Account:" prop="account">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Password:" prop="pass">
                <el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
            </el-form-item>
        
            <el-form-item>
                <el-button  type="primary" @click="submitForm()">Login</el-button>
                <!-- <el-button @click="Register" type="success">Register</el-button> -->
            </el-form-item>
            </el-form>
             
        </el-card>
        
    </el-col>
  </el-row>

</template>

<script>

// import { Session } from 'inspector';
import { mapMutations } from 'vuex';
import DecryptJS from '../../utils/cycrypto.js';
  export default {
    data() { 
      return {
        ruleForm: {
          pwd: '123',
          name:'admin',
          loginUser:''
          
        },
        
      };
    },
    computed:{
        
    },
    mounted:{
      //  
    },
    methods: {
       ...mapMutations(['changeLogin','changerelatedUsr']),
      submitForm(){
          var _this=this
          let enCodePwd=_this.ruleForm.pwd
          
         _this.$axios.post('/api/login', 
                  {
                    name:_this.ruleForm.name,
                    pwd:DecryptJS.Encrypt(enCodePwd)
                  }
              )
             .then((res)=>{
                 if(res.data.code===0){
                     _this.$message({
                        message: 'Success! ',
                        type: 'success'
                    });
                    //获取到当前的登录用户
                     _this.loginUser=res.data.message.account

                                 
                    // 将用户token保存到vuex中
                    _this.changeLogin({ Authorization:res.data.message.token });
                   //将关联用户信息包村到vuex中
                   _this.changerelatedUsr({relatedUsr:res.data.message.relatedUser.oid+','+res.data.message.relatedUser.email})
                   
                   setTimeout(() => {
                        _this.$router.push('/Home')
                    }, 1000);
                    
                 }else{
                     _this.$message({
                        message: 'account or password wrong!',
                        type: 'warning'
                    });

                 }

                
             })
      },
      Register() {
         this.$router.push('/Register')
      }
    }
  }
</script>

<style scoped>
 .login{
     margin:12% 35%; 
     min-width: 400px;  
    
 }
 .login-back{
     background-color:beige;
     height: 100%;
 }
</style>
