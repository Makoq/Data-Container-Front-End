<template>
  <div class="index">
    <el-row style="height: 63.4px;">
        <nav-header></nav-header>
    </el-row>  
    <el-row style="height:  calc(100vh - 95px);">
      <el-col    style="height:100%;width:15%;minwidth:185px" ref="leftMenu">
        <left-Menu></left-Menu> 
      </el-col>
      <el-col   style="height:100%;width:85%" ref="content">
        <router-view style="height:100%;overflow-y:scroll;width:100%"> </router-view>
      </el-col>
    </el-row>
    <el-row style="height: 30px">
        <bottom-footer></bottom-footer>
    </el-row>
  </div>
</template>

<script>

import NavHeader from '@/components/NavHeader'
import LeftMenu from '@/components/LeftMenu'
import BottomFooter from '@/components/BottomFooter'
 
export default {
  name: 'index',
  components: {
    NavHeader,
    LeftMenu,
    BottomFooter,
  
  },
  data () {
    return {
      //
    }
  },
  watch:{
    getMenuCollapse:function(){
      let menuState=this.$store.state.menuCollapse
      console.log("s",menuState)
      if(menuState==='100%'){
        console.log(this.$refs)
        this.$refs.leftMenu.$el.style.width='15%'
        this.$refs.content.$el.style.width='85%'

      }else{
        this.$refs.leftMenu.$el.style.width='64px'
        this.$refs.content.$el.style.width='calc(100% - 64px)'

      }

    }
  },
  computed:{
    getMenuCollapse(){
      return this.$store.state.menuCollapse
    }
  }
}
</script>
<style scoped>
.index{
  height: 100%;
  min-width: 900px;
}
</style>>
