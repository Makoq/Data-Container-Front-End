<template>
  <div class="instances">
   <el-row  class="instanceBtn">
       <el-col :span="14">
        <!-- //挑选工作空间 -->
        <el-button type="primary"  @click="selectWorkspaceList = true">Select Workspace</el-button>
        <el-button   type="warning" @click="newFolder" >New Floder</el-button>
        <el-button   type="success"  @click="newFileData">New File</el-button>
       </el-col>
       <el-col :span="10">
        <el-input style="width:60%"  v-model="workspaceSearch" placeholder="workspace search"></el-input>
        <el-button   style="position:fixed;float:left"><i class="el-icon-search"></i></el-button>       
       </el-col>
      <el-dialog
        title="Workspace Select"
        :visible.sync="selectWorkspaceList"
        width="500px"
         >
        <el-row>
                <el-col :span="24">
                    <el-input v-model="workspaceSearch" style="width:300px" placeholder="workspace search"></el-input>
                    <el-button   style="position:fixed;float:left"><i class="el-icon-search"></i></el-button>
                </el-col>
        </el-row>
        <div style="height:400px;overflow-y:scroll;margin-top:10px">
           
         <el-row v-for="(it,key) in 100" :key="key">
             <el-col :span="14">{{it}}</el-col>
             <el-col :span="10">
                <el-button type="text">xxxxx</el-button>
             </el-col>
             
         </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            
            <el-button type="primary" @click="selectWorkspaceList = false">ok</el-button>
        </span>
        </el-dialog>
    </el-row>
     
    
    <el-row style="height:30px;margin-left: 20PX;margin-top:10px"> 
            <el-button v-if="folderLayer.length===1" size="mini" type="text" disabled>  All file</el-button>
           <el-button  v-else size="mini" type="text"  @click="backUpperFolder"  >Upper Folder</el-button>
           <el-divider v-if="folderLayer.length>1" direction="vertical"></el-divider>
           <span v-if="folderLayer.length>1">&nbsp;{{folderLayer.join(' / ')}}</span>
    </el-row>
   
    <el-row  >
        <el-row  s>
            <el-col :span="2"    :offset="2" > 
                    <span  >  
                       &nbsp;Name
                    </span> 
            </el-col>

            <el-col :span="1" :offset="3"   > 
                    <span  >  
                       Size
                    </span> 
            </el-col>

            <el-col :span="1" :offset="3"   > 
                    <span  >  
                      Date
                    </span> 
            </el-col>

             <el-col :span="1" :offset="3"   > 
                    <span  >  
                      Operate
                    </span> 
            </el-col>
           
        </el-row>
        <el-divider ></el-divider>
       <!-- <el-card v-for="(it,key) in 10" :key="key" shadow="hover" style="margin-top:2px">{{key}}</el-card> -->
      
            <el-row  v-for="(it,key) in list" :key="key" class="item">
                <el-col :span="1" :offset="1">
                   <img  v-if="it.type==='folder'" src="../assets/folder.png" width="28" height="30" alt="Safari" title="Safari">

                    <img v-if="it.type==='file'" src="../assets/zip.png" width="28" height="30" alt="Safari" title="Safari">
                </el-col>
                <el-col :span="4" style="height:100%"> 
                   
                    <el-row v-if="it.name==='NewFolder'&&it.type==='folder'" style="height:100%;z-index:99">
                    <el-input id="renameInput" autofocus="autofocus" v-model="newFloderName" size="small" style="height:100%"></el-input ><el-button @click="renameFolder" size="small"  style="position:fixed;float:left">√</el-button><el-button @click="cancel" size="small" style="position:fixed;float:left;margin-left:40px">x</el-button>
                    </el-row>
                    
                    <a v-else-if="it.type==='folder'" class="floderName" type="text"  @click="intoFolder(it.name)"  ref="floderName">
                        {{it.name}}
                    </a>
                    <span class="dataName"  v-if="it.type==='file'">{{it.name}}</span>

                </el-col>

                <el-col :span="3" :offset="1"> 
                    
                    <span class="dataName"  v-if="it.type==='file'">{{it.size}}</span>
                    <span v-else>&nbsp;</span>

                </el-col>

                <el-col :span="4" :offset="1"> 
                    
                    <span class="dataName"   >{{it.date}}</span>

                </el-col>


                <el-col  v-if="it.type==='file'" :span="6" class="operate" > 
                    
                     <i class="el-icon-bottom"></i>
                     <i class="el-icon-share"></i>
                     <i class="el-icon-more"></i>

                </el-col>
            </el-row>
             
            
        
    </el-row>
   

  </div>
</template>

<script>
import utils from '../utils/utils.js'
import ManagerList from '../components/ManagerList'
 import uuidv4 from 'uuid/v4' 
  export default {
    name:'instance',
    components:{
            ManagerList
    },
    data: () => ({
        //select workspace massagebox visiable attribute
       selectWorkspaceList: false,
       //newFloderName
       newFloderName:'',
       //只允许操作一个新文件夹
       operateNweFolder:false,
       //文件夹层次
       folderLayer:['All File'],
       //搜索工作空间
       workspaceSearch:'',
      
       list:[
        {
          name: 'folder',
          date:'2020.1.1',
          type:'folder'
         
        }, {
          name: 'folder',
          date:'2020.1.1',          
          type:'folder'
        }, {
          name: 'file.zip',
          date:'2020.1.1',

          size:'12m',
           type:'file'
        }, {
          name: 'file.zip',
          date:'2020.1.1',

          size:'12m',
           type:'file'
        }
        ],
         //存取同一级下的所有文件夹目录
       allFolderLayer:[],

       //类型
       instnaceType:""
    }),
    mounted(){
        this.instnaceType=this.$route.query.type
    },
    methods:{
        
        newFolder(){
            let _this=this
            let newFolder={
                name: 'NewFolder',
                date:utils.formatDate(new Date()),
                type:'folder',
                id:uuidv4()

            }
             //创建新文件夹到最开始
            if(!this.operateNweFolder){
                this.list.unshift(newFolder)
                this.operateNweFolder=true
            }else{
                alert("finish create folder first")
            }
            
        },
        newFileData(){
            if(this.instnaceType==='FileInstance'){
          this.$router.push({path:'/form/instance',query:{type:'FileInstance'}})

            }
        },
        renameFolder(){
            if(this.newFloderName.length===0){
                alert("not empty!")
            }else{
                //重命名功能
            this.list[0].name=this.newFloderName
            this.newFloderName=''
            this.operateNweFolder=false
            }
            
        },
        cancel(){
            let current=new Date()
            this.list[0].name='NewFolder_'+current.getFullYear()+"_"+current.getMonth()+1+'_'+current.getDate()+'_'+current.getHours()+'_'+current.getMinutes()+'_'+current.getSeconds()
            this.operateNweFolder=false
        },
        intoFolder(clickFolder){
            if(this.allFolderLayer.length===0){
                this.allFolderLayer.push([...this.list])
            }
            let li=[
                {
                    name: 'folder2',
                    date:'2020.1.1',
                    type:'folder'
                    
                    }, {
                    name: 'folder2',
                    date:'2020.1.1',          
                    type:'folder'
                    }, {
                    name: 'file2.zip',
                    date:'2020.1.1',

                    size:'12m',
                    type:'file'
                    },  

            ]

            this.allFolderLayer.push([...li])
            this.list=li
            //面包屑层次
            this.folderLayer.push(clickFolder)
        },
        backUpperFolder(){
            //面包屑层次
            this.folderLayer.pop()

            this.allFolderLayer.pop()
            this.list=this.allFolderLayer[this.allFolderLayer.length-1]

        },
        addFolderAjax(){

        }
    }
     
  }
</script>

<style scoped>
.instanceBtn{
    margin-top: 20px;
    margin-left: 20PX;
  /* padding: 20px */
}
.item{
    padding: 10px;
    height: 45px;
    border-bottom: solid .2px rgba(219, 228, 255, 0.911);
    border-top: solid .2px rgba(219, 228, 255, 0.911);
}
.item:hover{
    background-color: rgb(232, 240, 255)
}
.floderName,.dataName{
    text-decoration: none;
    color: black;
    font-size:medium;
    font-family: 'Times New Roman', Times, serif
}
.floderName:hover{
    color: rgb(0, 174, 255);
    cursor:pointer;
}
.operate i{
    margin-left: 10px;
}
.el-icon-bottom:hover,.el-icon-share:hover,.el-icon-more:hover{
    
    color:rgb(31, 236, 226) 
}

#renameInput{
    height: 100%;
}
.el-input__inner{
    height: 100% !important;
}

</style>
