<template>
  <div class="instances">
   <el-row  class="instanceBtn">
       <el-col :span="14" v-if="this.$route.query.type!='DataOut'" >
        <!-- //挑选工作空间 -->
        <!-- <el-button type="primary"  @click="selectWorkspaceList = true">Select Workspace</el-button> -->
        <el-button   type="warning" @click="newFolder" >New Floder</el-button>
        <el-button   type="success"  @click="newFileData">New {{this.$route.query.type.includes("Method")?"Method":"Instance"}}</el-button>
       </el-col>

       <el-col :span="10">
        <el-input style="width:60%"  v-model="instanceSearch" placeholder="instance search"></el-input>
        <el-button   style="position:fixed;float:left"  @click="search()" ><i class="el-icon-search"></i></el-button>       
       </el-col>
      <el-dialog
        title="Workspace Select"
        :visible.sync="selectWorkspaceList"
        width="500px"
         >
        <el-row>
                <el-col :span="24">
                    <el-input v-model="instanceSearch" style="width:300px" placeholder="workspace search"></el-input>
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
     
    <!-- 文件层次深浅进出功能按钮 -->
    <el-row style="height:30px;margin-left: 20PX;margin-top:10px"> 
            <el-button v-if="folderLayer.length===1" size="mini" type="text" disabled>  All file</el-button>
           <el-button  v-else size="mini" type="text"  @click="backUpperFolder"  >Upper Folder</el-button>
           <el-divider v-if="folderLayer.length>1" direction="vertical"></el-divider>
           <span v-if="folderLayer.length>1" style="color:grey">&nbsp;{{folderLayer.join(' / ')}}</span>
    </el-row>
   
    <el-row v-loading="loading" >
        <el-row  style="margin-left:5px" >
            <el-col :span="2"    :offset="2" > 
                    <strong  >  
                       &nbsp;Name
                    </strong> 
            </el-col>

            <!-- <el-col :span="1" :offset="3"   > 
                    <span  >  
                       Size
                    </span> 
            </el-col> -->

            <el-col :span="1" :offset="4"   > 
                    <strong  >  
                      Date
                    </strong> 
            </el-col>

             <el-col :span="1" :offset="4"   > 
                    <strong  >  
                       
                      Operate
                    </strong> 
            </el-col>
            <!-- authority -->

             <el-col :span="1" :offset="2"   > 
                    <strong>  
                      Authority
                    </strong> 
            </el-col>
           
        </el-row>
        <!-- <el-divider ></el-divider> -->
                <!-- 选择发布目标，门户或者参与式平台 -->
                <el-dialog
                title="Public Option"
                :visible.sync="publicOptionDialog"
                width="30%"
                >
                <span>Public Options:</span>

                    <el-radio v-model="publicOption" label="1">OpenGMS Portal</el-radio>
                    <el-radio v-model="publicOption" label="2">GeoProblems Solving</el-radio>
                </el-dialog>
                <!-- 删除确认 -->
                <el-dialog
                    title="Attention!"
                    :visible.sync="delInstanceDialogVisible"
                    width="30%"
                    >
                    <span>Are you sure to delete this item ? </span>
                    
                    <span slot="footer" class="dialog-footer">
                        
                        <el-button type="primary" @click="delInstance()">OK</el-button>
                    </span>
                </el-dialog>
                <!-- 共享确认 -->
                <el-dialog
                    title="Attention!"
                    :visible.sync="shareDialogVisible"
                    width="50%"
                    >
                    <el-radio v-model="publicOption" label="portal">OpenGMS Portal</el-radio>
                    <el-radio v-model="publicOption" label="geoproblem">GeoProblems Solving</el-radio>
                    
                    <div v-if="publicOption=='portal'" style="margin-top:50px">
                        <h3>Are you sure to share this data on OpenGMS Portal DataItem List ? </h3><br><br><br>
                        <p> Current connected account in OpenGMS Portal is  <br><br><strong>{{connectPortalUsr}}</strong> </p>
                        
                    </div>
                    <div v-if="publicOption=='geoproblem'" style="margin-top:50px">
                        <h3>Are you sure to share this data on GeoProblems Solving Plartform:</h3><br><br><br></h3>
                        <!-- <p> Current connected account in GeoProblems Solving Plartform is  <br><br><strong>{{connectPortalUsr}}</strong> </p> -->

                    </div>
                        
                        <span slot="footer" class="dialog-footer">
                            
                            <el-button type="primary" @click="public_data_options()">OK</el-button>
                        </span>


                </el-dialog>

                <el-dialog
                    :title="GeoVisData=='login'?'login':'GeoProjectsList'"
                    :visible.sync="GeoProblemsData"
                    width="50%"
                    >
                    
                     <div v-if="GeoVisData=='login'">
                        
                        <el-form>
                         <el-form-item  label="UserName">
                            <el-input type="text"      v-model="loginGeo.usr" placeholder="username"></el-input>

                        </el-form-item>
                        <el-form-item  label="PassWord">
                            <el-input type="text"      v-model="loginGeo.pwd" placeholder="password"></el-input>
                        </el-form-item>
                         <el-button @click="loginGeoP">LOGIN</el-button>
                        </el-form>
                     </div >

                     <div v-else-if="GeoVisData=='list'">
                          
                         <h3>Current Selected: <strong style="color:blue">{{selectProject===''?'no select':selectProject}}</strong></h3>
                        <el-table
                                    :data="GeoProjectsList"
                                    style="width: 100%">
                                    <el-table-column
                                        prop="name"
                                        label="Name"
                                        width="180">
                                    </el-table-column>
                                    <el-table-column
                                        prop="description"
                                        label="Description">
                                    </el-table-column>
                                     <el-table-column label="Select">
                                        <template slot-scope="scope">
                                            <el-button
                                            size="mini"
                                            @click="selectProjectFromGeoProblems(scope.$index, scope.row)">Select</el-button>
                                        </template>
                                     </el-table-column>
                        </el-table>

                         
                     </div>

                        <span slot="footer" class="dialog-footer">
                            
                            <el-button type="primary" @click="publicDataToGeoProblem()">OK</el-button>
                        </span>

                </el-dialog>


                 <!-- 文件夹列表 -->     
                 <div style="margin-top:20px"> 
                    <el-row   v-for="(it,key) in instancesCont.list" :key="key"  class="item">
                        
                        <el-col :span="1" :offset="1">
                            <img  v-if="it.type==='folder'" src="../assets/folder.png" width="28" height="30" alt="Safari" title="Safari">
                            
                            <avatar v-if="it.type==='file'" :size="24" :rounded="false" :username="it.name"></avatar>

                            <!-- <img v-if="it.type==='file'" src="../assets/zip.png" width="28" height="30" alt="Safari" title="Safari"> -->
                            <avatar v-if="it.type==='Processing'" :size="24" :rounded="false" :username="it.name"></avatar>
                            <avatar v-if="it.type==='ProcessingMethod'" :size="24" :rounded="true" :username="it.name"></avatar>

                            
                            <!-- <img v-if="it.type==='Processing'" src="../assets/processing.png" width="28" height="28" alt="Safari" title="Safari"> -->
                            <avatar v-if="it.type==='Visualization'" :size="24" :rounded="false" :username="it.name"></avatar>
                            <avatar v-if="it.type==='VisualizationMethod'" :size="24" :rounded="true" :username="it.name"></avatar>


                            <!-- <img v-if="it.type==='Visualization'" src="../assets/visualization.png" width="28" height="28" alt="Safari" title="Safari"> -->
                        </el-col>
                        <el-col :span="3" style="height:100%;"> 
                        
                            <el-row v-if="it.name==='NewFolder'&&it.type==='folder'" style="height:100%;z-index:99">
                                <el-input id="renameInput" autofocus="autofocus" max="25" v-model="newFloderName" size="small" style="height:100%"></el-input ><el-button @click="renameFolder" size="small"  style="position:fixed;float:left">√</el-button><el-button @click="cancel" size="small" style="position:fixed;float:left;margin-left:40px">x</el-button>
                            </el-row>
                            
                            <a v-else-if="it.type==='folder'" class="floderName" type="text"  @click="intoFolder(it)"  ref="floderName">
                                {{it.name}}
                            </a>
                            <span class="dataName"  v-if="it.type!='folder'">{{it.name}}</span>

                        </el-col>

                

                        <el-col :span="4" :offset="2"> 
                            
                            <span class="dataName"   >{{it.date}}</span>

                        </el-col>
                                <el-dialog
                                    title="Select Data"
                                    :visible.sync="ivkLcalPcs"
                                    width="30%"
                                    >
                                    
                                    <el-radio style="color:green;border:green 1px solid" v-for="(it,key) in chsIvkData" :key="key" v-model="csDtNeRadio" :label="key" border><strong>{{chsIvkData[key]}}</strong></el-radio>
                                    
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="ivkLcalPcs = false;">Cancel</el-button>
                                        <el-button type="primary" @click="ivkLcalPcsExcute()">OK</el-button>
                                    </span>
                                </el-dialog>
                                  <el-dialog
                                    title="Basic info and parameters "
                                    :visible.sync="infoAndParsDialog"
                                    width="fit-content"
                                    >
                                    
                                    <el-row v-loading="localPcsLoading">
                                        <h3>Description:</h3><br>
                                      <div style="background-color:#f8fafb; color: #163d5e; " >
                                       <xmp >{{metaDesc}}</xmp>
                                      </div>
                                    </el-row>
                                    <el-divider v-if="currentPcs.paramsCount!=0"></el-divider>
                                    <el-row v-if="currentPcs.paramsCount!=0">
                                        <h3>Parameters:</h3><br>

                                            <el-input v-model="pcsParms[key]" v-for="(it,key) in currentPcs.paramsCount" :key="key"></el-input>


                                    </el-row>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="infoAndParsDialog = false;">Cancel</el-button>
                                        <el-button type="primary" @click="lcalPcsAxios()">OK</el-button>
                                    </span>
                                </el-dialog>
 



                        <el-col  v-if="it.type!='folder'" :span="4"  :offset="1" class="operate"  > 
                            &nbsp;
                            <!-- 执行 -->
                            <i  v-if="it.type!='file'&&!it.type.includes('Method')" :class="it.type=='Visualization'||it.type=='VisualizationMethod'?'el-icon-view':'el-icon-caret-right'" @click="invokeLocalPcs(it)"></i>
                            <i  v-if="it.type!='file'&&it.type.includes('Method')" :class="it.type=='Visualization'||it.type=='VisualizationMethod'?'el-icon-view':'el-icon-caret-right'" @click="invokeMethod(it)"></i>

                            <!-- Method类型 挑选数据 -->
                            <el-dialog
                                title="Select"
                                :visible.sync="chooseMethodDataDialog"
                                width="80%"
                                height="280px"
                                >
                                <el-row :gutter="20">
                                    <el-col :span="8" >
                                        <h3>Input</h3><br>
                                        <el-row style=" height:50px">
                                            <span >{{chooseMethodData!=undefined? "Selected : ":"Unselected" }} </span>
                                            
                                            <el-tag v-if="chooseMethodData!=undefined">                                    
                                            {{chooseMethodData.name}}
                                            </el-tag>
                                        </el-row>
                                        <el-row >
                                        <!-- <el-col :span="10" style=" height:250px;overflow-y:scroll">
                                            <span v-if="chooseMethodData!=undefined">choose data</span>
                                            <el-tag>                                    
                                            {{chooseMethodData!=undefined? chooseMethodData.name:undefined}}
                                            </el-tag>
                                        </el-col> -->
                                        <el-col :span="24" style=" height:300px;overflow-y:scroll" v-loading="methodInputLoading">
                                            <!-- 文件层次深浅进出功能按钮 -->
                                            <el-row style="height:30px;margin-left: 20PX;margin-top:10px"> 
                                                    <el-button v-if="folderLayerMethodDataChooseData.length===1" size="mini" type="text" disabled>  All file</el-button>
                                                <el-button  v-else size="mini" type="text"  @click="backUpperMethodDataFolder"  >Upper Folder</el-button>
                                                <el-divider v-if="folderLayerMethodDataChooseData.length>1" direction="vertical"></el-divider>
                                                <span v-if="folderLayerMethodDataChooseData.length>1">&nbsp;{{folderLayerMethodDataChooseData.join(' / ')}}</span>
                                            </el-row>
                                            <el-row  v-for="(it,key) in chooseMethodInstancesCont.list" :key="key"   >
                                            
                                                <el-col :span="2" :offset="1">
                                                <img  v-if="it.type==='folder'" src="../assets/folder.png" width="28" height="30" alt="Safari" title="Safari">

                                                    <img v-if="it.type==='file'" src="../assets/zip.png" width="28" height="30" alt="Safari" title="Safari">
                                                </el-col>
                                                <el-col :span="17" style="height:100%"> 
                                                    <a v-if="it.type==='folder'" class="floderName" type="text"  @click="intoMethodDataFolder(it)"  ref="floderName">
                                                        {{it.name}}
                                                    </a>
                                                    <span class="dataName"  v-if="it.type==='file'">{{it.name}}</span>

                                                </el-col>
                                                <el-col v-if="it.type==='file'" :span="3" style="height:100%"> 
                                                <el-button type="text" @click="chooseDataForMethod(it)" >Choose</el-button>
                                                </el-col>
                                            </el-row>
                                        </el-col>
                                        </el-row>
                                    </el-col >

                                    <el-col :span="8">
                                        <h3>Configuration</h3><br>
                                        <el-row style=" height:50px">
                                            {{currentMethod!=undefined? currentMethod.description:''}}
                                        </el-row>
                                
                                        <el-row style=" height:100%" v-loading="inputFilesCfigLoading">

                                            <el-col v-if="currentMethod!=undefined" :span="24">
                                                <el-form  >
                                                    <div v-if="currentMethod.metaDetailJSON">
                                                        <el-form-item  v-for="(it,key) in currentMethod.metaDetailJSON.Input" :label="it.name" :key="key">
                                    
                                                            <el-select v-model="inputConfigValue[key]"  placeholder="请选择">
                                                                <el-option
                                                                    v-for="item in inputFilesConfigureation"
                                                                    :key="item.path"
                                                                    :label="item.name"
                                                                    :value="item.path">
                                                                </el-option>
                                                            </el-select>
                                                        </el-form-item>
                                                    </div>
                                                    <div v-if="currentMethod.metaDetailJSON.Parameter.length>0">
                                                        <el-form-item  v-for="(it,key) in currentMethod.metaDetailJSON.Parameter"   :key="key">
                                                             <el-input v-model="inputConfigParams[key]"></el-input>
                                                        </el-form-item>
                                                    </div>



                                                </el-form>
                                            </el-col>

                                        </el-row>
                                    </el-col>
                                    
                                    <el-col :span="8" >
                                        <h3>Output</h3><br>
                                        <el-row style=" height:50px">
                                           
                                            <span >{{chooseOutDataFile!=undefined? "Selected : ":"Unselected" }} </span>
                                            <el-tag v-if="chooseOutDataFile!=undefined" type="success">                                    
                                            {{chooseOutDataFile.name}}
                                            </el-tag>
                                        </el-row>

                                        <el-row>
                                             <el-button @click="newFolderInMethod" type="warning">New Folder</el-button>
                                             <el-button @click="newDataOut"  type="success">New Result</el-button>
                                            
                                              <el-col :span="24" style=" height:250px;overflow-y:scroll" v-loading="methodOutputLoading">
                                                    <!-- 文件层次深浅进出功能按钮 -->
                                                    <el-row style="height:30px;margin-left: 20PX;margin-top:10px"> 
                                                            <el-button v-if="folderLayerDataOut.length===1" size="mini" type="text" disabled>  All file</el-button>
                                                        <el-button  v-else size="mini" type="text"  @click="backUpperDataOutFolder"  >Upper Folder</el-button>
                                                        <el-divider v-if="folderLayerDataOut.length>1" direction="vertical"></el-divider>
                                                        <span v-if="folderLayerDataOut.length>1">&nbsp;{{folderLayerDataOut.join(' / ')}}</span>
                                                    </el-row>
                                                    <el-row  v-for="(it,key) in dataOutCont.list" :key="key"   >
                                                    
                                                        <el-col :span="2" :offset="1">
                                                        <img  v-if="it.type==='folder'" src="../assets/folder.png" width="28" height="30" alt="Safari" title="Safari">

                                                            <img v-if="it.type==='file'" src="../assets/zip.png" width="28" height="30" alt="Safari" title="Safari">
                                                        </el-col>
                                                        <el-col :span="17" style="height:100%"> 
                                                            <!-- 新建文件夹 -->
                                                            <el-row v-if="it.name==='NewFolder'&&it.type==='folder'" style="height:100%;z-index:99">
                                                                <el-input id="renameInput" autofocus="autofocus" max="25" v-model="newDataOutFolderName" size="small" style="height:100%"></el-input ><el-button @click="renameDataOutFolder" size="small"  style="position:fixed;float:left">√</el-button><el-button @click="cancelDataOut" size="small" style="position:fixed;float:left;margin-left:40px">x</el-button>
                                                            </el-row>
                                                            <!-- 新建处理结果 -->
                                                            <el-row v-if="it.name==='NewMethodResult'&&it.type==='file'" style="height:100%;z-index:99">
                                                                <el-input id="renameInput" autofocus="autofocus" max="25" v-model="methodResultName" size="small" style="height:100%"></el-input ><el-button @click="renameDataOutFile" size="small"  style="position:fixed;float:left">√</el-button><el-button @click="cancelDataOut" size="small" style="position:fixed;float:left;margin-left:40px">x</el-button>
                                                            </el-row>


                                                            <a v-if="it.type==='folder'" class="floderName" type="text"  @click="intoDataOutFolder(it)"  ref="floderName">
                                                                {{it.name}}
                                                            </a>
                                                            <span class="dataName"  v-if="it.type==='file'">{{it.name}}</span>

                                                        </el-col>
                                                        <el-col v-if="it.type==='file'" :span="3" style="height:100%"> 
                                                        <el-button type="text" @click="chooseOutDataFileFuc(it)" >Choose</el-button>
                                                        </el-col>
                                                    </el-row>
                                               </el-col>
                                            
                                        </el-row>            
                                    </el-col>
                                        
                                  

                                </el-row>

                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="chooseMethodDataDialog = false">Cancel</el-button>
                                    <el-button type="primary" @click="confirmMethodData">OK</el-button>
                                </span>
                            </el-dialog>

                            
                            
                            <!-- 下载 -->
                            <i v-if="it.type==='file'" @click="download(it)" :class="instnaceType=='Data'?'el-icon-bottom':'el-icon-folder-opened'"></i>

           
                            <!-- 共享 -->
                            <el-tooltip  effect="dark" content="Public data to OpenGMS Portal DataItem" placement="top-start">
                            <i v-if="it.type==='file'" class="el-icon-share" style="color: #cd7100" @click="public_data_item_to_portal(it)"></i>
                            </el-tooltip>
                             <!-- 绑定 -->
                            <el-tooltip  effect="dark" content="Bind to data" placement="top-start">
                            <i v-if="it.type!='file'" class=" el-icon-paperclip" @click="public_processing_item_to_portal(it)"></i>
                            </el-tooltip>
                            <!-- 删除 -->
                            <el-tooltip  effect="dark" content="Delete instance" placement="top-start">
                            <i  @click="shouwDelConfirm(it)" class="el-icon-delete"></i>
                            </el-tooltip>
                            <!-- 服务迁移dialog -->
                            <el-tooltip  effect="dark" content="Service migration" placement="top-start">
                                <i   @click="serviceMigrationDialog(it)"   class="el-icon-truck"></i>
                            </el-tooltip>
                            <el-dialog
                                    title="Service migration"
                                    :visible.sync="sceMigDialog"
                                    width="30%"
                                    v-loading="migLoading"
                                    >
                                    <el-form > 
                                    <!-- your token -->
                                    <el-form-item  label="Your token" >
                                        <el-input type="text" v-model="yourToken" ref="myToken"  readonly>
                                        <el-button slot="append" icon="el-icon-document-copy" @click="copyMyToken()"></el-button>    
                                        </el-input> 
                                    </el-form-item>

                                    <!-- migration target token -->
                                    <el-form-item  label="Service Migration target token"  >
                                    <el-input type="text" v-model="sceMigTargetTokent"    ></el-input>
                                    </el-form-item>
                                    </el-form>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="sceMigDialog = false;">Cancel</el-button>
                                        <el-button type="primary" @click="serviceMigration()">Migration</el-button>
                                    </span>
                                </el-dialog>
                              
                            <!--  -->
                            <el-popover
                                placement="top-start"
                                title="Metadata Description"
                                width="400px"
                                trigger="hover"
                                style=""
                                >
                                <div v-if="it.type==='file'" style="">
                                    <p style="color: #163d5e;"  v-for="(i,k) in it.meta" :key="k">{{i!=''&&k!='tags'&&typeof(i)!='object'?k+' : '+i:''}}</p>
                                </div>
                                <div v-else-if="it.metaDetail!=undefined" style="border:1px black solid">
                                    <xmp style="color:blue">{{metaInfo(it)}}</xmp>
                           
                                </div>
                                <i  slot="reference" class="el-icon-info"  ></i>

                            </el-popover>
                           
                                

                        </el-col>
                        <el-col  v-else-if="it.type==='folder'" :span="4" :offset="1"  class="operate" > 
                            &nbsp;
                            <!-- <i class="el-icon-edit"></i> -->
                        
                            <i :style="it.type==='folder'?'margin-left:30%':''" @click="shouwDelConfirm(it)" class="el-icon-delete"></i>
                                    
                        </el-col>

                

                        <el-col v-if="it.type==='folder'" :span="1"  >
                        
                            admin
                        </el-col>
                        <el-col v-else-if="it.type!='folder'" :span="1"  >
                        
                            <el-switch
                                @change="authoritySwitch(it)"
                                v-model="it.authority"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                            </el-switch>
                        </el-col>


                    </el-row>
                 </div>
            
        
    </el-row>
   

  </div>
</template>

<script>
import utils from '../utils/utils.js'
import DecryptJS from '../utils/cycrypto.js';
 
import uuidv4 from 'uuid/v4' 
import cycrypto from '../utils/cycrypto.js';
import myUrl from '../utils/config.js'
const address = require('address');
import md5 from "js-md5"
import Avatar from 'vue-avatar'
import xml2js from 'xml2js';
const builder=new xml2js.Builder();
import request from 'request';

export default {
    name:'instance',
    components:{
         
            Avatar
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
       instanceLayer:[],
       //搜索工作空间
       instanceSearch:undefined,
      //instances列表数据结构
       instancesCont:{},
       //暂时的列表存储
       tpmList:undefined, 
        //原始
        originList:undefined,   
      //存取同一级下的所有文件夹目录
       allFolderLayer:[],
       //类型
       instnaceType:"",
       
       //组件初始化时的列表id
       listUid:0,
       //删除提示框
       delInstanceDialogVisible:false,
       //点击的对应项
       theItem:'',
       //加载项
       loading:false,
       //共享确认
       shareDialogVisible:false,
       //发布数据选项
       publicOption:'portal',
       //发布数据弹出框
       publicOptionDialog:false,
       //获取参与式平台项目数据
       GeoProblemsData:false,
       GeoVisData:'login',
       loginGeo:{
           usr:'',
           pwd:''
       },
       GeoProjectsList:[],
       selectProject:'',
       selectProjectId:'',
        //调用处理方法展示
        ivkLcalPcs:false,
        chsIvkData:undefined,
        csDtNeRadio:'',
        currentPcs:'',
        infoAndParsDialog:false,
        metaDesc:'',
        pcsParms:[],
        //服务迁移
        sceMigDialog:false,
        sceMigTargetTokent:'',
        yourToken:'',
        currentService:undefined,
        migLoading:false,
        
        // 本地展示xml
        pcsMetaInfo:'',
        imgVisualizationDialog:false,//可视化展示dialog,
        localPcsLoading:false,

        // 对于Method类型 选择数据
        chooseMethodDataDialog:false,
        chooseMethodData:undefined,
        chooseMethodInstancesCont:{},
        instanceLayerMethodChooseData:[],
        folderLayerMethodDataChooseData:['All File'],

        // loading

        methodInputLoading:false,
        methodOutputLoading:false,


        // out data设置
        newDataOutFolderName:'',
        operateMethodFolder:false,


        dataOutCont:{},
        instanceLayerDataOut:[],
        folderLayerDataOut:['All File'],
        operateDataOutFloder:false,
        methodResultName:'',
        chooseOutDataFile:undefined,

        currentMethod:undefined,

        // 处理方法计算页面配置

        inputFilesConfigureation:[ ],
        inputFilesCfigLoading:false,
        // 依据处理方法配置文件控制的路径数组

        inputConfigValue:{},//有顺序的路径
        inputConfigParams:[],//参数





        
        
    }),
    created(){

        //初始化组件时，初始化内容列表id为0
        this.listUid=0,
        
        console.log('createa')
    },
    
    watch:{
         $route: 'watchrouter',//路由变化时，执行的方法
         instanceSearch:function(val){
             if(val!=undefined&& val.length==0){
                 this.instancesCont.list=this.originList
             }
         }   
    },
    mounted(){

        

        //组件初始化时，确定instance类型
        console.log('mounted')
        this.instnaceType=this.$route.query.type
        let _this=this
        //通过列表id和用户token获取对应层级的列表
        let initList={
            type: _this.instnaceType,
            uid:_this.listUid,
            parentLevel:'-1',
            userToken:localStorage.getItem('Authorization')
        }
        //获取初始列表，最上层列表

        if(this.$store.state.currentWorkSpace!=undefined&&initList.parentLevel=='-1'){
            initList['workSpace']=this.$store.state.currentWorkSpace.uid
        }

        this.$axios.get('/api/instances',{
            params:initList
        })
        .then((res)=>{
            if(res.data.code===-1){
                  _this.$message({
                        message: 'instances request failed ',
                        type: 'fail'
                    });
            }else if(res.data.code===-2){
                 _this.$message({
                        message: 'please logout,then login again',
                        type: 'fail'
                    });
            }else{
                
                
                _this.instancesCont=res.data.data
                _this.originList=res.data.data.list
                _this.instanceLayer=[initList] 
            }
            
        })
    },
    computed:{
        connectPortalUsr(){
            let connUsr=localStorage.getItem('relatedUsr')
            if(connUsr){

                return DecryptJS.Decrypt(connUsr.split(',')[1])
            }else{
                return 'no usr'
            }
        },
        
        metaInfo(){
            let _this=this
            return function (v){
                return _this.pcsMeta(v)
            }
        }

        
    },
    methods:{
        imgVisualization(id){
            // this.imgVisualizationDialog=true
            this.$axios.get('/api/visualresult',{
                params:{
                    id:id
                }
            })


        },
        pcsMeta(it){
             return builder.buildObject(JSON.parse(it.metaDetail)) 
        },
        search(){
             
            let keyword=new RegExp(this.instanceSearch ,'i')
             
            this.tpmList=[...this.instancesCont.list]
            
            if(this.instanceSearch==undefined){
                this.$message({
                    message:'empty search',
                    type:'fail'
                })
                return
            }
            this.instancesCont.list=[]
            if(this.instanceSearch!=undefined&&this.instanceSearch.length!=0){
                for(let i of this.tpmList){
                    if(i.name.match(keyword)){
                         this.instancesCont.list.push(i)
                    }
                }
            }else if(this.instanceSearch.length==0){
                this.instancesCont.list=this.originList
            }
        },
        newFolder(){
            let _this=this
            let newFolder={
                id:uuidv4(),
                name: 'NewFolder',
                date:utils.formatDate(new Date()),
                type:'folder',
                subContentId:'',
                authority:true//1表示公开，0表示未公开
            }
             //创建新文件夹到最开始
            if(!this.operateNweFolder){

                this.instancesCont.list.unshift(newFolder)
                 

                this.operateNweFolder=true
            }else{
                alert("finish create folder first")
            }
            
        },
        newFolderInMethod(){

            let _this=this
            let newFolder={
                id:uuidv4(),
                name: 'NewFolder',
                date:utils.formatDate(new Date()),
                type:'folder',
                subContentId:'',
                authority:true//1表示公开，0表示未公开
            }
             //创建新文件夹到最开始
            if(!this.operateDataOutFloder){

                this.dataOutCont.list.unshift(newFolder)
                 

                this.operateDataOutFloder=true
            }else{
                alert("finish create folder first")
            }

        },


        newFileData(){
            if(this.instnaceType==='Data'){
                let _this=this,userToken=localStorage.getItem('Authorization')
                this.$router.push({path:'/form/data',query:{type:'Data',instance_uid:_this.instancesCont.uid,userToken:userToken}})
            }else if(this.instnaceType==='Processing'){
                let _this=this,userToken=localStorage.getItem('Authorization')

                this.$router.push({path:'/form/processing',query:{type:'Processing',instance_uid:_this.instancesCont.uid,userToken:userToken}})

            }else if(this.instnaceType==='ProcessingMethod'){
                let _this=this,userToken=localStorage.getItem('Authorization')

                this.$router.push({path:'/form/processing',query:{type:'ProcessingMethod',instance_uid:_this.instancesCont.uid,userToken:userToken}})

            }
            else if(this.instnaceType==='Visualization'){
                let _this=this,userToken=localStorage.getItem('Authorization')

                this.$router.push({path:'/form/processing',query:{type:'Visualization',instance_uid:_this.instancesCont.uid,userToken:userToken}})

            }else if(this.instnaceType==='VisualizationMethod'){
                let _this=this,userToken=localStorage.getItem('Authorization')

                this.$router.push({path:'/form/processing',query:{type:'VisualizationMethod',instance_uid:_this.instancesCont.uid,userToken:userToken}})

            }

        },
        newDataOut(){
            // 新建输出数据

            
            let _this=this
            let newMethodResultFile={
                id:uuidv4(),
                name: 'NewMethodResult',
                date:utils.formatDate(new Date()),
                type:'file',
                subContentId:'',
                authority:true//1表示公开，0表示未公开
            }
             //创建新文件夹到最开始
            if(!this.operateDataOutFloder){

                this.dataOutCont.list.unshift(newMethodResultFile)
                 

                this.operateDataOutFloder=true
            }else{
                alert("finish create folder first")
            }










        },

        renameFolder(){
            if(this.newFloderName.length===0){
                alert("not empty!")
            }else{
                //重命名功能
                this.instancesCont.list[0].name=this.newFloderName
                this.newFloderName=''
                this.operateNweFolder=false
                let _this=this
                let newInst={

                    uid:_this.instancesCont.uid,
                    userToken:_this.instancesCont.userToken,
                    type:_this.instancesCont.type,
                    parentLevel:_this.parentLevel,
                    data:_this.instancesCont.list[0]//只使用新建项
                }
                this.addFolderAjax(newInst)


            }
            
        },
        renameDataOutFolder(){

            if(this.newDataOutFolderName.length===0){
                alert("not empty!")
            }else{
                //重命名功能
                this.dataOutCont.list[0].name=this.newDataOutFolderName
                this.newDataOutFolderName=''
                this.operateDataOutFloder=false
                let _this=this
                let newInst={

                    uid:_this.dataOutCont.uid,
                    userToken:_this.dataOutCont.userToken,
                    type:_this.dataOutCont.type,
                    parentLevel:_this.parentLevel,
                    data:_this.dataOutCont.list[0]//只使用新建项
                }
                this.addFolderAjax(newInst)
            }
        },
        renameDataOutFile(){
             if(this.methodResultName.length===0){
                alert("not empty!")
            }else{
                //重命名功能
                this.dataOutCont.list[0].name=this.methodResultName
                this.methodResultName=''
                this.operateDataOutFloder=false
                let _this=this
                let newInst={

                    uid:_this.dataOutCont.uid,
                    userToken:_this.dataOutCont.userToken,
                    type:_this.dataOutCont.type,
                    parentLevel:_this.parentLevel,
                    data:_this.dataOutCont.list[0]//只使用新建项
                }
                this.addFolderAjax(newInst)
            }


        },



        cancel(){
            let current=new Date()
            this.instancesCont.list[0].name='NewFolder_'+current.getFullYear()+"_"+current.getMonth()+1+'_'+current.getDate()+'_'+current.getHours()+'_'+current.getMinutes()+'_'+current.getSeconds()
            this.operateNweFolder=false

            let _this=this
                let newInst={

                    uid:_this.instancesCont.uid,
                    userToken:_this.instancesCont.userToken,
                    type:_this.instancesCont.type,
                    parentLevel:_this.parentLevel,
                    data:_this.instancesCont.list[0]
                }
            this.addFolderAjax(newInst)

        },
        cancelDataOut(){

            let current=new Date()
            this.dataOutCont.list[0].name='NewFolder_'+current.getFullYear()+"_"+current.getMonth()+1+'_'+current.getDate()+'_'+current.getHours()+'_'+current.getMinutes()+'_'+current.getSeconds()
            this.operateDataOutFloder=false

            let _this=this
                let newInst={

                    uid:_this.dataOutCont.uid,
                    userToken:_this.dataOutCont.userToken,
                    type:_this.dataOutCont.type,
                    parentLevel:_this.parentLevel,
                    data:_this.dataOutCont.list[0]
                }
            this.addFolderAjax(newInst)

        },
        cancelDataOutFile(){
            let current=new Date()
            this.dataOutCont.list[0].name='NewFolder_'+current.getFullYear()+"_"+current.getMonth()+1+'_'+current.getDate()+'_'+current.getHours()+'_'+current.getMinutes()+'_'+current.getSeconds()
            this.operateDataOutFloder=false

            let _this=this
                let newInst={

                    uid:_this.dataOutCont.uid,
                    userToken:_this.dataOutCont.userToken,
                    type:_this.dataOutCont.type,
                    parentLevel:_this.parentLevel,
                    data:_this.dataOutCont.list[0]
                }
            this.addFolderAjax(newInst)
        },
        
        intoFolder(Folder){
            let _this=this
            let info={
                uid:Folder.subContentId,
                userToken:localStorage.getItem('Authorization'),
                type:this.$route.query.type,
                parentLevel:_this.instancesCont.parentLevel,
                subContConnect:{
                    uid:_this.instancesCont.uid,
                    id:Folder.id
                }//关联文件下的子instances
            }

            this.$axios.get('/api/instances',{
                params:info
            }).then((res)=>{
                if(res.code===-1){
                    _this.$message({
                            message: 'instances request failed ',
                            type: 'fail'
                        });
                }else{
                    _this.instancesCont=res.data.data
                    //面包屑层次
                    _this.folderLayer.push(Folder.name)
                    _this.instanceLayer.push({
                        type: _this.instancesCont.type,
                        uid:_this.instancesCont.uid,
                        parentLevel:_this.instancesCont.parentLevel,
                        userToken:_this.instancesCont.userToken
                    })
                    
                }
            });
            
        },
        intoMethodDataFolder(Folder){
            let _this=this
            let info={
                uid:Folder.subContentId,
                userToken:localStorage.getItem('Authorization'),
                type:'Data',
                parentLevel:_this.chooseMethodInstancesCont.parentLevel,
                subContConnect:{
                    uid:_this.chooseMethodInstancesCont.uid,
                    id:Folder.id
                }//关联文件下的子instances
            }

            this.$axios.get('/api/instances',{
                params:info
            }).then((res)=>{
                if(res.code===-1){
                    _this.$message({
                            message: 'instances request failed ',
                            type: 'fail'
                        });
                }else{
                    _this.chooseMethodInstancesCont=res.data.data
                    //面包屑层次
                    _this.folderLayerMethodDataChooseData.push(Folder.name)
                    _this.instanceLayerMethodChooseData.push({
                        type: _this.chooseMethodInstancesCont.type,
                        uid:_this.chooseMethodInstancesCont.uid,
                        parentLevel:_this.chooseMethodInstancesCont.parentLevel,
                        userToken:_this.chooseMethodInstancesCont.userToken
                    })
                    
                }
            });
            
        },
        intoDataOutFolder(Folder){


            let _this=this
            let info={
                uid:Folder.subContentId,
                userToken:localStorage.getItem('Authorization'),
                type:'DataOut',
                parentLevel:_this.dataOutCont.parentLevel,
                subContConnect:{
                    uid:_this.dataOutCont.uid,
                    id:Folder.id
                }//关联文件下的子instances
            }

            this.$axios.get('/api/instances',{
                params:info
            }).then((res)=>{
                if(res.code===-1){
                    _this.$message({
                            message: 'instances request failed ',
                            type: 'fail'
                        });
                }else{
                    _this.dataOutCont=res.data.data
                    //面包屑层次
                    _this.folderLayerDataOut.push(Folder.name)
                    _this.instanceLayerDataOut.push({
                        type: _this.dataOutCont.type,
                        uid:_this.dataOutCont.uid,
                        parentLevel:_this.dataOutCont.parentLevel,
                        userToken:_this.dataOutCont.userToken
                    })
                    
                }
            });
        },


        backUpperFolder(){
            //面包屑层次
            this.folderLayer.pop()
            this.instanceLayer.pop()
            let info=this.instanceLayer[this.instanceLayer.length-1]
             
            
            let _this=this
            this.$axios.get('/api/instances',{
                params:info
            }).then((res)=>{
                if(res.code===-1){
                    _this.$message({
                            message: 'instances request failed ',
                            type: 'fail'
                        });
                }else{
                    _this.instancesCont=res.data.data
                   
                    
                }
            })

        }, 
        backUpperMethodDataFolder(){
            //面包屑层次
            this.folderLayerMethodDataChooseData.pop()
            this.instanceLayerMethodChooseData.pop()
            let info=this.instanceLayerMethodChooseData[this.instanceLayerMethodChooseData.length-1]
             
            
            let _this=this
            this.$axios.get('/api/instances',{
                params:info
            }).then((res)=>{
                if(res.code===-1){
                    _this.$message({
                            message: 'instances request failed ',
                            type: 'fail'
                        });
                }else{
                    _this.chooseMethodInstancesCont=res.data.data
                   
                    
                }
            })

        },
        backUpperDataOutFolder(){
                //面包屑层次
            this.folderLayerDataOut.pop()
            this.instanceLayerDataOut.pop()
            let info=this.instanceLayerDataOut[this.instanceLayerDataOut.length-1]
             
            
            let _this=this
            this.$axios.get('/api/instances',{
                params:info
            }).then((res)=>{
                if(res.code===-1){
                    _this.$message({
                            message: 'instances request failed ',
                            type: 'fail'
                        });
                }else{
                    _this.dataOutCont=res.data.data
                    
                }
            })


        },
        addFolderAjax(newInstance){
            let _this=this
            _this.$axios.put('/api/newInst',newInstance)
            .then((res)=>{

            })
        },
        public_data_options(){
            
            if(this.publicOption==='portal'){

                this.public_local_data()

            }else if(this.publicOption==='geoproblem'){

                this.public_local_data_to_GeoProblems()

            }

        },
        //显示发布确认框
        public_data_item_to_portal(it){
            if(!localStorage.getItem('relatedUsr')){
                alert('please connect usr firstly!')
                
            }else{
                 this.theItem=it
                 this.shareDialogVisible=true
            }
           
        },
        
        //发布数据条目到门户
        public_local_data(){
            let _this=this
            
            let form=new FormData()
            form.append("id",_this.theItem.id)
            form.append("oid",cycrypto.Decrypt(_this.theItem.oid))
            form.append("name",_this.theItem.name)
            form.append("type",_this.theItem.type)
            form.append("authority",_this.theItem.authority)
            form.append("meta",JSON.stringify(_this.theItem.meta))
            form.append("date",utils.formatDate(new Date()))
            form.append("token",localStorage.getItem('relatedUsr').split(',')[1])

            form.append('ip',_this.$root.$el.insitu_ip)

           // form.append("categoryId",'5cb83fd0ea3cba3224b6e24e')


            this.$axios.post('/portal/dataItem/getDistributedData/',form)
            .then(res=>{
                if(res.data.code===0){
                    _this.shareDialogVisible=false
                    _this.$notify({
                        message:'publie data success',
                      
                        duration: 0
                    })
                 
                   
                    window.open( myUrl.remote_test_url+res.data.data);
                    
                    
                }else if(res.data.code===-2){
                    _this.shareDialogVisible=false

                    window.open( myUrl.remote_test_url+res.data.msg);
                }else
                {
                    this.$message({
                        message:'publie data failed',
                        type:'fail'
                    })
                }
            })

        },
        //发布数据到参与式平台
        public_local_data_to_GeoProblems(){
            this.shareDialogVisible=false
            this.GeoProblemsData=true
            this.GeoVisData='login'
            this.GeoProjectsList=[]
            
        },
        //选择要推送数据的项目
        selectProjectFromGeoProblems(index,row){
            this.selectProject=row.name
            this.selectProjectId=row.id
        },
        //向挑选的过程推送数据
        publicDataToGeoProblem(){

            let form=new FormData(),_this=this
            form.append("resourceId",_this.theItem.id)
            form.append("authorId",cycrypto.Decrypt(_this.theItem.oid))
            form.append("name",_this.theItem.name)
            form.append("type",_this.theItem.type)
            form.append("registerTime",utils.formatDate(new Date()))
            form.append("origination",'insituNode')
            form.append("folderId",this.selectProjectId)
            // form.append("meta",JSON.stringify(_this.theItem.meta))
            // form.append("token",localStorage.getItem('relatedUsr').split(',')[1])
            // form.append('ip',_this.$root.$el.insitu_ip)
            this.$axios.post('/geops/GeoProblemSolving/insituShare/getDistributedData',form)
            .then(res=>{
                if(res.code==0){

                    _this.$message({
                        type:'success',
                        message:'push successfully'
                    })

                    _this.GeoProblemsData=false
                }else{
                    _this.$message({
                        type:'fail',
                        message:'push failed'
                    })
                }
            })



        },
        //登录参与式平台，以发布数据到参与式平台
        loginGeoP(){
            let obj={
                userName:this.loginGeo.usr,
                password:md5(this.loginGeo.pwd)
            }
            let _this=this
            this.$axios.get('/geops/GeoProblemSolving/insituShare/getProjectInfo',{params:obj})
            .then(res=>{
                if(res.data.code==0){
                        _this.GeoVisData='list'
                        _this.GeoProjectsList=res.data.data

                }else if(res.data.code==-2){
                    _this.$message({
                        type:'fail',
                        message:'arleady in the GeoproblemsSolving Project'
                    })
                }else{
                    _this.$message({
                        type:'fail',
                        message:'login failed'
                    })
                }
            })
        },
        //发布处理方法到门户
        public_processing_item_to_portal(it){
            let _this=this
            let query={
                id:it.id,
                uid:_this.instancesCont.uid,
                instType:_this.instancesCont.type,
                type:it.type,
                token:localStorage.getItem('relatedUsr').split(',')[1]
            }
            this.$axios.get('/api/bindprocessing',{params:query})
            .then(res=>{
                if(res.data.code===0){
                    this.$message({
                        message:'bind process success',
                        type:'success'
                    })
                    setTimeout(()=>{
                         window.open( myUrl.remote_test_url+res.data.data);
                    },1000)
                   
                    

                }else if(res.data.code===-2){
                        this.$message({
                            message:'not public bind data',
                            type:'fail'
                        })
                }else{
                        this.$message({
                                message:'bind process fail',
                                type:'fail'
                        })
                }
                     
                
            })
        },
        //监听路由变化
        watchrouter(){
           
            let _this=this
            let initList={
                type: _this.$route.query.type,
                uid:0,
                parentLevel:'-1',
                userToken:localStorage.getItem('Authorization')
            }
            if(this.$store.state.currentWorkSpace!=undefined&&initList.parentLevel=='-1'){
            initList['workSpace']=this.$store.state.currentWorkSpace.uid
        }
            this.instnaceType=this.$route.query.type
            //获取初始列表，最上层列表
            this.$axios.get('/api/instances',{
                params:initList
            })
            .then((res)=>{
                if(res.data.code===-1){
                    _this.$message({
                            message: 'instances request failed ',
                            type: 'fail'
                        });
                }else{
                     
                    _this.instancesCont=res.data.data
                    _this.originList=res.data.data.list
                }
                
            })

            //路由变化后面包屑相关内容存储清空
            _this.folderLayer=["All file"]
            _this.instanceLayer=[initList]
             
        },
        authoritySwitch(it){
            console.log(it.authority,'authority')
            this.loading=true
            let _this=this
            //TODO 权限控制
            let switchAuthority={
                uid:_this.instancesCont.uid,
                id:it.id,
                authority:it.authority
            }
            this.$axios.put('/api/authority',switchAuthority)
            .then(res=>{
                if(res.data.code===0&&res.data.message=='ok'){
                    _this.loading=false
                    _this.$message({
                        message:'Authority change success!!',
                        type:'success'
                    })
                }else{
                    _this.loading=false

                     _this.$message({
                        message:'Authority change fail!!',
                        type:'success'
                    })
                }
            })

        },
        shouwDelConfirm(it){
            
            this.delInstanceDialogVisible=true
            this.theItem=it
             
        },
        delInstance(){
            
            let _this=this,it=this.theItem
            
            this.delInstanceDialogVisible=false
            console.log("d",it)
            
            let del={
                uid:_this.instancesCont.uid,
                id:it.id,
                type:it.type,
                instType:_this.$route.query.type
            }
            if(it.type!="Processing"){

            
                this.$axios.delete('/api/delInst',{
                    params:del
                }).then(res=>{
                    if(res.data.code===-1){
                        
                    }else if(res.data.code===0){

                        for(let i=0;i<_this.instancesCont.list.length;i++){
                            if(_this.instancesCont.list[i].id===res.data.data.id){
                                _this.instancesCont.list.splice(i,1)
                                

                                break;
                            }
                        }
                    }
                })
            }else if(it.type=="Processing"){
                this.$axios.delete('/api/delpro',{
                    params:del
                }).then(res=>{
                    if(res.data.code===-1){
                        
                    }else if(res.data.code===0){

                        for(let i=0;i<_this.instancesCont.list.length;i++){
                            if(_this.instancesCont.list[i].id===res.data.data.id){
                                _this.instancesCont.list.splice(i,1)
                                 
                                break;
                            }
                        }
                    }
                })
            }
        },
        download(it){
            let _this=this
            // 处理结果的下载
            if(this.$route.query.type=='DataOut'){
                 this.$axios.get('/api/openExplorer',{
                params:{
                    id:it.id
                },
                
            }).then(res=>{
                if(res.data.code==0){
                    this.$message({
                        type:"success",
                        message:'Show in file explorer'
                    })
                }else if(res.data.code==-1){
                     this.$message({
                        type:"fail",
                        message:'Show in file explorer error'
                    })
                }


            })



            // 文件的下载
            }else if(this.$route.query.type=='Data'){
                 this.$axios.get('/api/insitudownload',{
                params:{
                    uid:_this.instancesCont.uid,
                    id:it.id
                },
                responseType:'arraybuffer'
            }).then(res=>{
                
                if(res.headers.filename==="#"){
                    this.$message({
                        message:'no authority!',
                        type:'failed'
                    })
                }else{
                    let blob = new Blob([res.data], {type: 'application/zip;charset=utf-8'}); //指定格式为application/zip;charset=utf-8
                    let downloadElement = document.createElement('a');
                    let href = window.URL.createObjectURL(blob); //创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download =unescape(res.headers.filename); //下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); //点击下载
                    document.body.removeChild(downloadElement); //下载完成移除元素
                    window.URL.revokeObjectURL(href); 
                }
            })
        
        
            }
           
        
        },
        //本地调用选择数据
       invokeLocalPcs(it){
           this.chsIvkData=undefined
           this.currentPcs=it
           let _this=this
           let par=it.relatedData.join() 

           this.$axios.get('/api/chsdtne',{params:{
               dtNae:par
           }})
           .then(res=>{
               if(res.data.code==0){
                   _this.chsIvkData=res.data.message
                    _this.ivkLcalPcs=true
                    _this.csDtNeRadio==''
                    console.log(_this.csDtNeRadio)
                
               }else if(res.data.code==-1){
                   _this.$notify({
                       type:'fail',
                       message:'Invalid,Please create new!'
                   })
                   _this. shouwDelConfirm(it)
               }else if(res.data.code==-2){

               } 
           })

       },
       //调用本地处理方法
       ivkLcalPcsExcute(){
           this.ivkLcalPcs=false
           
           this.metaDesc=builder.buildObject(JSON.parse(this.currentPcs.metaDetail))
            
           console.log(this.chsIvkData,this.csDtNeRadio)
           let _this=this
           if(this.csDtNeRadio==''){
               this.$notify({
                   type:'fail',
                   message:'Please choose one data at least!'
               })
           }else{
              this.infoAndParsDialog=true
               

           }
       },
       lcalPcsAxios(){
        //TODO:本地处理方法调用，但是太麻烦先把本地调用取消了 
        let _this=this
        this.localPcsLoading=true
        this.$axios.get('/api/executeprcs',{
            params:{
                name:_this.currentPcs.name,
                token:'localpcs',
                pcsId:_this.currentPcs.id,
                dataId:_this.csDtNeRadio,
                params:_this.pcsParms.join(','),

            }
        }).then(res=>{
            if(res.data.code==0){
                _this.infoAndParsDialog=false
                _this.localPcsLoading=false
                if(_this.currentPcs.type=='Visualization'){
                    if(res.data.html){
                         
                        // window.open('/api/visualResultHtml?path='+encodeURIComponent(res.data.html))
                        window.open('http://111.229.14.128:8899/data?uid=' +res.data.uid,"VisualResultResultHtml",'width=700,height=600,resizable=yes,scrollbars=yes')
                        
                    }else{
                        this.$alert('<img src='+'http://111.229.14.128:8899/data?uid=' +res.data.uid+' width="100%" height="100%" alt="Visualization Result" />', 'Visualization Result', {
                        dangerouslyUseHTMLString: true,
                        confirmButtonText: 'ok',
                        });
                    }

                }else{
                     window.location.href='http://111.229.14.128:8899/data?uid=' +res.data.uid

                }
            }else{
                this.localPcsLoading=false
                _this.$notify({
                               message:'本地方法调用失败\n'+res.data.message,
                                type:'fail',
                                duration: 0
                })
            }
        })


       },

       //调用Method
       invokeMethod(it){
        let _this=this
        _this.methodInputLoading=true
        _this.methodOutputLoading=true

        _this.currentMethod=it
        _this.chooseMethodDataDialog=true

        //通过列表id和用户token获取对应层级的列表
        let initInputList={
            type: 'Data',
            uid:'0',
            parentLevel:'-1',
            userToken:localStorage.getItem('Authorization')
        }
        
       

        //输入
        this.$axios.get('/api/instances',{
            params:initInputList
        })
        .then((res)=>{
            if(res.data.code===-1){
                  _this.$message({
                        message: 'instances request failed ',
                        type: 'fail'
                    });
            }else{
           
                _this.methodInputLoading=false
                _this.chooseMethodInstancesCont=res.data.data
                _this.instanceLayerMethodChooseData=[initInputList] 
            }
        });
        let initOutputList={
            type: 'DataOut',
            uid:'0',
            parentLevel:'-1',
            userToken:localStorage.getItem('Authorization')
        }
        // 输出
        this.$axios.get('/api/instances',{
            params:initOutputList
        })
        .then((res)=>{
            if(res.data.code===-1){
                  _this.$message({
                        message: 'instances request failed ',
                        type: 'fail'
                    });
            }else{
            
                _this.methodOutputLoading=false
                _this.dataOutCont=res.data.data
                _this.instanceLayerDataOut=[initOutputList] 
            }
        });

       },
        chooseDataForMethod(data){
             this.chooseMethodData=data;
             let _this=this
            console.log('data',data)
             this.$axios.get('/api/pcsInputs',{
                params:{
                    dataId:data.id
                }
            })
            .then(res=>{
                if(res.data.code==0){
                    _this.inputFilesConfigureation=res.data.data
                    _this.inputFilesCfigLoading=false
                    
                }else if(res.data.code==-1){
                    this.$message({
                        type:'fail',
                        message:res.data.data
                    })
                }
            })



        },
        chooseOutDataFileFuc(data){
            this.chooseOutDataFile=data;
        },
        // 执行本地处理方法
        confirmMethodData(){
            let _this=this

            console.log(this.chooseMethodData,this.chooseOutDataFile,this.currentMethod,this.inputConfigValue);
            if(!this.chooseOutDataFile){
                
                this.$message({
                    type:'fail',
                    message:'you have to choose out file'
                })
                return
            }
            let postData={
                pcsId:_this.currentMethod.id,
                dataId:_this.chooseMethodData,
                outId:_this.chooseOutDataFile.id,
                pathArray:_this.inputConfigValue,
                paramsArray:_this.inputConfigParams.length>0?_this.inputConfigParams:undefined
            }
            this.$axios.post('/api/invokeLocalMethod',postData)
            .then(res=>{

                if(res.data.code==0){   
                     _this.$message({
                        type:'success',
                        message:'execute success!'
                    })
                    _this.chooseMethodDataDialog=false
                    _this.$router.push({path:'/instance',query:{type:'DataOut'}})
                }else{
                    _this.$message({
                        type:'fail',
                        message:'error'
                    })
                }



            })

        },
       serviceMigrationDialog(it){
           this.yourToken=localStorage.getItem('relatedUsr').split(',')[1]
           this.sceMigTargetTokent=''
           this.sceMigDialog=true;

           this.currentService=it
       },
       //点击复制到粘贴板
       copyMyToken(){
           this.$refs.myToken[0].select()
           if (document.execCommand("copy")) {
                    document.execCommand("copy");
           }
       },
       serviceMigration(){
                //this.$root.$el.myWS
                this.sceMigTargetTokent
                this.migLoading=true
                let _this=this
                this.$axios.get('/api/uploadpcs',{
                    params:{
                        type:_this.instnaceType,
                        id:_this.currentService.id,
                        token:_this.yourToken,
                         targetToken:_this.sceMigTargetTokent
                    },
                })
                .then(re=>{
                        _this.migLoading=false
                    if(re.data.code==0){
                        let msg={
                            msg:'Migration',
                            serviceDownloadId:re.data.uid,
                            fromToken:_this.yourToken,
                            targetToken:_this.sceMigTargetTokent
                        }
                        _this.$root.$el.myWS.send(JSON.stringify(msg))
                        _this.sceMigDialog=false;
                        
                            
                    }else if(re.data.code==-1){
                        _this.$message({
                            type:'fail',
                            message:'mirgation failed'
                        })
                    }else if(re.data.code==1){
                        // 大文件迁移，由于数据较大，时间较长，所以会在后台显示进度，
                        // 前台可以做其他事情，接受节点收到消息后会在前台显示消息，类似于异步
                        // 
                        console.log(re.data.progress)
                         _this.$message({
                            type:'success',
                            message:'Migrating Large File，A message is responded to when the migration is successful',
                            duration:0,
                            showClose:true
                        })
                    }
                })
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
.operate{
 min-width: 135px;
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
.el-col i:hover{
    color: #29e929;
    font-weight: bolder;
}
.el-col .el-icon-delete:hover{
    color:red;
    font-weight: bolder;
}
  
</style>
