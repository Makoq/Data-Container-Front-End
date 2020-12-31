<template>
  <div>
     <iframe width="100%" height="100%" src="http://172.21.213.4:1708/#/console/chart"></iframe>
     <!-- <iframe width="100%" height="100%" src="http://172.21.213.174:8080/dataApplication/task//7b26644d-3a60-4c45-b0c1-657f6d455405/7d121b5f-e347-4d49-9421-31ccfcbfb7fc?account=123@123.com&password=65829e542dd151f443cc997270c61e78c042a82d687cc13844bf2c1813714600" href="iframe"></iframe> -->
  </div>
</template>

<script>

  export default {
    data: () => ({
      
    }),
    mounted(){
      // window.top.location = "http://172.21.213.4:1708";
      console.log(this.$refs.iframe)

    }
     
  }
</script>

<style>

</style>
