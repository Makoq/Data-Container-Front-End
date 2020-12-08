<template>
  <div>
    
    <div class="block">
      <!-- <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination> -->
    </div>
  </div>
</template>

<script>
 
import { mapMutations } from 'vuex';

export default {
  props: {
    listData:{
      type:Object,
      default:{
         
      }
    }

  },
  data() {
    return {
      active: 0,
      listDataInt:this.listData.list,

    };
  },

  created(){
    console.log('creative',this.active)
    
  },
  beforeMount(){
     this.active=0
     console.log('nefore mounted',this.active)
  },
  mounted() {
    this.active = this.$store.state.workSpaceIndex.index;
  },
  methods: {
     ...mapMutations(['changeCurrentWorkSpace','changeWorkSpaceIndex']),
    selectedWorkspace(index, row) {
      console.log(row);
      
    },
    handleSelect(index, row) {
      // 选择工作空间
   
      this.changeCurrentWorkSpace({current:row});
      this.changeWorkSpaceIndex({index:index});
      this.active = this.$store.state.workSpaceIndex.index;
    },    
    handleDelete(index, row) {
      let _this = this;
      console.log(this.listDataInt);
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
  },
  watch:{
    listData(val){
      this.listDataInt = val;
    },
    active(val){
      this.active = val
    }
  }
};
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
</script>

<style>
@import "../assets/css/manageList.css";
</style>