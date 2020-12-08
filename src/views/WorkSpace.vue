<template>
  <div class="workspace">
     
    <el-row  >
      <el-col :span="14">
      <el-button type="primary" @click="createWorkspace">Create Workspace</el-button>
      </el-col>
      <el-col :span="10">
         <el-input style="width:60%"  v-model="workspaceSearch" placeholder="workspace search"></el-input>
        <el-button   style="text-align: right;margin: 0 auto;" @click="search()"><i class="el-icon-search"></i></el-button>    
      </el-col>
    </el-row>
     
    <el-divider></el-divider>
    <el-row  >
      <!-- <manager-list :listData="{list,defaultActive}"></manager-list> -->
      <div
      v-for="(item, index) in listDataInt"
      :key="index"
      class="contentCard_w100 flexCol flexColCenter"
    >
      
          <div class="content_h32 flexRow noPadding" style="margin-top: 10px;">
            <div class="content_w68 flexJustStart" style="margin-left: 1%;">
              <div class="flexColCenter w100">
                <a class="w100">
                  <h4 class="itemTitle">{{ item.name }}</h4>
                </a>
              </div>
            </div>
            <div
              class="content_w32 flexJustAround flexColCenter buttonZone"
              style="text-align: right; margin: 0 auto 0 auto;"
            >
            
              <div v-if="active!=item.uid" style="margin-right:25px" class="select" :id="gernerateId(index)">
                <el-button
                  type="info"
                  class="selectBtn"
                  style="display:inline-block;padding:5px;margin-right: 5px;"
                  @click="handleSelect(index,item)"
                  icon="el-icon-star-off"
                  circle
                ></el-button>
                <p style="display:inline-block">Select</p>
              </div>
              <div v-if="active==item.uid" style="margin-right:25px" class="selectOk" :id="gernerateIdOk(index)">
                <el-button
                  type="primary"
                  class="selectBtn"
                  style="display:inline-block;padding:5px;margin-right: 5px;"
                  icon="el-icon-check"
                  circle
                ></el-button>
                <p style="display:inline-block">Selected</p>
              </div>
              <!-- TODO: 工作空间编辑 -->
              <!-- <div
                class="lineButton flexJustStart flexColCenter"
                style="margin-right:30px"
              >
                <i class="fa fa-edit" style="margin-right: 5px"></i>
                <div class="lineButton flexCol">
                  <p style="margin-block-end: 0">Edit</p>
                  <div class="hoverLine"></div>
                </div>
              </div> -->
              <div
              v-if="active!=item.uid&&item.uid!=firstUid"
                class="btn btn-danger btn-round btn-noShadow waves-effect waves-light flexCenter"  @click="handleDelete(index,item)"
              >
                <i class="fa fa-trash-o"></i>
                <p>Delete</p>
              </div>
              <!-- 选中时不能删除工作空间 -->
              <div
              v-if="active==item.uid&&item.uid!=firstUid"
                class="btn btn-danger btn-round btn-noShadow waves-effect waves-light flexCenter  disabled"   
              >
                <i class="fa fa-trash-o"></i>
                <p>Delete</p>
              </div>
            </div>
          </div>
          
          <div
            class="content_h68 flexCol noPadding"
            style="width: 100%;
            background-image: linear-gradient(to right, #fdf9f4 0%, #ebf6f8 100%);height: 100%;"
          >
            <div
              class="flexRow"
              style="width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.2)"
            >
              <div class="flexRow " style="width: 100%;">
                <div class="content_w100" style="padding-top: 21px;margin-left:3%">
                  <div class="flexJustStart flexAlignStrench overviewContainer">
                    <div style="padding-bottom: 15px;">
                      <b style="margin-right: 25px;">Overview:</b>
                    </div>
                    <div>
                      <p class="threeLine" style="">{{ item.description }}</p>
                    </div>
                  </div>
                  <p>
                    <b style="margin-right: 3px">Create Time:</b> {{ item.date }}
                  </p>
                </div>
                <!-- <div class="btn btn-info btn-round btn-noShadow" style="text-align: right;margin: auto;" @click="creatItem(1)">create new <span><i
                                                        class="fa fa-arrow-right"></i></span></div> -->
              </div>
            </div>
          </div>
     
      </div>
    </el-row>
    
  </div>
</template>

<script>
 
 import { mapMutations } from 'vuex';
  export default {
    name:'workspace',
    
    data() {
      return {
       
      list:[],
      listDataInt:[],
      // defaultActive:0,
      workspaceSearch:'',
       active: 0,
      firstUid:''

    }},
    beforeCreate(){
    
    },
    created(){
      console.log('c',this.active)

      this.active= this.$store.state.workSpaceIndex
      console.log('bca',this.active)
    },
    beforeMount(){
      
    },
    mounted(){
      

      let _this=this
      this.$axios.get('/api/workspace')
      .then(res=>{
          if(res.status==200){
            if(res.data.code==0){
            _this.list=res.data.data
            _this.listDataInt=res.data.data
            if(_this.active === 0){
              _this.active = res.data.data[0].uid;
            }            
            _this.firstUid = res.data.data[0].uid;
            }
          }
      });

      
    },
    methods:{
     ...mapMutations(['changeCurrentWorkSpace','changeWorkSpaceIndex']),
       
      createWorkspace(){
        this.$router.push({path:'/form/workspace',query:{type:'WorkSpace'}})
      },
      selectedWorkspace(index, row) {
          console.log(row);
          
        },
        handleSelect(index, row) {
          // 选择工作空间
      
          this.changeCurrentWorkSpace({current:row});
          this.changeWorkSpaceIndex({uid:row.uid});
          this.active = this.$store.state.workSpaceIndex;

          // this.$refs.del.style


        },    
        handleDelete(index, row) {
          let _this = this;
          
          this.$axios.delete('/api/workspace',{
            params:{
              uid:row.uid
            }
          })
          .then(res=>{
            if(res.status==200){
              _this.$message({
                message:"delete success",
                type:"success"
              })
            //listData值删除
            this.listDataInt.splice(index,1);
            this.list.splice(index,1);
            }else{
              _this.message({
                message:"delete failed",
                type:"fail"
              })
            }
          })
        },
        gernerateId(index){
          return "selectBtn" + index;
        },
        gernerateIdOk(index){
          return "selectBtnOk" + index;
        },
      search(){
        //先将数据重置
        this.listDataInt = this.list;
        let _this = this;
        console.log(this.workspaceSearch);
        console.log(this.listDataInt);
        //无数据搜索为展示原始数据
        if(this.workspaceSearch === ''||this.workspaceSearch == null){
          this.listDataInt = this.list;
          return;
        }
        //模糊搜索
        let list = this.listDataInt.filter(item=>item.name.indexOf(_this.workspaceSearch)>=0);
        this.listDataInt = list;
      },
    },

    // watch:{
    //     listData(val){
    //       this.listDataInt = val;
    //     },
        
    //   }
  }
  import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
</script>

<style scoped>
@import "../assets/css/manageList.css";

 
.workspace{
  padding: 20px
}
</style>>

 
