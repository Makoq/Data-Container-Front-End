<template>
  <div class="instances">
   <el-row  class="instanceBtn">
       <!-- //挑选工作空间 -->
      <el-button type="primary"  @click="selectWorkspaceList = true">Select Workspace</el-button>
      <el-button   @click="newFolder">New Floder</el-button>

      <el-dialog
        title="提示"
        :visible.sync="selectWorkspaceList"
        width="30%"
         >
        <span>Workspace</span>
        <span slot="footer" class="dialog-footer">
            
            <el-button type="primary" @click="selectWorkspaceList = false">ok</el-button>
        </span>
        </el-dialog>
    </el-row>
     
    <el-divider></el-divider>

    <el-row  >
        <el-row  >
            <el-col :span="1"    > 
                    <span style="margin-left:70px">  
                       Name
                    </span> 
            </el-col>

            <el-col :span="1" :offset="5"   > 
                    <span style="margin-left:70px">  
                       Size
                    </span> 
            </el-col>

            <el-col :span="1" :offset="3"   > 
                    <span style="margin-left:70px">  
                      Date
                    </span> 
            </el-col>

             <el-col :span="1" :offset="3"   > 
                    <span style="margin-left:70px">  
                      Operate
                    </span> 
            </el-col>
           
        </el-row>
       <!-- <el-card v-for="(it,key) in 10" :key="key" shadow="hover" style="margin-top:2px">{{key}}</el-card> -->
      
            <el-row  v-for="(it,key) in list" :key="key" class="item">
                <el-col :span="1" :offset="1">
                   <img  v-if="it.type==='folder'" src="../assets/folder.png" width="28" height="30" alt="Safari" title="Safari">

                    <img v-if="it.type==='file'" src="../assets/zip.png" width="28" height="30" alt="Safari" title="Safari">
                </el-col>
                <el-col :span="4" style="height:100%"> 
                   
                        <el-row v-if="it.name==='NewFolder'&&it.type==='folder'" style="height:100%;z-index:99">
                        <el-input id="renameInput" v-model="newFloderName" size="small" style="height:100%"></el-input ><el-button @click="renameFolder" size="small"  style="position:fixed;float:left">√</el-button><el-button @click="cancel" size="small" style="position:fixed;float:left;margin-left:40px">x</el-button>
                        </el-row>
                    
                    <button v-else-if="it.type==='folder'" class="floderName" type="text" href=""  ref="floderName">
                        {{it.name}}
                    </button>
                    <span class="dataName"  v-if="it.type==='file'">{{it.name}}</span>

                </el-col>

                <el-col :span="3" :offset="1"> 
                    
                    <span class="dataName"  v-if="it.type==='file'">{{it.size}}</span>

                </el-col>

                <el-col :span="4" :offset="1"> 
                    
                    <span class="dataName"  v-if="it.type==='file'">{{it.date}}</span>

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
       newFloderName:'',
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
        ]
    }),
    methods:{
        newFolder(){
            let newFolder={
                name: 'NewFolder',
                date:new Date('yyyy-mm-dd'),
                type:'folder',
                id:uuidv4()

            }
            console.log(newFolder)
            this.list.unshift(newFolder)

            
        },
        renameFolder(){
            this.list[0].name=this.newFloderName
            this.newFloderName
        },
        cancel(){
            let current=new Date()
            this.list[0].name='NewFolder_'+current.getFullYear()+"_"+current.getMonth()+'_'+current.getDay()+'_'+current.getHours()+'_'+current.getMinutes()+'_'+current.getSeconds()
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
    cursor: pointer;
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
