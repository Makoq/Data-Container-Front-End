<template>
  <div>
    <div>
      <el-card style="margin:2%;height:100%">
        <div class="head">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            style=""
            alt="Avatar"
            class="avatar"
          ></el-avatar>
          <span style="display: inherit; margin-top: 5px;">Admin</span>
        </div>

        <el-card
          class="basicInfo"
          style="float:left;width:40%;height:80%;margin:5% 0 0 9%"
        >
          <el-form ref="form" label-width="30%" :label-position="labelPosition">
            <h4
              style="font-size: initial; text-align: center; margin-bottom: 5%;"
            >
              Personal Information
            </h4>
            <el-divider></el-divider>
            <el-form-item label="UserName:">
              <label>Admin</label>
            </el-form-item>
            <el-form-item label="Account:">
              <label>{{ this.userInfo.name }}</label>
            </el-form-item>
            <el-form-item label="Email:">
              <label>{{ this.userInfo.email }}</label>
            </el-form-item>
            <el-form-item label="Token:">
              <label>{{ this.userInfo.token }}</label>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card
          class="serviceInfo"
          style="float:right;width:40%;height:80%;margin:8% 9% 0 0"
        >
          <el-form ref="form" label-width="35%" :label-position="labelPosition">
            <h4
              style="font-size: initial; text-align: center; margin-bottom: 5%;"
            >
              Container Status
            </h4>
            <el-divider></el-divider>
            <el-form-item label="Status:">
              <el-button type="primary" plain @click="checkLocalService()"
                >Check Local Service</el-button
              >
            </el-form-item>
            <el-form-item label="Bind:">
              <el-button type="primary" plain @click="changeBindAccount()"
                >Change Bind Account</el-button
              >
            </el-form-item>
            <el-form-item label="Python:">
              <el-button type="primary" plain @click="changeBindPythonEnv()"
                >Change Python Environment</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
        <!-- <el-button style="margin:4%;float:right" type="success"
          >Edit Information</el-button
        >
        <el-button style="margin:4%;float:right" type="success"
          >Change Password</el-button
        > -->
      </el-card>
    </div>
    <!-- 换绑用户dialog -->
    <el-dialog title="" :visible.sync="changeBindDialog" width="30%">
      <el-form ref="form" label-width="30%" :label-position="labelPosition">
        <h4 style="font-size: initial; text-align: center; margin-bottom: 5%;">
          Change of account
        </h4>
        <el-divider></el-divider>
        <el-form-item label="Past Account:">
          <el-input v-model="pAccount" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="Past Token:">
          <el-input v-model="pToken" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="New Account:">
          <el-input v-model="nAccount"></el-input>
        </el-form-item>
        <el-form-item label="New Token:">
          <el-input v-model="nToken" ref="myOwnToken">
            <el-button
              v-if="nToken===''"
              slot="append"
              icon="el-icon-edit-outline"
              @click="generateToken()"
              class="generate"
            ></el-button>
            <el-button
            v-if="nToken!==''"
              slot="append"
              icon="el-icon-document-copy"
              @click="copyMyToken()"
              class="copyToken"
            ></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changeBindDialog = false">Cancel</el-button>
        <el-button type="primary" @click="changeBindDialog = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
    <!-- 改变python环境dialog -->
    <el-dialog title="" :visible.sync="changePythonDialog" width="50%">
      <el-form ref="form" label-width="30%" :label-position="labelPosition">
        <h4 style="font-size: initial; text-align: center; margin-bottom: 5%;">
          Change of python environment
        </h4>
        <el-divider></el-divider>
        <el-form-item label="Past Python Environment:" label-width="200px">
          <el-input v-model="pPythonEnv" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="New Python Environment:" label-width="200px">
          <el-input v-model="nPythonEnv"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePythonDialog = false">Cancel</el-button>
        <el-button type="primary" @click="confirmChangePythonEnv()"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import DecryptJS from "../utils/cycrypto.js";
import ws from "../utils/websocket.js";
export default {
  data() {
    return {
      labelPosition: "left",
      userInfo: {},
      changeBindDialog: false,
      changePythonDialog:false,
      pAccount: "",
      pToken: "",
      nAccount: "",
      nToken: "",
      pPythonEnv:'',
      nPythonEnv:''
    };
  },
  methods: {
    ...mapMutations(['changerelatedUsr','changePythonEnv']),
    onSubmit() {
      console.log("submit!");
    },
    getUserInfo() {
      let _this = this;
      // let para = {
      //     uid: localStorage.getItem('Authorization')
      // }
      let uid = DecryptJS.Decrypt(
        localStorage.getItem("relatedUsr").split(",")[0]
      );
      _this.$axios
        .get("/api/getUserInfo", {
          params: {
            uid: uid,
          },
        })
        .then((res) => {
          console.log(res);
          _this.userInfo = res.data.data;
          _this.userInfo.token = localStorage
            .getItem("relatedUsr")
            .split(",")[1];
          console.log(_this.userInfo);
        });
    },
    checkLocalService() {
      ws(this);
      console.log(this.$root.$el.myWS);
    },
    changeBindAccount() {
      this.changeBindDialog = true;
      console.log(this.userInfo);
      this.pAccount = this.userInfo.name;
      this.pToken = this.userInfo.token;
      this.nAccount = '';
      this.nToken = '';
    },
    generateToken() {
      var _this = this;
      //通过门户的email关联用户
      _this.$axios
        .put("/api/connectusr", {
          email: _this.nAccount,
        })
        .then((res) => {
          if (res.data.code === 0) {
            _this.$message({
              message: "Change Account Success!",
              type: "success",
            });
            //将登录用户信息存入vuex
            _this.changerelatedUsr({
              relatedUsr: res.data.info.oid + "," + res.data.info.email,
            });
            _this.nToken = res.data.info.email;
            //更新userInfo
            _this.userInfo.name = res.data.info.name;
            _this.userInfo.email = DecryptJS.Decrypt(res.data.info.email);
            _this.userInfo.token = res.data.info.email;

            // this.$router.push("/Login");
            _this.settingDialog = false;
          } else {
            //门户中找不到用户
            if (res.data.message == "no usr in portal") {
              _this.$message({
                message: "no usr in portal! ",
                type: "fail",
              });
            } else {
              //其他错误
              _this.$message({
                message: "connect failed ",
                type: "fail",
              });
            }
          }
        });
    },
    copyMyToken() {
      this.$refs.myOwnToken.select();
      if(document.execCommand('copy')){
        document.execCommand('copy');
      }
    },
    changeBindPythonEnv(){
      this.changePythonDialog = true;
      this.pPythonEnv = localStorage.getItem('pythonEnv');
      this.nPythonEnv = '';
    },
    confirmChangePythonEnv(){
      let _this = this;
      if(_this.nPythonEnv == undefined||_this.nPythonEnv === ''){
        _this.$message({
          message:'New Python Environment Is Empty!',
          type:'error'
        })
        return;
      }
      _this.$axios.post('/api/changePythonEnv',
      {
        nPythonEnv:_this.nPythonEnv,
      })
      .then((res)=>{
        if(res.data.code === -2){
          _this.$message({
            message:'New Python Environment Is Not Exist!',
            type:'error'
          })
        }else{
          _this.changePythonEnv({pythonEnv:_this.nPythonEnv});
          _this.changePythonDialog = false;
          _this.$message({
            message:'Change Python Environment Success!',
            type:'success'
          })
        }
      })
    }
  },
  mounted() {
    this.getUserInfo();
  },
};
</script>

<style>
ul li {
  list-style: none;
}
/* body{font-family:"微软雅黑";} */
.info {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin: 10px;
  font-size: initial;
}
.avatar {
  /* display: inline-block; */
}
.head {
  text-align: center;
}
</style>
