import Content from '@/views/Content';
<template>
  <div class="form">
    <el-row :gutter="20">
      <el-col :span="12" style="width: 90%;">
        <el-form v-if="this.$route.query.type==='Data'" ref="ruleForm" label-width="100px" :hide-required-asterisk="true">
         
          <!-- 工作空间 -->
          <!-- <el-form-item v-if="this.$route.params.type!='FileWorkSpace'" label="WorkSpace" prop="workspace">

            <el-select   v-model="form.workspace" placeholder="请选择">
                <el-option
                v-for="item in workspaceList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item> -->
         
          <!-- 名称 -->
          <el-form-item  label="Name" prop="name">
            <el-input v-model="form.name" style="width:40%" maxlength="25" show-word-limit placeholder="Name of the data" ></el-input>
          </el-form-item>
          <!-- 权限 -->
          <el-form-item  label="Authority" prop="name">
            <el-switch
            v-model="form.authority"
            active-text="public"
            inactive-text="private">
           </el-switch>
          </el-form-item>

          <!-- describe -->
          <el-form-item  label="Abstract">
            <el-input type="textarea" rows="3"  maxlength="30" show-word-limit v-model="form.desc" placeholder="Overview about this..."></el-input>
          </el-form-item>
          <!-- detail -->
          <el-form-item  label="Detail">
            <el-input type="textarea" rows="6"  maxlength="200" show-word-limit v-model="form.detail" placeholder="Detail about this..."></el-input>
          </el-form-item>

          <!-- 标签 -->
          <el-form-item label="Keywords" prop="name">
            <el-tag
              :key="tag"
              v-for="tag in form.dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
            >{{tag}}</el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            ></el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ add Tags</el-button>
          </el-form-item>
          <!-- data format -->
          <el-form-item  label="Format">
            <el-input type="text" style="width:40%"  maxlength="50" show-word-limit v-model="form.format" placeholder="Data Format about this..."></el-input>
          </el-form-item>

           <!-- email -->
          <el-form-item  label="Email">
            <el-input type="text" style="width:40%"  maxlength="50" show-word-limit v-model="form.email" placeholder="Data Format about this..."></el-input>
          </el-form-item>

          <!-- 链接参数 -->
           <el-form-item  v-if="this.$route.query.type!='FileWorkSpace'" label="Local URL" prop="Url">
            <el-popover
              placement="top-start"
              title="Attention"
              width="200"
              trigger="hover"
              content="Specific to a file or a folder(for multi files)">
            </el-popover>
            <el-input v-model="form.LocalURL" placeholder="file://" style="width:100%;"></el-input>
             
          </el-form-item>
           
          <!-- 提交或编辑  -->
          <el-form-item
            label="Submit"
            style="margin-bottom:100px"
           >
            <el-button
             
              size="large"
              style="width:250px"
              type="success"
              @click="submitUpload()"
            >{{isEditType?"Edite":"Create"}}</el-button>
          </el-form-item>
          <!--  -->
        </el-form>
        <el-form v-if="this.$route.query.type==='Processing'||this.$route.query.type==='Visualization'"  ref="ruleForm" label-width="100px" :hide-required-asterisk="true">
            <!-- <el-form-item v-if="this.$route.params.type!='FileWorkSpace'" label="WorkSpace" prop="workspace">

              <el-select   v-model="form.workspace" placeholder="请选择">
                  <el-option
                  v-for="item in workspaceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  </el-option>
              </el-select>
          </el-form-item> -->
         
          <!-- 名称 -->
          <el-form-item  label="Name" prop="name">
            <el-input v-model="processing.name"  maxlength="25" show-word-limit placeholder="input name.." style="width:220px;"></el-input>
          </el-form-item>
          <!-- 权限 -->
          <el-form-item  label="Authority" prop="name">
            <el-switch
            v-model="processing.authority"
            active-text="public"
            inactive-text="private">
          </el-switch>
          </el-form-item>

          <!-- describe -->
          <el-form-item  label="Describe" prop="desc">
            <el-input type="textarea" rows="3"  maxlength="30" show-word-limit v-model="processing.desc" placeholder="Overview about this..."></el-input>
          </el-form-item>
           <!-- 关联数据 -->
          <el-form-item label="Data">
            <el-button type="primary" style="width:200px" @click="selectData">Select </el-button>
           
            <!-- </br><span>choose related data</span> -->
            <el-dialog
              title="挑选数据"
              :visible.sync="selectDialogVisible"
              width="60%"
              height="280px"
               >
               <el-row style=" height:250px">
               <el-col :span="10" style=" height:250px;overflow-y:scroll">
                 <span v-if="chooseDataArray.length==0">choose data</span>
                 <el-tag
                  v-for="tag in chooseDataArray"
                  :key="tag.name"
                   
                   >
                  {{tag.name}}
                </el-tag>
               </el-col>
               <el-col :span="14" style=" height:250px;overflow-y:scroll">
                <!-- 文件层次深浅进出功能按钮 -->
                <el-row style="height:30px;margin-left: 20PX;margin-top:10px"> 
                        <el-button v-if="folderLayer.length===1" size="mini" type="text" disabled>  All file</el-button>
                      <el-button  v-else size="mini" type="text"  @click="backUpperFolder"  >Upper Folder</el-button>
                      <el-divider v-if="folderLayer.length>1" direction="vertical"></el-divider>
                      <span v-if="folderLayer.length>1">&nbsp;{{folderLayer.join(' / ')}}</span>
                </el-row>
                  <el-row  v-for="(it,key) in instancesCont.list" :key="key"  class="item" >
                 
                    <el-col :span="2" :offset="1">
                      <img  v-if="it.type==='folder'" src="../assets/folder.png" width="28" height="30" alt="Safari" title="Safari">

                        <img v-if="it.type==='file'" src="../assets/zip.png" width="28" height="30" alt="Safari" title="Safari">
                    </el-col>
                    <el-col :span="17" style="height:100%"> 
                        <a v-if="it.type==='folder'" class="floderName" type="text"  @click="intoFolder(it)"  ref="floderName">
                            {{it.name}}
                        </a>
                        <span class="dataName"  v-if="it.type==='file'">{{it.name}}</span>

                    </el-col>
                    <el-col v-if="it.type==='file'" :span="3" style="height:100%"> 
                      <el-button type="primary" @click="chooseData(it)">Add</el-button>
                    </el-col>
                  </el-row>
              </el-col>
               </el-row>
              <span slot="footer" class="dialog-footer">
                <el-button @click="selectDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="connectData">确 定</el-button>
              </span>
            </el-dialog>
            <span v-if="connectedData"></span>
            <div   class="el-upload__tip">*Specifies the processable data for the creating processing method</div>
          
          </el-form-item>
          <!-- 上传按钮 -->
          
          <el-form-item  label="Scripts">
             
            <el-button     type="primary" @click="upload_pro" style="width:200px">Choose Scripts</el-button>
            <div   class="el-upload__tip">*Upload custom processing files based on <el-button type="text" @click="programming_template_visable=true">the programming templates</el-button></div>
           
          </el-form-item>
          <el-dialog
            title="Programing Template"
              :visible.sync="programming_template_visable"
              width="60%"
              height="280px"
          >
            <img src="../assets/programing_template.png" style="width:90%;height:90%">
              <span slot="footer" class="dialog-footer">         
                <el-button type="primary" @click="programming_template_visable=false">OK</el-button>
              </span>
          </el-dialog>
           
          <!-- 创建 -->
          <el-form-item>
            <el-button    type="success" @click="showProcessInfoConfirm"  style="width:200px">Create</el-button>

          </el-form-item>
          <el-dialog
          title="确认"
              :visible.sync="createProcessConfirm"
              width="60%"
              height="280px"
          >
          <div>Name: {{processing.name}}</div>
          <div>File List: {{fileList}}</div>
          Related Data:<div v-for="(it,key) in chooseDataArray" :key="key">{{it.name}}</div>


            <span slot="footer" class="dialog-footer">
                <el-button @click="createProcessConfirm = false">Cancle</el-button>
                <el-button type="primary" @click="submitUploadProcessing">OK</el-button>
              </span>
          </el-dialog>
         <!-- 数据上传input,不可见 -->
          <input ref="pro"   id="procesing_up" style="visibility: hidden;" type="file" multiple/>
         

        </el-form>

        
      </el-col>
    </el-row>
  </div>
</template>

<script>
 
import uuidv4 from 'uuid/v4' 
import utils from '../utils/utils.js'
import request from 'request'
export default {
  props: ["user"],
  data() {
    return {
      form: {
        workspace:"",
        name: "",
        // tag
        dynamicTags: ["5f3e41e80e989714e8364e98"],
        desc: "",
        detail:"",
        authority:true,
        LocalURL:'D:\\Projects\\testData\\china_admin_shp',
        format:'',
        email:''
      },
      processing:{
        name:'',
        authority:true,
        desc:'',


      },
      workspaceList:[
        {
          value: 'option1',
          label: 'My Workspace'
        },  
      ],
      inputVisible: false,
      inputValue: "",

      // 上传文件
      fileList: [],
      //编辑
      editData: {},
      isEditType: false,
      // udx_source_upload_url: urlUtils.udx_source_upload
      LocalURLDialogVisible:false,
      
      localDiskList:[
          {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, 
      ],
      processingList:[],
      localDisk:'',
      selectDialogVisible:false,
      instancesCont:{},
      listUid:0,
      folderLayer:['All File'],
      instanceLayer:[],
      chooseDataArray:[],
      connectedData:[],
       rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请填写描述', trigger: 'blur' }
          ]
       },
       createProcessConfirm:false,
       programming_template_visable:false



    };
  },
  computed: {
  
  },
  mounted() {
      console.log("init",this.$route.query)
    this.isEdit();
  },
  
  methods: {
    isEdit() {
      //   console.log(this.$route.query.id)
      //   在编辑时路由参数为type:edit
      let id = this.$route.query.id;
      if (this.$route.query.type === "edit") {
        httpUtils.get(this, urlUtils.workspace_single + "?id=" + id, data => {
          console.log(data);
          this.editData = data[0];
          this.form.name = data[0].name;
          this.form.dynamicTags = data[0].tags.split(",");
          this.form.desc = data[0].describe;

          this.isEditType = true;
        });
      }
    },
    submitUpload() {
    
      
      if (this.form.name.length == 0||this.form.LocalURL.length ==0) {
        alert("please complete content!");
        return;
      }
      let _this=this
      let newFile={
        //instance基本信息
        uid:_this.$route.query.instance_uid,
        instype:_this.$route.query.type,
        userToken:_this.$route.query.userToken,
        //关联用户信息
        oid:localStorage.getItem('relatedUsr'),
       //文件信息
        id:uuidv4(),
        name:_this.form.name,
        date:utils.formatDate(new Date()),
        type:'file',
        authority:_this.form.authority,
        meta:{
          workSpace:_this.form.workspace,
          description:_this.form.desc,
          detail:_this.form.detail,
          tags:_this.form.dynamicTags,
          dataPath:_this.form.LocalURL,
        }
      }
      console.log("file",newFile)

      this.$axios.put('/api/newFile',newFile,{timeout:600000})//请求超时10分钟
      .then((res)=>{
       
        if(res.data.code===-1){
            _this.$message({
                message: 'failed ',
                type: 'fail'
            });
          }else{

            if(_this.$route.query.type==='Data'){
                 
                 this.$router.push({path:'/instance',query:{type:'Data'}})
                  _this.$message({
                        message: 'create success ',
                        type: 'success'
                    });

            }           

          }
      })




    },
    handleRemove(file, fileList) {
      console.log("remove", file, fileList);
    },
    handlePreview(file) {
      console.log("preview", file);
    },
    handleChange(file, fileList) {
      this.fileList = fileList;
      // console.log("change", file, fileList);
    },
    handleExceed(file) {
      console.log("exceed", file);
    },

    // tag
    handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    showProcessInfoConfirm(){
      this.createProcessConfirm=true
      this.fileList=[document.getElementById('procesing_up').files[0].name,document.getElementById('procesing_up').files[1].name]

    },
    submitUploadProcessing() {
      if(document.getElementById('procesing_up').files.length<2){
        this.$message({
          message:'no processing files',
          type:'fail'
        })
        return
      }

      let _this=this
      console.log(document.getElementById('procesing_up').files)

      let fileNameList=[document.getElementById('procesing_up').files[0].name,document.getElementById('procesing_up').files[1].name]
       
      let upObj={
        //instance基本信息
        'uid':_this.$route.query.instance_uid,
        'instype':_this.$route.query.type,
        'userToken':_this.$route.query.userToken,
        //关联用户信息
        'oid':localStorage.getItem('relatedUsr').split(',')[0],
     
       
        //处理方法信息
        'id':uuidv4(),
        'name':_this.processing.name,
        'date':utils.formatDate(new Date()),
        'type':_this.$route.query.type,
        'relatedData':_this.connectedData,
        'authority':_this.processing.authority,
        'fileList':fileNameList,
        
        'description':_this.processing.desc,

         
      }
      var formdata=new FormData()
      for(let v in upObj){
        formdata.append(v,upObj[v])
      }
      formdata.append('files', document.getElementById('procesing_up').files[0])
      formdata.append('files', document.getElementById('procesing_up').files[1])

      
      this.$axios.post('/api/newprocess',formdata,{
       headers: {'Content-Type': 'multipart/form-data'}
      })
      .then(res=>{
        
        if(res.data.code===-1){
            _this.$message({
                message: 'failed ',
                type: 'fail'
            });
          }else{

            if(_this.$route.query.type==='Processing'){
                 
                 this.$router.push({path:'/instance',query:{type:'Processing'}})
                  _this.$message({
                        message: 'create success ',
                        type: 'success'
                    });

            }else if(_this.$route.query.type==='Visualization'){
                 
                 this.$router.push({path:'/instance',query:{type:'Visualization'}})
                  _this.$message({
                        message: 'create success ',
                        type: 'success'
                    });

            }               

          }


      })
       
        
    },
    readyCreate(){

    }
    ,
    selectData(){
      this.chooseDataArray=[]//选择数据置空
      this.connectedData=[]//选择id置空
      this.selectDialogVisible=true
      this.instnaceType=this.$route.query.type
        let _this=this
        //通过列表id和用户token获取对应层级的列表
        let initList={
            type: 'Data',
            uid:'0',
            parentLevel:'-1',
            userToken:localStorage.getItem('Authorization')
        }
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
                console.log('init data',res.data)
                _this.instancesCont=res.data.data
                _this.instanceLayer=[initList] 
            }
            
        })

    },
    upload_pro(){
      document.querySelector('#procesing_up').click()
    },
    chooseData(it){
      if(this.chooseDataArray.indexOf(it)>-1){
        this.$message({message:'already add',
        type:'fail'})
      }else{
         this.chooseDataArray.push(it)
      }
    },
    connectData(){
      let _this=this
      this.selectDialogVisible=false
      this.chooseDataArray.forEach((it)=>{
            _this.connectedData.push(it.id)        
      })
    },
    
    intoFolder(Folder){
      let _this=this
      let info={
          uid:Folder.subContentId,
          userToken:localStorage.getItem('Authorization'),
          type:'Data',
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




      
      

    },
    
};
</script>

<style>
.form{
    margin-top: 50px
}
.upload {
  width: 300px;
}
.data-preview {
  padding: 10px;
  background-color: #f9f9f9;
}
.data-preview .tips {
  margin: 8px 4px 12px;
  color: #909399;
  font-size: 16px;
}
.data-preview .tips span {
  margin-left: 4px;
  font-size: 14px;
}

/* tag */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.floderName:hover{
    color: rgb(0, 174, 255);
    cursor:pointer;
}
</style>
