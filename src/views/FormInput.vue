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
            <el-input v-model="form.name"  maxlength="25" show-word-limit placeholder="请输入数据源名称" style="width:220px;"></el-input>
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
          <el-form-item  label="Describe">
            <el-input type="textarea" rows="3"  maxlength="30" show-word-limit v-model="form.desc" placeholder="Overview about this..."></el-input>
          </el-form-item>
          <!-- detail -->
          <el-form-item  label="Detail">
            <el-input type="textarea" rows="6"  maxlength="200" show-word-limit v-model="form.detail" placeholder="Detail about this..."></el-input>
          </el-form-item>

          <!-- 标签 -->
          <el-form-item label="Tags" prop="name">
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

          <!-- 链接参数 -->
           <el-form-item  v-if="this.$route.query.type!='FileWorkSpace'" label="Local URL" prop="Url">
            <el-popover
              placement="top-start"
              title="Attention"
              width="200"
              trigger="hover"
              content="Specific to a file or a folder(for multi files)">
            </el-popover>
            <el-input v-model="form.LocalURL" placeholder="file://" style="width:90%;"></el-input>
             
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
        <el-form v-if="this.$route.query.type==='Processing'" ref="ruleForm" label-width="100px" :hide-required-asterisk="true">
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
            <el-input v-model="form.name"  maxlength="25" show-word-limit placeholder="请输入数据源名称" style="width:220px;"></el-input>
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
          <el-form-item  label="Describe">
            <el-input type="textarea" rows="3"  maxlength="30" show-word-limit v-model="form.desc" placeholder="Overview about this..."></el-input>
          </el-form-item>

          <!-- 上传按钮 -->
          <el-form-item  label="Upload">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/api/newprocessing"
              multiple
              :limit="2"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="processingList"
              :on-exceed="handleExceed"
              :auto-upload="false">
              
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
               
                  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadProcessing">上传到服务器</el-button>

              <div slot="tip" class="el-upload__tip">上传python处理方法脚本以及执行参数描述xml</div>
            </el-upload>
          </el-form-item>
          <!-- 关联数据 -->
          <el-form-item label="Select Data">
            <el-button type="primary" @click="selectData">Select </el-button>
            <el-dialog
              title="提示"
              :visible.sync="dialogVisible"
              width="30%"
              :before-close="handleClose">
              <span>这是一段信息</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-form-item>
          <!-- 创建按钮 -->
          <el-form-item  label="Create">
            <el-button
            size="large"
              style="width:250px"
              type="success"
             @click="createProcessingMethod">Create</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
 
import uuidv4 from 'uuid/v4' 
import utils from '../utils/utils.js'

export default {
  props: ["user"],
  data() {
    return {
      form: {
        workspace:"",
        name: "test data copy",
        // tag
        dynamicTags: ["UDX", "水文学"],
        desc: "",
        detail:"",
        authority:true,
        LocalURL:'D:\\Projects\\dataContainerFrontEnd\\data'
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
      localDisk:''
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
          dataPath:_this.form.LocalURL
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
    submitUploadProcessing() {
        this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log(file);
    },
    handleExceed(files, fileList){
      this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    selectData(){
      
    }




    
     

  }
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
</style>
