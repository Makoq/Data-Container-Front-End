<template>
  <div class="index">
    <el-row style="height: 63.4px;border: 1px solid black;min-width:1080px">
        <nav-header></nav-header>
    </el-row>  
    <el-row style="height:  calc(100vh - 95px);width:100%; display:flex">
      <div   style="height:100%;minwidth:185px;" ref="leftMenu">
        <left-Menu></left-Menu> 
      </div>
      <div   style="height:100%;" ref="content">
        <el-row style="height:30px" > 
        <el-breadcrumb separator="/" style=" margin: 10px;" v-for="(it,k) in breadLoadName" :key="k">
          <el-breadcrumb-item    ><strong>{{it}}</strong></el-breadcrumb-item>          
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

//组件懒加载
const NavHeader =()=>import('@/components/NavHeader')
const LeftMenu =()=>import('@/components/LeftMenu')
const BottomFooter =()=>import('@/components/BottomFooter')


import { mapMutations } from 'vuex';
import { mapGetters,mapState, } from 'vuex'
 
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
  mounted(){
 
  },
  methods:{
    ...mapMutations(['changeCurrentWorkSpace']),
    breadLoad(){
      let bread=this.$route.name.split('/')
      let _this=this
      _this.breadLoadName=[]
      bread.forEach(v=>{
        if(v!=''){
          _this.breadLoadName.push(v)
        }
      })
   

    },
    //已经vuex数据，判断当前菜单项的状态
    menuColState(){
      let menuState=this.$store.state.menuCollapse
     
      if(menuState==='100%'){
         
        this.$refs.leftMenu.style.width='205px'
         

        this.$refs.content.style.width='calc(100% - 205px)'

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


         let _this=this
      if(this.$store.state.currentWorkSpace==undefined){
         this.$axios.get('/api/initWorkSpace')
        .then(res=>{
          if(res.data.code==0){
              //将关联用户信息包村到vuex中
              _this.changeCurrentWorkSpace({current:res.data.data})
          }
        })
      }
     

  }

}
</script>
<style scoped>
.index{
  height: 100%;
  min-width: 1190px;
}
span{
 font-family: 'Times New Roman', Times, serif;
    font-size: medium
}

</style>>
