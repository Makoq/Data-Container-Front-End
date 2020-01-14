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
       
      list:[{
          name: '2016-05-02',
         
        }, {
          name: '2016-05-04',
       
        }, {
          name: '2016-05-01',
          
        }, {
          name: '2016-05-03',
          
        }]
    }),
    mounted(){
      console.log(this.$route)
    },
    methods:{
      createWorkspace(){
        if(this.$route.query.type==='File'){
          this.$router.push({path:'/form/workspace',query:{type:'FileWorkSpace'}})
        }else if(this.$route.query.type==='Udx'){
          this.$router.push({path:'/form/workspace',query:{type:'UdxWorkSpace'}})

        }
        
      }
    }





     
  }
</script>

<style   scoped>
.workspace{
  padding: 20px
}
</style>>

 
