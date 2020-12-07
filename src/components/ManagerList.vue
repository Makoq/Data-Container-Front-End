<template>
  <div>
    <!-- <el-table
        :data="listData"
        style="width: 100%">
        <el-table-column
          label="name"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="Tags"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>name: {{ scope.row.name }}</p>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="Operate">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :style="selectedWorkspace(scope.$index, scope.row)"
              @click="handleSelect(scope.$index, scope.row)">Select</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>  -->

    <div
      v-for="(item, index) in listData"
      :key="index"
      class="contentCard_w100 flexCol flexColCenter"
    >
      <div class="content_h32 flexRow noPadding" style="margin-top: 10px;">
        <div class="content_w68 flexJustStart" style="margin-left: 1%;">
          <div class="flexColCenter w100">
            <a class="w100" :href="'/item/hub/' + item.Uid">
              <h4 class="itemTitle">{{ item.name }}</h4></a
            >
          </div>
        </div>
        <div
          class="content_w32 flexJustAround flexColCenter buttonZone"
          style="text-align: right; margin: 0 auto 0 auto;"
        >
          <el-tooltip
            popper-class="fontsize-15"
            effect="light"
            :content="item.status"
            placement="left"
          >
            <i
              v-if="item.status == 'Public'"
              class="el-icon-unlock public fontsize-20 pull-right"
            ></i>
            <i
              v-if="item.status == 'Discoverable'"
              class="el-icon-unlock discoverable fontsize-20 pull-right"
            ></i>
            <i
              v-if="item.status == 'Private'"
              class="el-icon-lock private fontsize-20 pull-right"
            ></i>
          </el-tooltip>
          <div style="margin-right:25px" class="select" :id="gernerateId(index)">
            <el-button
              type="info"
              class="selectBtn"              
              style="display:inline-block;padding:5px;margin-right: 5px;"
              @click="handleSelect(index,item)"
              icon="el-icon-star-off"
              circle
            ></el-button>
            <p style="display:inline-block">Select</p>
          </div>
          <div style="margin-right:25px;display:none" class="selectOk" :id="gernerateIdOk(index)">
            <el-button
              type="primary"
              class="selectBtn"
              style="display:inline-block;padding:5px;margin-right: 5px;"
              icon="el-icon-check"
              circle
            ></el-button>
            <p style="display:inline-block">Selected</p>
          </div>
          <div
            class="lineButton flexJustStart flexColCenter"
            style="margin-right:30px"
          >
            <i class="fa fa-edit" style="margin-right: 5px"></i>
            <div class="lineButton flexCol">
              <p style="margin-block-end: 0">Edit</p>
              <div class="hoverLine"></div>
            </div>
          </div>
          <div
            class="btn btn-danger btn-round btn-noShadow waves-effect waves-light flexCenter"
          >
            <i class="fa fa-trash-o"></i>
            <p>Delete</p>
          </div>
        </div>
      </div>
      <!--                            <div class="innerBorderGrey89"></div>-->
      <div
        class="content_h68 flexCol noPadding"
        style="width: 100%;
                            background-image: linear-gradient(to right, #fdf9f4 0%, #ebf6f8 100%);height: 100%;"
      >
        <div
          class="flexRow"
          style="width: 100%;height: 100%;background-color: rgba(255, 255, 255, 0.2)"
        >
          <div class="flexRow " style="width: 100%;">
            <div class="content_w100" style="padding-top: 21px;margin-left:3%">
              <div class="flexJustStart flexAlignStrench overviewContainer">
                <div style="padding-bottom: 15px;">
                  <b style="margin-right: 25px;">Overview:</b>
                </div>
                <div>
                  <p class="threeLine" style="">{{ item.description }}</p>
                </div>
              </div>
              <p>
                <b style="margin-right: 3px">Create Time:</b> {{ item.date }}
              </p>
            </div>
            <!-- <div class="btn btn-info btn-round btn-noShadow" style="text-align: right;margin: auto;" @click="creatItem(1)">create new <span><i
                                                    class="fa fa-arrow-right"></i></span></div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <!-- <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination> -->
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props: ["listData"],
  data() {
    return {};
  },
  mounted() {},
  methods: {
    selectedWorkspace(index, row) {
      console.log(row);
      // if(row.uid==this.$store.currentWorkspace.uid){
      //   return 'rgb(0, 174, 255)'
      // }
    },
    handleSelect(index, row) {
      //  TODO: 选择工作空间
      console.log(index, row);
      //所有的先初始化为btn展示
      $(".selectOk").hide();
      $(".select").show();

      //具体的btn显示与隐藏操作
      $("#selectBtn"+index).hide();
      $("#selectBtnOk" + index).show();
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    gernerateId(index){
      return "selectBtn" + index;
    },
    gernerateIdOk(index){
      return "selectBtnOk" + index;
    },
  },
};
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
</script>

<style>
@import "../assets/css/manageList.css";
</style>
