<template>
  <div class="form">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="ruleForm" label-width="100px" :hide-required-asterisk="true">
          <!-- 名称 -->
          <el-form-item  label="Name" prop="name">
            <el-input v-model="form.name" placeholder="请输入数据源名称" style="width:220px;"></el-input>
          </el-form-item>
          <el-form-item  label="Describe">
            <el-input type="textarea" v-model="form.desc"></el-input>
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
          <!--   -->
          <el-form-item
            label=""
          >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >{{isEditType?"Create":"Edite"}}</el-button>
          </el-form-item>
          <!--  -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
 

export default {
  props: ["user"],
  data() {
    return {
      form: {
        name: "",
        // tag
        dynamicTags: ["UDX", "水文学"],
        desc: ""
      },

      inputVisible: false,
      inputValue: "",

      // 上传文件
      fileList: [],
      //编辑
      editData: {},
      isEditType: false
      // udx_source_upload_url: urlUtils.udx_source_upload
    };
  },
  computed: {
  
  },
  mounted() {
    this.isEdit();
  },
  methods: {
    isEdit() {
      //   console.log(this.$route.query.id)
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
    

      if (this.form.name.length <= 0) {
        alert("name empty");
        return;
      }

      let formData = new FormData();

      formData.append("name", this.form.name);
      formData.append("tags", this.form.dynamicTags);
      formData.append("desc", this.form.desc);
      formData.append("username", this.user.username);
      formData.append("uid", this.user.uid);

      if (this.isEditType) {
        formData.append("id", this.$route.query.id);
        httpUtils.post(this, urlUtils.workspace_update, formData, data => {
          if (data === "workspace already exist!") {
            this.$message({
              type: "success",
              message: "工作空间已存在，请重命名！"
            });
          } else {
            this.$message({
              type: "success",
              message: "工作空间修改成功"
            });
            this.$router.replace("/console/workspace");
          }
        });
      } else {
        httpUtils.post(this, urlUtils.workspace_create, formData, data => {
          if (data === "workspace already exist!") {
            this.$message({
              type: "success",
              message: "工作空间已存在，请重命名！"
            });
          } else {
            this.$message({
              type: "success",
              message: "工作空间创建成功"
            });
            this.$router.replace("/console/workspace");
          }
        });
      }
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
