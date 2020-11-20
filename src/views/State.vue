<template>
   <div >
    

<el-card class="box-card">
       <div slot="header" class="clearfix">
         
         <h2>CPU and memory usage</h2>
      </div>
     <!--     系统状态显示-->
     <div id="systemChart" ref="chart"></div>
 </el-card>

 <el-card class="box-card">
      <div slot="header" class="clearfix">
         <h2>Browser</h2>
      </div>
     <span><b>Type:</b> {{broInfo.type}}</span>
     <span><b>Version:</b> {{broInfo.version}}</span>
     
</el-card>
     <el-card class="box-card">
      <div slot="header" class="clearfix">
         
        <h2>Local System Information</h2>
      </div>
     <span><b>Hostname:</b> {{sysInfo.hostname}}</span>
     
     <span><b>Type:</b> {{sysInfo.osType}}</span>
     <span><b>Version:</b> {{sysInfo.release}}</span>
     <span><b>Memory:</b> {{sysInfo.totalMem}}G</span>
     <span><b>Temporary directory:</b> {{sysInfo.tmpdir}}</span>
     </el-card>
     

   </div>
</template>
<script>
import echarts from 'echarts';
import Browser from '../../public/js/echart/browser';

export default {
  data() {
    return {
      // 系统状态显示所需参数
      time: [0.1, 0.2, 0.3, 0.4, 0.2, 0.6, 0.1, 0.2, 0.9, 0.5],
      cpu: [0.1, 0.4, 0.1, 0.3, 0.8, 0.7, 0.5, 0.4, 0.6, 0.7],
      mem: [0.1, 0.2, 0.3, 0.4, 0.2, 0.6, 0.1, 0.2, 0.9, 0.5],
      sysInfo: {
        hostname: '',
        osType: '',
        release: '',
        tmpdir: '',
        totalMem: '',
      },
      broInfo: {
        type: '',
        version: '',
      },
    };
  },
  mounted() {
    this.drawLine();
    this.$axios.get('/api/systemInfo').then((res) => {
      const info = res.data;
      this.sysInfo.hostname = info.hostname;
      this.sysInfo.osType = info.osType;
      this.sysInfo.release = info.release;
      this.sysInfo.tmpdir = info.tmpdir;
      this.sysInfo.totalMem = info.totalMem;
    });
    this.broInfo.type = Browser.client.name;
    this.broInfo.version = Browser.client.version;
  },
  methods: {
    addData(shift) {
      try {
        this.$axios.get('/api/systemStatus')
          .then((res) => {
            this.time.push(res.data.timer);
            this.mem.push(res.data.mem);
            this.cpu.push(res.data.cpu);
          });
      } catch (e) {
        console.log(e);
      }
      if (shift) {
        this.time.shift();
        this.mem.shift();
        this.cpu.shift();
      }
    },
    drawLine() {
      const myChart = echarts.init(this.$refs.chart);
      myChart.setOption({
        // title: { text: 'cpu及内存占用率' },
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['Memory usage', 'CPU utilization'],
        },
        xAxis: [{
          boundaryGap: false,
          data: this.time,
          splitLine: { show: false },
          axisLabel: { interval: 0 },
        }],
        yAxis: {},
        series: [
          {
            name: 'Memory usage',
            type: 'line',
            data: this.mem,
            smooth: true,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#8ec6ad',
                }, {
                  offset: 1,
                  color: '#ffe',
                }]),
              },
            },
          },
          {
            name: 'CPU utilization',
            type: 'line',
            data: this.cpu,
            smooth: true,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#505765',
                }, {
                  offset: 1,
                  color: '#ffe',
                }]),
              },
            },
          },
        ],
      });
      // 开始轮询获取数据
      window.setInterval(() => {
        setTimeout(() => {
          const urlHash = window.location.pathname ;
          if (urlHash === '/state') {
            this.addData(true);
            myChart.setOption({
              xAxis: { data: this.time },
              series: [
                {
                  data: this.mem,
                },
                {
                  data: this.cpu,
                },
              ],
            });
          }
        }, 0);
      }, 10000);
    },
  },
};
</script>
<style >
  #systemChart {
    /* margin-top: 100px; */
    width: 100%;
    height: 500px;

  }
  span {
    margin-right: 30px;
  }
</style>
