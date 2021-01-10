<template>

  <div class="worldcluster" >
      <div class="title"> 
       <h1 style="z-index:999">Worldwide Insitu Data Service Nodes</h1>
      </div>
    <div 
    v-loading="loading"
    id="map" ref="mapcontainer"  >    
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import xml2js from 'xml2js';
import request from 'request';

const parser=new xml2js.Parser()
  export default {
    data: () => ({
      loading:false,
      center:[]
    }),
     mounted () {
         let _this=this
                    this.init()

   
     
   
  },
  methods: {

    init () {
            this.loading=true
            mapboxgl.accessToken = 'pk.eyJ1IjoibGFuciIsImEiOiJjanl1N3M1N2YwOGY2M21wOXYwYTllaDRlIn0.XdQ1hnXfGordCsUueh7VLA'
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [96.95, 36.78], 
                zoom: 1,
            })
           
             
            //   console.log(map)
            let _this=this
            let onlineNodes=[]
            _this.$axios.get('http://111.229.14.128:8898/onlineNodes')
            .then(res=>{
                let re=parser.parseString(res.data, function (err, result) {
                    if(result.root.serviceNodes[0].onlineServiceNode==undefined) return
                    for(let node of result.root.serviceNodes[0].onlineServiceNode){
                        onlineNodes.push(node)
                    }

                    _this.adddNodesMaker(_this.map,onlineNodes)
                     console.log(result)
                })
               
            })

        }, 
        async adddNodesMaker(map,nodes){
            this.center=[]
            for(let n of nodes){
                await this.markerToMap(map,n.ip)
            }
             this.loading=false
             map.setCenter(this.center);
        },
        markerToMap(map,ip){
            let _this=this
           return new Promise((reslve,rej)=>{
               request('https://restapi.amap.com/v3/ip?key=5c10ac9bf0d8d4a7481547e1e8bb461b&ip='+ip[0],(err,res,data)=>{
                   let r=JSON.parse(data)
                   if(r.rectangle!=undefined&&r.rectangle.length!=0){
                            let coors=r.rectangle.split(';')
                            let c1=coors[0].split(',')
                            let c2=coors[1].split(',')

                            let CityCoor=[Number(c1[0])+(Number(c2[0])-Number(c1[0]))/2,Number(c1[1])+(Number(c2[1])-Number(c1[1]))/2]
                            if(_this.center.length=0){
                                _this.center=CityCoor
                            }
                            new mapboxgl.Marker({color:'red'})
                            .setLngLat(CityCoor)
                            .addTo(map);
                            reslve(CityCoor)
                    }else{
                        reslve()
                    }
               })
              
           }) 
        }

  }
     
  }
</script>

<style scoped>
#map { position: absolute; top: 0; bottom: 0; width: 100%;z-index: 0; }
.title{
    position: absolute;
     
    z-index: 999;
}
</style>
