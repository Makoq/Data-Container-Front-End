<template>
  <div class="about">
    <div style="text-align: center">
       
      <video class="v" 
        autoplay loop muted
        tabindex="2" 
        mediatype="video" 
        
         >
              <source src="../assets/video/earth.mp4"  type="video/mp4"  />
        </video>
    </div>

  </div>
</template>

<script>
  export default {
    data: () => ({
      
    }),
     
  }
</script>

<style>
p{
  color: aliceblue;
}
.about{
  background-color: black;
  /* height: 1000px;
  
 background-image: url('../../public/img/bk.png');
    height: 100%;
    background-image: url(../../public/img/earth.gif);
    background-size:100% 190%;
    -o-background-size: 100% 100%;
    -webkit-background-size:90% 90%;
    background-size:center; */
}
.v{
  position: inherit;
    width: auto;
    height: -webkit-fill-available;
  z-index:-9999
}
</style>
