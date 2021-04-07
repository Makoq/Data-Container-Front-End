import Content from '@/views/Content';
<template>
  <div class="form" v-loading.fullscreen.lock="submitUploadLoading">
    <el-row :gutter="20" >
      
       <el-col :span="this.$route.query.type==='Data'?6:0" class="category">
              <el-card class="box-card categoryList" style="margin-left:20px">
                    <div slot="header" class="clearfix text-center">
                        <span style="font-size: 20px;color:#444">Data Categories</span>
                    </div>
                    <el-collapse v-model="categories.activeNames" @change="handleChange">
                        <el-collapse-item title="Application-focused categories" name="1">
                            <el-collapse v-model="categories.activeNames1" @change="handleChange1">
                                <el-collapse-item title="Natural-perspective" style="margin-left: 10%;font-size: smaller;" name="11">
                                    <el-button type="text" id="5f3e42070e989714e8364e9a" @click="chooseCate('5f3e42070e989714e8364e9a')">Land regions</el-button>
                                    <el-button type="text" id="5f3e422a0e989714e8364e9c" @click="chooseCate('5f3e422a0e989714e8364e9c')">Ocean regions</el-button>
                                    <el-button type="text" id="5f3e42360e989714e8364e9e" @click="chooseCate('5f3e42360e989714e8364e9e')">Frozen regions</el-button>
                                    <el-button type="text" id="5f3e42400e989714e8364ea0" @click="chooseCate('5f3e42400e989714e8364ea0')">Atmospheric regions</el-button>
                                    <el-button type="text" id="5f3e424c0e989714e8364ea2" @click="chooseCate('5f3e424c0e989714e8364ea2')">Space-earth regions</el-button>
                                    <el-button type="text" id="5f3e42550e989714e8364ea4" @click="chooseCate('5f3e42550e989714e8364ea4')">Solid-earth regions</el-button>
                                    <!--                                    <el-button type="text" id="5f3e42610e989714e8364ea6" @click="chooseCate('5f3e42610e989714e8364ea6')" style="font-size: x-small">Integrated Perspective</el-button>-->
                                </el-collapse-item>
                                <el-collapse-item title="Human-perspective" style="margin-left: 10%;font-size: x-small;" name="12">
                                    <el-button type="text" id="5f3e42780e989714e8364ea8" @click="chooseCate('5f3e42780e989714e8364ea8')">Development activities</el-button>
                                    <el-button type="text" id="5f3e42830e989714e8364eaa" @click="chooseCate('5f3e42830e989714e8364eaa')">Social activities</el-button>
                                    <el-button type="text" id="5f3e428c0e989714e8364eac" @click="chooseCate('5f3e428c0e989714e8364eac')">Economic activities</el-button>
                                    <!--                                    <el-button type="text" id="5f3e42940e989714e8364eae" @click="chooseCate('5f3e42940e989714e8364eae')" style="font-size: x-small">Integrated Perspective</el-button>-->
                                </el-collapse-item>
                                <el-collapse-item title="Integrated-perspective" style="margin-left: 10%;" name="13">
                                    <el-button type="text" id="5f6c424eefdc249e286947b8" @click="chooseCate('5f6c424eefdc249e286947b8')">Global scale</el-button>
                                    <el-button type="text" id="5f6c42d2efdc249dc47f4665" @click="chooseCate('5f6c42d2efdc249dc47f4665')">Regional scale</el-button>
                                </el-collapse-item>
                            </el-collapse>
                        </el-collapse-item>
                        <el-collapse-item title="Method-focused categories" style="font-size: 14px;" name="2">
                            <el-collapse v-model="categories.activeNames2" @change="handleChange1">
                                <el-collapse-item title="Data-perspective" style="margin-left: 10%;font-size: x-small;" name="21">
                                    <el-button type="text" id="5f3e42ac0e989714e8364eb0" @click="chooseCate('5f3e42ac0e989714e8364eb0')">Geoinformation analysis</el-button>
                                    <el-button type="text" id="5f3e42b40e989714e8364eb2" @click="chooseCate('5f3e42b40e989714e8364eb2')">Remote Sensing analysis</el-button>
                                    <el-button type="text" id="5f3e42bc0e989714e8364eb4" @click="chooseCate('5f3e42bc0e989714e8364eb4')">Geostatistical analysis</el-button>
                                    <el-button type="text" id="5f3e42c30e989714e8364eb6" @click="chooseCate('5f3e42c30e989714e8364eb6')">Intelligent computation analysis</el-button>
                                </el-collapse-item>
                                <el-collapse-item title="Process-perspective" style="margin-left: 10%;font-size: x-small;" name="22">
                                    <el-button type="text" id="5f3e42d40e989714e8364eb8" @click="chooseCate('5f3e42d40e989714e8364eb8')">Physical process calculation</el-button>
                                    <el-button type="text" id="5f3e42dc0e989714e8364eba" @click="chooseCate('5f3e42dc0e989714e8364eba')">Chemical process calculation</el-button>
                                    <el-button type="text" id="5f3e42e30e989714e8364ebc" @click="chooseCate('5f3e42e30e989714e8364ebc')">Biological process calculation</el-button>
                                    <el-button type="text" id="5f3e42ec0e989714e8364ebe" @click="chooseCate('5f3e42ec0e989714e8364ebe')">Human-activity calculation</el-button>
                                </el-collapse-item>
                            </el-collapse>
                        </el-collapse-item>
                    </el-collapse>
                    
                </el-card>
       </el-col>      
       <el-col :span="this.$route.query.type==='Data'?18:12"  >
      <!--数据部分 开始  -->
        <el-form  v-if="this.$route.query.type==='Data'" ref="ruleForm" label-width="100px" :hide-required-asterisk="true">
         
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
           <el-collapse v-model="autoActiveDescPart" >
              <el-collapse-item title="Basic Information :" name="1">
          <!-- 名称 -->
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
          <el-form-item  label="Name" prop="name">
            <el-input v-model="form.name" style="width:40%" maxlength="25" show-word-limit placeholder="Name of the data" ></el-input>
          </el-form-item>

          <!-- 分类 -->
          <el-form-item  label="Categories" prop="name">
            <!-- <el-input v-model="form.categories" style="width:40%"   show-word-limit placeholder="Choose categories" ></el-input> -->
            <el-tag
              v-for="tag in form.categories"
              :key="tag.cateId"
              closable
              @close="delCate(tag)"
              :type="tag.type">
                
              {{tag.cateId}}
            </el-tag>
          </el-form-item>

          <!-- 模板 -->
          <el-form-item label = "Template" prop="name">
            <el-button type="primary" @click="dataTelmplateDialogVisable" plain>
              Select Templates
            </el-button>
            <el-tag type="success" closable @close="handleCloseTemplate(tag)" style="margin:1%">{{choosedTemplate.name}}</el-tag>

          </el-form-item>
          <el-dialog
            title="Data Template Select"
            :visible.sync="dataTemplateDialog"
            width="60%"
            :show-close="true">
            <h3>You have selected data template:  </h3><br>
            <el-alert
              :title="choosedTemplate.name!=undefined?choosedTemplate.name:'not select'"

              type="success">
            </el-alert>
            <el-divider></el-divider>
            <el-row>

              <el-col :span="8">
                <!-- <div @click="telmplate('f7fbecf6-9d28-405e-b7d2-07ef9d924ca6')">Raster Data Format</div> -->
                <el-tree 
                  :data="templateTreeData"
                  @node-click="telmplate"
                 :default-checked-keys="[100]"
                  :default-expand-all="true"
                  style="width:100%"
                  ></el-tree>
              </el-col>

              <el-col :span="16"> 
                <div class="dataTemplate" v-for="(v,k) in templateList" :key="k">
                  <div class="dataTemplateName" >
                   <span @click="choosedTemplate=v">{{v.name}}</span><i class="el-icon-info"  @click="templateInfo(v)"></i>
                 
                  </div>
                  <div style="font-size: smaller;">{{v.description}}</div>                  
                  </div>
                
                <div class="block">
                  <el-pagination
                    layout="prev, pager, next"
                    :total="currentTemplatePageTotal"
                    :current-page="currentTemplatePage"
                    @current-change="currentChangeTemplate"
                    >
                  </el-pagination>
                </div>
              
              </el-col>
            </el-row>
 
            <span slot="footer" class="dialog-footer">
              <el-button @click="dataTemplateDialog = false">Cancel</el-button>
              <el-button type="primary" @click="dataTemplateDialog = false">OK</el-button>
            </span>
          </el-dialog>

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
            <el-input type="textarea" rows="3"  maxlength="400" show-word-limit v-model="form.desc" placeholder="Overview about this..."></el-input>
          </el-form-item>
          <!-- detail -->
          <el-form-item  label="Detail">
            <el-input type="textarea" rows="6"  maxlength="1000" show-word-limit v-model="form.detail" placeholder="Detail about this..."></el-input>
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
          <!-- unique identification -->
          <el-form-item  label="UID">
            <!-- <el-input type="text" style="width:40%"  maxlength="100" show-word-limit v-model="form.doi" placeholder="Data doi about this..." disabled></el-input> -->
            <span style="color:gray">{{form.uid}}</span>
          </el-form-item>
          <!-- file type -->
          <el-form-item label="File Type">
            <el-radio-group v-model="form.fileDataType">
            <el-radio-button label="File"></el-radio-button>
            <el-radio-button label="DataBase"></el-radio-button>
            <el-radio-button label="Memory"></el-radio-button>
            </el-radio-group>
          </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="Basic metadata :" name="2">
              <!-- data format -->
              <el-form-item  label="Format">
                <el-input type="text" style="width:40%"  maxlength="50" show-word-limit v-model="form.format" placeholder="The format of the main file..."></el-input>
              </el-form-item>
              <!-- Size -->
              <el-form-item  label="Size">
                <el-input type="text" style="width:40%"  maxlength="50" show-word-limit v-model="form.size" placeholder="The approximate storage size of the file...">
                  <template slot="append">MB</template>
                </el-input>
              </el-form-item>
              <!-- time -->
              <el-form-item  label="Time">
                <el-date-picker
                  v-model="form.dataTime"
                  type="datetime"
                  placeholder="choose time">
                </el-date-picker>
              </el-form-item>
              <!--  Quality-->
              <el-form-item  label="Quality">
                <el-rate
                v-model="form.quality"
                show-text
                :texts="texts"
                >
              </el-rate>
              </el-form-item>
              <!-- security classification  -->
              <el-form-item  label="Security">
                <el-radio-group v-model="form.security">
                          <el-radio-button label="Public"></el-radio-button>
                          <el-radio-button label="Secrecy"></el-radio-button>
                
                </el-radio-group>
              </el-form-item>
              <!-- law info -->
              <el-form-item  label="Law Info">
                <el-input type="textarea" style="width:40%"  maxlength="150" show-word-limit v-model="form.lawInfo" placeholder="law Information about this..."></el-input>
              </el-form-item>
              <!-- reference -->
              <el-form-item  label="Reference">
                <el-input type="textarea" style="width:40%"  maxlength="150" show-word-limit v-model="form.references" placeholder="References about this..."></el-input>
              </el-form-item>
              <!-- reference -->
              <el-form-item  label="Owner">
                <el-input type="textarea" style="width:40%"  maxlength="150" show-word-limit v-model="form.owner" placeholder="References about this..."></el-input>
              </el-form-item>
              <!-- email -->
              <el-form-item  label="Email">
                <el-input type="text" style="width:40%"  maxlength="30" show-word-limit v-model="form.email" placeholder="Email about this..."></el-input>
              </el-form-item>

              </el-collapse-item>
              <el-collapse-item title="Semantic Description :" name="3">
                      <!-- semantic -->
                      <el-form-item  label="Semantic">
                        <el-input type="textarea" style="width:80%" rows="4"   show-word-limit v-model="form.semanticDescription.email" placeholder="Email about this..."></el-input>
                      </el-form-item>

                      <!-- spatialReference -->
                      <el-form-item  label="Spatial Reference">
                        <el-input type="textarea" style="width:80%" rows="4"  show-word-limit v-model="form.semanticDescription.spatialReference" placeholder="Email about this..."></el-input>
                      </el-form-item>

                      <!-- unitDimension -->
                      <el-form-item  label="Unit Dimension">
                        <el-input type="textarea" style="width:80%"  rows="4"   show-word-limit v-model="form.semanticDescription.unitDimension" placeholder="Email about this..."></el-input>
                      </el-form-item>
                      <!-- dataTemplate -->
                      <el-form-item  label="Data Template">
                        <el-input type="textarea" style="width:80%" rows="4"    show-word-limit v-model="form.semanticDescription.dataTemplate" placeholder="Email about this..."></el-input>
                      </el-form-item>
              </el-collapse-item>
              <el-collapse-item title="Model Realted :" name="4">
              <!-- model  Recommend model-->
              <el-form-item  label="Recommend Geo-models">
                <el-input type="textarea" style="width:80%" rows="4"    show-word-limit v-model="form.modelRelated.recommendMdoel" placeholder="Email about this..."></el-input>
              </el-form-item>
            
              </el-collapse-item>
           </el-collapse>
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
      <!-- 数据部分 结束 -->
      <!-- 处理及可视化部分 开始-->
        <el-form v-if="this.$route.query.type==='Processing'||this.$route.query.type==='Visualization'||this.$route.query.type.includes('Method')"  ref="ruleForm" label-width="100px" :hide-required-asterisk="true">
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
           <!-- 数据模板 -->
          <el-form-item  label="Template" prop="Template">
            <el-button type="text" @click="telmplateDialogVisable">Select</el-button>
          </el-form-item>

          <el-dialog
            title="Data Template Select"
            :visible.sync="templateDialog"
            width="60%"
            :show-close="true">
            <h3>You have selected data template:  </h3><br>
            <el-alert
              :title="choosedTemplate.name!=undefined?choosedTemplate.name:'not select'"

              type="success">
            </el-alert>
            <el-divider></el-divider>
            <el-row>

              <el-col :span="8">
                <!-- <div @click="telmplate('f7fbecf6-9d28-405e-b7d2-07ef9d924ca6')">Raster Data Format</div> -->
                <el-tree 
                  :data="templateTreeData"
                  @node-click="telmplate"
                 :default-checked-keys="[100]"
                  :default-expand-all="true"
                  style="width:100%"
                  ></el-tree>
              </el-col>

              <el-col :span="16"> 
                <div class="dataTemplate" v-for="(v,k) in templateList" :key="k">
                  <div class="dataTemplateName" >
                   <span @click="choosedTemplate=v">{{v.name}}</span><i class="el-icon-info"  @click="templateInfo(v)"></i>
                 
                  </div>
                  <div style="font-size: smaller;">{{v.description}}</div>                  
                  </div>
                
                <div class="block">
                  <el-pagination
                    layout="prev, pager, next"
                    :total="currentTemplatePageTotal"
                    :current-page="currentTemplatePage"
                    @current-change="currentChangeTemplate"
                    >
                  </el-pagination>
                </div>
              
              </el-col>
            </el-row>
 
            <span slot="footer" class="dialog-footer">
              <el-button @click="templateDialog = false">Cancel</el-button>
              <el-button type="primary" @click="templateDialog = false">OK</el-button>
            </span>
          </el-dialog>

          <!-- 权限 -->
          <el-form-item  label="Authority" prop="name">
            <el-switch
            v-model="processing.authority"
            active-text="public"
            inactive-text="private">
          </el-switch>
          </el-form-item>


          <!-- 类型选择 暂时去掉 在不同页面去创建-->
          <!-- <el-form-item  label="Type" prop="name" >
            <el-radio v-model="processing.processingType" label="Method">Method</el-radio>
            <el-radio v-model="processing.processingType" label="Instance">Instance</el-radio>
          </el-form-item> -->




          <!-- describe -->
          <el-form-item  label="Describe" prop="desc">
            <el-input type="textarea" rows="3" maxlength="400"   show-word-limit v-model="processing.desc" placeholder="Overview about this..."></el-input>
          </el-form-item>

          <!-- params count -->
          <el-form-item  label="Number of parameters"  >
            <!-- <el-input style="margin-top:20px;width:100px"  show-word-limit v-model="processing.paramsCount" placeholder="The number of params.."></el-input> -->
          <el-input-number style="margin-top:20px;" v-model="processing.paramsCount"    ></el-input-number>
          </el-form-item>
           <!-- 关联数据 -->
          <el-form-item label="Data" v-show="!this.$route.query.type.includes('Method')">
            <el-button type="primary" style="width:200px" @click="selectData">Select </el-button>
           
            <!-- </br><span>choose related data</span> -->
            <el-dialog
              title="Choose"
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
                <el-button @click="selectDialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="connectData">OK</el-button>
              </span>
            </el-dialog>


            <span v-if="connectedData"></span>
            <div   class="el-upload__tip">*Specifies the processable data for the creating processing method</div>
          
          </el-form-item>
          <!-- 上传按钮 -->
          
          <el-form-item  label="Scripts">
             
            <el-button     type="primary" @click="upload_pro" style="width:200px">Choose Scripts</el-button>
            <div   class="el-upload__tip">*Upload custom processing files based on template 
              <!-- <el-button type="text" @click="programming_template_visable=true">the programming templates</el-button> -->
            <el-button type="danger" size="small" icon="el-icon-download" @click="downProgramTemplate" circle></el-button>
            </div>
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
          title="Confirm:"
              :visible.sync="createProcessConfirm"
              width="60%"
              height="280px"
          >

          <div><strong>Name: </strong><span style="color:blue"> {{processing.name}}</span></div><br>

          <div><strong>File List: </strong>  
            <el-tag type="danger" v-for="(it,k) in fileList" :key="k">{{it}}</el-tag>
             
           
 
          </div><br>

          <strong>Related Data: </strong> 

            <el-tag v-for="(it,key) in chooseDataArray" :key="key" type="warning" >{{it.name}}</el-tag>

            <span slot="footer" class="dialog-footer">
                <el-button @click="createProcessConfirm = false">Cancle</el-button>
                <el-button type="primary" @click="submitUploadProcessing">OK</el-button>
              </span>
          </el-dialog>
         <!-- 数据上传input,不可见 -->
          <input ref="pro"   id="procesing_up" style="visibility: hidden;" type="file" multiple/>
         

        </el-form>
      <!-- 处理及可视化部分 结束-->
      </el-col >
      <!-- 工作空间复用页面部分 开始-->
      <el-col :span="this.$route.query.type==='WorkSpace'?18:12">
         <el-form v-if="this.$route.query.type==='WorkSpace'"  ref="ruleForm" label-width="100px" :hide-required-asterisk="true">
          <!-- name -->
          <el-form-item  label="Name"  >
            <el-input v-model="workSpace.name"   show-word-limit placeholder="Name of the workspace" ></el-input>
          </el-form-item>
          <!-- desc -->
          <el-form-item  label="Description" >
            <el-input v-model="workSpace.description" type="textarea" rows="5"  show-word-limit placeholder="Name of the workspace" ></el-input>
          </el-form-item>

          <el-form-item    >
               <el-button    type="success" @click="showWorkSpaceInfoConfirm"  style="width:200px">Create WorkSpace</el-button>

          </el-form-item>
         </el-form>
      </el-col>
      <!-- 工作空间复用页面部分 结束-->
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
        categories:[],
        uid:'',
        fileDataType:'File',
        // tag
        dynamicTags: ["gis",'地理学'],
        desc: "",
        detail:"",
        authority:true,
        LocalURL:'D:\\Projects\\testData\\china_admin_shp',
        format:'',
        quality:null,
        security:'Public',
        size:null,
        dataTime:null,
        lawInfo:null,
        references:null,
        owner:null,
        email:'',
        semanticDescription:{
          semanticConcept:null,
          spatialReference:null,
          unitDimension:null,
          dataTemplate:null

        },
        modelRelated:{
          recommendMdoel:null
        }
      },
      submitUploadLoading:false,
    autoActiveDescPart:['1','2','11','21'],
      texts:['Very bad ',' disappointed ', 'just so so ',' satisfied ', 'surprised'],
      processing:{
        name:'',
        authority:true,
        desc:'',
        paramsCount:0,
        processingType:'Instance'
      },
      templateDialog:false,
      templateList:[],
      templateTreeData: [{
                id: 1,
                label: 'Description Templates',
                oid: 'TRJJMYDAUJTDDU5J9GPRUWAG7QJ6PHUU',
                children: [
                    {
                        id: 100,
                        "oid": "f7fbecf6-9d28-405e-b7d2-07ef9d924ca6",
                        "label": "Vector Data Format"
                    },
                    {
                        "oid": "9b104fd6-7949-4c3b-b277-138cd979d053",
                        "label": "Raster Data Format",
                    },
                    {
                        "oid": "316d4df0-436e-4600-a183-80abf7472a72",
                        "label": "Mesh Data Format",
                    },
                    {
                        "oid": "bc437c65-2cfe-4bde-ac31-04830f18885a",
                        "label": "Image Data Format",
                    },
                    {
                        "oid": "39c0824e-8b1a-44e5-8716-c7893afe05e8",
                        "label": "Video Data Format",
                    },
                    {
                        "oid": "82b1c2b4-4c12-441d-9d9c-09365c3c8a24",
                        "label": "Audio Data Format",
                    },
                    {
                        "nameCn": "",
                        "oid": "df6d36e3-8f16-4b96-8d3f-cff24f7c0fd9",
                        "label": "Unstructural Data Format",
                    },
                    {
                        "oid": "26bb993b-453c-481a-a1ea-674db3e888e2",
                        "label": "Model Related Data Format",
                    },
                    {
                        "oid": "1d573467-f1f3-440a-a827-110ac1e820bd",
                        "label": "3D Model Data Format",
                    },
                    {
                        "oid": "8a189836-d563-440c-b5ea-c04778ac05f9",
                        "label": "Tabular Data Format",
                    }]
      }],
      choosedTemplate:{},
      currentTemplatePage:0,
      currentTemplatePageTotal:0,

      currentTemplateCate:'f7fbecf6-9d28-405e-b7d2-07ef9d924ca6',
      workSpace:{
        name:'',
        description:''
        
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
      
      
      processingList:[],
      localDisk:'',
      selectDialogVisible:false,
      instancesCont:{},
      listUid:0,
      folderLayer:['All File'],
      instanceLayer:[],
      chooseDataArray:[],
      connectedData:[],
       
       createProcessConfirm:false,
       programming_template_visable:false,

       //分类
       categories:{
         activeNames:['1','2'],
         activeNames1:['11','12'],
         cateId:undefined
       },
       dataTemplateDialog:false,
    };
  },
  computed: {
  
  },
  mounted() {
    
    console.log("init",this.$route.query)
    this.isEdit();
    this.form.uid=localStorage.getItem('relatedUsr').split(',')[1]+uuidv4()
  },
  
  methods: {
    chooseCate(cateId){
        //this.categories.cateId=cateId
        let obj={id:cateId,cateId:document.getElementById(cateId).firstElementChild.innerHTML,type: 'success'}
        let flag=true
       console.log(obj,cateId)
        for(let it of this.form.categories){
          if(it.id==cateId) {
           
            flag=false
             break
          }
        }
        if(flag){
          this.form.categories.push(obj)
        }
    },
    delCate(tag){
      this.form.categories.splice(this.form.categories.indexOf(tag), 1);
    },
    handleChange1(){},

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
    
      if(this.form.categories.length==0){
        alert("please choose category")
        return
      }
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
          uid:_this.form.uid,
          workSpace:_this.form.workspace,
          description:_this.form.desc,
          detail:_this.form.detail,
          tags:[],
          keywords:_this.form.dynamicTags,
          dataPath:_this.form.LocalURL,
          fileDataType:_this.form.fileDataType,
          quality:_this.form.quality,
          security:_this.form.security,
          size:_this.form.size+'MB',
          dataTime:new Date(_this.form.dataTime).toLocaleString(),
          lawInfo:_this.form.lawInfo,
          references:_this.form.references,
          owner:_this.form.owner,
          email:_this.form.email,
          format:_this.form.format,
          semanticDescription:_this.form.semanticDescription,
          modelRelated:_this.form.modelRelated,
          template:_this.choosedTemplate.oid,
        }

        
      }
      this.form.categories.forEach(v=>{
          newFile['meta']['tags'].push(v.id)
      })
      
      console.log("file",newFile)
      this.submitUploadLoading=true
      this.$axios.put('/api/newFile',newFile,{timeout:600000})//请求超时10分钟
      .then((res)=>{
        _this.submitUploadLoading=false
       
        if(res.data.code===-1){
          let msg = res.data.message;
            _this.$message({
                message: msg,
                type: 'fail'
            });
          }else if(res.data.code===0){

            if(_this.$route.query.type==='Data'){
                 
                 _this.$router.push({path:'/instance',query:{type:'Data'}})
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
    // handleCloseTemplate(done){

    // }

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
      let _this=this
      // 处理包部分
      if(document.getElementById('procesing_up').files.length<2){
        this.$message({
          message:'no processing files',
          type:'fail'
        })
        return
      }

      let fileNameList=[document.getElementById('procesing_up').files[0].name,document.getElementById('procesing_up').files[1].name]
      
      // 绑定数据部分

      if(!_this.$route.query.type.includes("Method")&&_this.connectedData<1){
         this.$message({
          message:'you have to choose a file',
          type:'fail'
        })
        return
      }


      if(_this.processing.name.length<1){
         this.$message({
          message:'you have to give a name',
          type:'fail'
        })
        return
      }

      if(_this.choosedTemplate.oid==undefined){
        this.$message({
          message:'you have to select a data template',
          type:'fail'
        })
        return
      }
      let upObj={
        //instance基本信息
        'uid':_this.$route.query.instance_uid,
        'instype':_this.$route.query.type,
        'userToken':_this.$route.query.userToken,
        //关联用户信息
        'oid':localStorage.getItem('relatedUsr').split(',')[0],
        // 数据模板信息
       'dataTemplateOid':_this.choosedTemplate.oid,
        //处理方法信息
        'id':uuidv4(),
        'name':_this.processing.name,
        'date':utils.formatDate(new Date()),
        'type':_this.$route.query.type,
        'relatedData':_this.$route.query.type.includes("Method")?undefined:_this.connectedData,
        'authority':_this.processing.authority,
        'paramsCount':_this.processing.paramsCount,
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

            }if(_this.$route.query.type==='ProcessingMethod'){
                 
                 this.$router.push({path:'/instance',query:{type:'ProcessingMethod'}})
                  _this.$message({
                        message: 'create success ',
                        type: 'success'
                    });

            }
            else if(_this.$route.query.type==='Visualization'){
                 
                 this.$router.push({path:'/instance',query:{type:'Visualization'}})
                  _this.$message({
                        message: 'create success ',
                        type: 'success'
                    });

            }else if(_this.$route.query.type==='VisualizationMethod'){
                 
                 this.$router.push({path:'/instance',query:{type:'VisualizationMethod'}})
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
          showWorkSpaceInfoConfirm(){
            let _this=this
            if(this.workSpace.name.length!=0){
              this.$alert(this.workSpace.name,'Create Workspace:',  {
                  confirmButtonText: 'ok',
                  callback: action => {
                      _this.createWorkspace()
                  },
                  
              });
            }else{

              this.$message({
                message:'Please input name at least',
                type:'fail'
              })

            }
            
          },
          createWorkspace(){
           
            let _this=this
              const params = new URLSearchParams();
               params.append('uid',uuidv4())
              params.append('name',_this.workSpace.name)
              params.append('description',_this.workSpace.description)

              params.append('date',utils.formatDate(new Date()))

             

         

            this.$axios.post('/api/workspace',params)

            .then(res=>{
                  if(res.status==200){
                    if(res.data.code==0){
                      _this.$message({
                          message:'create success',
                          type:'success'
                      })
                      _this.$router.push('/workSpace')
                    }else if(res.data.code==-2){
                      _this.$message({
                          message:'workspace name should not repeat',
                          type:'fail'
                      })
                    }
                  }
            })

          },
          downProgramTemplate(){
                     window.location.href='http://111.229.14.128:8899/data?uid=f394eb7c-bea9-462d-9b61-4cf8090cc893' 

          }
    ,
    telmplateDialogVisable(){
      this.templateDialog=true
      let _this=this
      let postData={
          "asc": 0,
          "oid": _this.currentTemplateCate,
          "page": 0,
          "searchText": "",
          "sortField": "viewCount"
      }
      
      this.$axios.post('/template/getTemplateList',postData)
      .then(res=>{
        
        _this.templateList=res.data.data.list
        _this.currentTemplatePageTotal=res.data.data.total
        _this.templateDialog=true

      })
    },
    dataTelmplateDialogVisable(){
      this.dataTemplateDialog=true
      let _this=this
      let postData={
          "asc": 0,
          "oid": _this.currentTemplateCate,
          "page": 0,
          "searchText": "",
          "sortField": "viewCount"
      }
      
      this.$axios.post('/template/getTemplateList',postData)
      .then(res=>{
        
        _this.templateList=res.data.data.list
        _this.currentTemplatePageTotal=res.data.data.total
        _this.templateDialog=true

      })
    },
    telmplate(a,b,c){
       
      let _this=this
      _this.currentTemplateCate=a.oid
      let postData={
          "asc": 0,
          "oid": _this.currentTemplateCate,
          "page": _this.currentTemplatePage,
          "searchText": "",
          "sortField": "viewCount"
      }
       
      this.$axios.post('/template/getTemplateList',postData)
      .then(res=>{
        _this.templateList=res.data.data.list
        _this.currentTemplatePageTotal=res.data.data.total
        console.log()

      })
    },
    templateInfo(v){
      // window.location.href='https://geomodeling.njnu.edu.cn/repository/template/'+v.oid
      window.open('https://geomodeling.njnu.edu.cn/repository/template/'+v.oid)
    },
    currentChangeTemplate(p){
      let _this=this
      let postData={
          "asc": 0,
          "oid": _this.currentTemplateCate,
          "page": p-1,
          "searchText": "",
          "sortField": "viewCount"
      }
      this.$axios.post('/template/getTemplateList',postData)
      .then(res=>{
        
         _this.templateList=res.data.data.list
         _this.currentTemplatePageTotal=res.data.data.total

      })

    },
    handleCloseTemplate(tag){
        console.log(tag);
    }




      
      

    },
    
};
</script>

<style>
.form{
    margin-top: 50px;
    min-width: 1200px;
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
.category .el-button{

  color:darkblue;
  
}
 .category .el-button:hover{
   color: rgb(209, 111, 31);
   font-weight: bolder;
 }
.el-form .el-collapse-item__header{
  color: #163d5e;
  font-size: larger;
    font-weight: bold;
}
.el-form .el-collapse-item__wrap{
  background-color:#f8fafb;
}

.dataTemplate{
    border: solid #e1e1e1 0.5px;
    border-radius: 5%;
    padding: 5px;
}
.dataTemplateName{
   font-size: initial;
  color: #0674d4;
}
.dataTemplateName:hover{
  cursor: pointer; 
 

}
.dataTemplate:hover{
    background-color: aliceblue;
}

</style>
