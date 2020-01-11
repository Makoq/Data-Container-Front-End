<template>
  <div class="workspace">
     
    <el-row  >
      <el-button type="primary" @click="createWorkspace">Create Workspace</el-button>
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
    methods:{
      createWorkspace(){
        this.$router.push('/form/workspace')
      }
    }





     
  }
</script>

<style   scoped>
.workspace{
  padding: 20px
}
</style>>

 
