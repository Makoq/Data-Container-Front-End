<template>
  <div>
      <el-table
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
              @click="handleSelect(scope.$index, scope.row)">Select</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table> 
      <div class="block">
        
        <!-- <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination> -->
      </div>



  </div>
</template>

<script>
  export default {
    props:['listData'],
    data () {
      return{
    

      }
    },
    mounted(){

    },
    methods:{
       handleSelect(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
 
  }
</script>

<style>

</style>
