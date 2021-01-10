<template>
  <div id="App">
    <router-view></router-view>
  </div>
</template>

<script>
import ws from './utils/websocket.js'
export default {
  name: 'App',
   
  data () {
    return {
      //
    }
  },
  mounted(){
    //建立与中转服务器的websocket
    ws(this)
  },
  beforeDestroy(){
    console.log("destroyed")
    

  },
  destroyed(){
    console.log("destroyed")
    
  }
}
</script>
<style scoped>
#App{
  margin: 0px;
  padding: 0px;
  height: 100%;;
}
 
</style>
