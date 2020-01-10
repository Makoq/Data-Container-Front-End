<template>
  <div>
    123
  </div>
</template>

<script>
  export default {
    data: () => ({
      
    }),
    created(){
      this.$axios.get('/api/posts')
        .then(function(response){
          console.log(response.data);
        })
        .catch(function(err){
          console.log(err);
        });
    }
  }
</script>

<style>

</style>
