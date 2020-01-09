<template>
  <div class="home">
  <div v-for="(item,key) in 1000" :key="key">{{item}}</div>
  </div> 
</template>

<script>
   

  export default {
     
  }
</script>

<style scoped>
.home{
  height: 1000px;
}
</style>>
