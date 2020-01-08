<template>
  <el-row  style="height:100%">
    <el-col :span="24" class="register-back">
         <el-card class="register">
             <div slot="header" class="clearfix">
              <img src="@/assets/dataServiceContainer.png"  style="width:200px;height:60px">
                
            </div>
           <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            
            <el-form-item label="Account" prop="account">
                <el-input type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
            </el-form-item>


            <el-form-item label="Password" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Confirm " prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

            </el-form>
         </el-card>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    data() {
        var checkAccount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('not empty'));
        }
        if (value.length>20) {
            callback(new Error('account not more than 20 words'));
          } else{
              callback()
          }
       
      };
      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('not empty'));
        }
        let reg=new RegExp(/^[\w-]+@\w+\.\w+$/);

        if (!reg.test(value)) {
        callback(new Error('input correct email address'));
        } else{
            callback()
        } 
       
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('not empty'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('not empty'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('password is not same as the former'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          account:'',
          pass: '',
          checkPass: '',
          email: '',
          account:''
        },
        rules: {
            
          account:[
              { validator: checkAccount, trigger: 'blur'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let _this=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
             
             _this.$axios.post('/api/register', 
                  _this.ruleForm
              )
             .then((res)=>{
                 if(res.status===200){
                     _this.$message({
                        message: 'Success! Go to login right now..',
                        type: 'success'
                    });
                    setTimeout(() => {
                        _this.$router.push('/Login')
                    }, 1000);
                    
                 }else{
                     _this.$message({
                        message: 'error!',
                        type: 'warning'
                    });

                 }

                
             })
          } else {
            alert("input error!")
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
 .register-back{ 
     background-color:beige;
     height: 100%;
 }
 .register{
     margin:12% 35%; 
     min-width: 400px;
 }
</style>
