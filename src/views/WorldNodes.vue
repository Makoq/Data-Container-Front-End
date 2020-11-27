<template>
  <div class="worldcluster">
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
      loading:false
    }),
     mounted () {
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
            _this.$axios.get('http://localhost:8898/onlineNodes')
            .then(res=>{
                let re=parser.parseString(res.data, function (err, result) {
                    if(result.serviceNodes.onlineServiceNodes==undefined) return
                    for(let node of result.serviceNodes.onlineServiceNodes){
                        onlineNodes.push(node)
                    }

                    _this.adddNodesMaker(_this.map,onlineNodes)
                     console.log(result)
                })
               
            })

        }, 
        async adddNodesMaker(map,nodes){

            for(let n of nodes){
                await this.markerToMap(map,n.ip)
            }
             this.loading=false
        },
        markerToMap(map,ip){

           return new Promise((reslve,rej)=>{
               request('https://restapi.amap.com/v3/ip?key=5c10ac9bf0d8d4a7481547e1e8bb461b&ip='+ip[0],(err,res,data)=>{
                   let r=JSON.parse(data)
                   if(r.rectangle!=undefined){
                            let coors=r.rectangle.split(';')
                            let c1=coors[0].split(',')
                            let c2=coors[1].split(',')

                            let CityCoor=[Number(c1[0])+(Number(c2[0])-Number(c1[0]))/2,Number(c1[1])+(Number(c2[1])-Number(c1[1]))/2]

                            new mapboxgl.Marker({color:'red'})
                            .setLngLat(CityCoor)
                            .addTo(map);
                            reslve(CityCoor)
                    }
               })
              
           }) 
        }

  }
     
  }
</script>

<style scoped>
#map { position: absolute; top: 0; bottom: 0; width: 100%; }
</style>
