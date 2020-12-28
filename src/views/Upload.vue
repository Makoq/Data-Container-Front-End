<template>
  <div>
      <div style="margin:20px">
          <h2>Upload Large Files</h2>
          <br>
            <el-row>
                <el-col :span="4">
                <input id="uppic"    type="file" multiple @change="selectedFiles()"   ref="upload">
                    <label for="uppic">
                        <div id="wrapper">
                            <div id="cell">
                                <span>
                                
                                <i class="el-icon-folder-opened"></i>
                                Choose  Files
                                </span>
                            </div>
                        </div>
                    
                    </label>
                </el-col>
                <el-col :span="10" :offset="1">
                <el-button id="userbtn" class="bg-main tc userbtn" type="success" @click="upload">
                   <i class="el-icon-upload"></i>
                    Upload
                    </el-button>
                </el-col>
            </el-row>
            <el-row v-if="fileList.length!=0">
                 <el-table
                    :data="fileList"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="Name"
                        width="500">
                    </el-table-column>
                    <el-table-column
                        prop="size"
                        label="Size (KB)"
                        width="180">
                    </el-table-column>
                    
                </el-table>
               
            </el-row>
            <el-row>
                <el-col :span="20">
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
                        
                </el-col>

            </el-row>
       </div>
         
        
  </div>
</template>

<script>
import async from 'async'
  export default {
    data: () => ({
      percentage:0,
      fileList:[]
    }),
    methods:{
         upload(){
            this.percentage=0
            let _this=this

            for(let k in this.$refs.upload.files){
                let file=this.$refs.upload.files[k],//上传文件主体
                name = file.name,        //文件名
                size = file.size,        //总大小
                succeed = 0;  //当前上传数
                let shardSize = 2 *1024*1024,    //以2MB为一个分片
                shardCount = Math.ceil(size / shardSize);  //总片数

                /*生成上传分片文件顺充，通过async.eachLimit()进行同步上传
                    attr里面是[0,1,2,3...,最后一位]    
                */
                let attr=[];
                for(let i=0;i<shardCount;++i){
                    attr.push(i);
                }
                async.eachLimit(attr,1,async function(item,callback){
                    let i=item;
                    let start = i * shardSize,//当前分片开始下标
                    end = Math.min(size, start + shardSize);//结束下标

                    //构造一个表单，FormData是HTML5新增的
                    let form = new FormData();
                    form.append("data", file.slice(start,end));  //slice方法用于切出文件的一部分
                    form.append("name", name);//文件名字
                    form.append("total", shardCount);  //总片数
                    form.append("index", i + 1);   //当前片数'

                
                    await _this.$axios.post('http://111.229.14.128:8899/large',form,{
                        timeout: 120*1000
                    })
                    .then(res=>{
                        ++succeed;
                            
                            /*返回code为0是成功上传，1是请继续上传*/
                            if(res.data.code==0){
                                console.log(res.data.mssg);
                                 _this.percentage=0
                                  _this.fileList.shift()
                                 _this.$message({
                                   type:'success',
                                   message:'upload finish'+file.name,
                                   showClose:true,
                                   duration:0,
                               })
                                
                                _this.$notify({
                                    title: 'Download: '+file.name,
                                    dangerouslyUseHTMLString: true,
                                    message: '<a href='+'http://111.229.14.128:8899/data?uid='+res.data.data.source_store_id+'>'+file.name+'</a>',
                                    duration: 0
                                });


                            }else if(res.data.code==1){

                                console.log(res.data.msg);
                            }
                            //生成当前进度百分比
                            _this.percentage=Math.round(succeed/shardCount*100);
                            /*如果是线上，去掉定时，直接callback()，
                            这样写是为方便，本地测试看到进度条变化
                            因为本地做上传测试是秒传，没有时间等待*/
                            // setTimeout(callback,50);
                            callback()
                    })

                },function(err){
                    console.log('上传成功');
                });     



            }

           




        },
        selectedFiles(){
            console.log('selected',this.$refs.upload.files)
            this.fileList= [...this.$refs.upload.files]
        }
        

    },
    watch:{
        
    }
     
  }
</script>

<style scoped>
#uppic {
    width: 0.1px; 
    height: 0.1px; 
    opacity: 0; 
    overflow: hidden; 
    position: absolute; 
    z-index: -1;
}

.el-row {
    margin-bottom: 20px;
}
label{
    color: aquamarine;
    background-color: #796e02e3;
    height: 40px;
    display: block;
    text-align: center;
}
#wrapper {display:table;height:40px;margin:0 auto;color:rgb(255, 255, 255);}
#cell{display:table-cell; vertical-align:middle;}
</style>
