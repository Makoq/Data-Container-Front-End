<template>
  <el-row style="height:100%">
    <el-col :span="24" class="login-back">
        <el-card class="login">
            <div slot="header" class="clearfix">
              <img src="@/assets/dataServiceContainer.png"  style="width:200px;height:60px">
                
            </div>
           <el-form :model="ruleForm" status-icon   ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="Account:" prop="account">
                <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Password:" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
        
            <el-form-item>
                <el-button  type="primary" @click="submitForm()">Login</el-button>
                <el-button @click="Register" type="success">Register</el-button>
            </el-form-item>
            </el-form>
             
        </el-card>
        
    </el-col>
  </el-row>

</template>

<script>

// import { Session } from 'inspector';
import { mapMutations } from 'vuex';
  export default {
    data() { 
      return {
        ruleForm: {
          pass: '',
          account:'',
          loginUser:''
          
        },
        
      };
    },
    computed:{
        
    },
    methods: {
        ...mapMutations(['changeLogin']),
      submitForm(){
          var _this=this
         _this.$axios.post('/api/login', 
                  _this.ruleForm
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
                    console.log(_this)
                    _this.changeLogin({ Authorization: res.data.message.token });
                    setTimeout(() => {
                        _this.$router.push('/')
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
