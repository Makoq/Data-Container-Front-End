<template>
  <div class="workspace">
     
    <el-row  >
      <el-col :span="14">
      <el-button type="primary" @click="createWorkspace">Create Workspace</el-button>
      </el-col>
      <el-col :span="10">
         <el-input style="width:60%"  v-model="workspaceSearch" placeholder="workspace search"></el-input>
        <el-button   style="position:fixed;float:left"><i class="el-icon-search"></i></el-button>    
      </el-col>
    </el-row>
     
    <el-divider></el-divider>
    <el-row  >
      <manager-list :listData="list"></manager-list>
    </el-row>
    
  </div>
</template>

<script>
import ManagerList from '../components/ManagerList'
 
  export default {
    name:'workspace',
    components:{
        ManagerList
    },
    data: () => ({
       
      list:[],
      workspaceSearch:''
    }),
    mounted(){
      let _this=this
      this.$axios.get('/api/workspace')
      .then(res=>{
          if(res.status==200){
            if(res.data.code==0){
            _this.list=res.data.data

            }
          }
      })
    },
    methods:{
      createWorkspace(){
        this.$router.push({path:'/form/workspace',query:{type:'WorkSpace'}})
       
        
      }
    }





     
  }
</script>

<style   scoped>
.workspace{
  padding: 20px
}
</style>>

 
