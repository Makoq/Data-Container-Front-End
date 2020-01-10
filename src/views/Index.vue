<template>
  <div class="index">
    <el-row style="height: 63.4px;border: 1px solid black">
        <nav-header></nav-header>
    </el-row>  
    <el-row style="height:  calc(100vh - 95px);width:100%; display:flex">
      <div   style="height:100%;minwidth:185px" ref="leftMenu">
        <left-Menu></left-Menu> 
      </div>
      <div   style="height:100%;" ref="content">
        <el-row style="height:30px"> 
        <el-breadcrumb separator="/" style=" margin: 10px;" v-for="(it,k) in breadLoadName" :key="k">
          <el-breadcrumb-item    ><span>{{it}}</span></el-breadcrumb-item>          
        </el-breadcrumb>
        </el-row>
        <router-view style="height:calc(100% - 30px);overflow-y:  scroll;width:100%"> </router-view>
      </div>
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
import { mapGetters,mapState } from 'vuex'
 
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
      breadLoadName:[]
    }
  },
  watch:{
    //监听菜单折叠变化
    getMenuCollapse:function(){
     //从vuex中取值，判断是否折叠
      this.menuColState()
    },
    $route(to,from){
      //监听路由变化，并进一步改变面包屑，我看网上是这么搞得，但可能还是不很优雅
      this.breadLoad()

    },


  },
  computed:{
     //计算属性，描述菜单是否折叠状态
    getMenuCollapse(){
      return this.$store.state.menuCollapse
    }
  },
  methods:{
    breadLoad(){
      let bread=this.$route.name.split('/')
      let _this=this
      _this.breadLoadName=[]
      bread.forEach(v=>{
        if(v!=''){
          _this.breadLoadName.push(v)
        }
      })
      console.log(bread)

    },
    //已经vuex数据，判断当前菜单项的状态
    menuColState(){
      let menuState=this.$store.state.menuCollapse
     
      if(menuState==='100%'){
         
        this.$refs.leftMenu.style.width='15%'
        this.$refs.content.style.width='85%'

      }else{

        this.$refs.leftMenu.style.width='64px'
        this.$refs.content.style.width='calc(100% - 64px)'

      }

    }
  },
  mounted(){
    //初始化面包屑
      this.breadLoad()

      console.log(this.$refs)
      //初始化时依据vuex中数据初始化菜单项状态
      this.menuColState()

  }

}
</script>
<style scoped>
.index{
  height: 100%;
  min-width: 990px;
}
span{
 font-family: 'Times New Roman', Times, serif;
    font-size: medium

}
</style>>
