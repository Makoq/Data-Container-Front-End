<template>
  <div class="index">
<el-row>
    <nav-header></nav-header>
</el-row>  
<el-row style="height: 100%;">
  <el-col   style="height:100%;width:20%">
    <left-Menu></left-Menu> 
  </el-col>
  <el-col   style="height:100%;width:80%">
    <router-view style="overflow:scroll;width:100%"> </router-view>
  </el-col>
</el-row>
<el-row>
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
  }
}
</script>
<style scoped>
.index{
  height: 100%;
}
</style>>
