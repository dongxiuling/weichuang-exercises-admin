<template>
    <div >
        <el-row>
            <el-button class ="add" round icon="el-icon-plus"></el-button>
        </el-row>

        <el-table
    :data="tableData"
    stripe
    >
    <el-table-column
      label="章节"
      style="width: 90%"  class="chapter" align="center">
      <template slot-scope="scope">
        <i class="el-icon-document"></i>
        <span style="margin-left: 10px">{{ scope.row.chapterName }}</span>
      </template>
    </el-table-column>
    
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>



    </div>
</template>


<script>
export default {
    data() {
      return {
        tableData: [{
          chapterName: '第一章',
        
        }, {
          chapterName: '第二章',
          
        }, {
          chapterName: '第三章',
          
        }, {
          chapterName: '第四章',
          
        }]
      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.tableData.splice(index,1);
      }
    }

    
}
</script>


<style  scoped>
  .add{
      width: 100%;
      margin: 10px auto ;

  }  
  .chapter{
      justify-content: center;
      align-content: center;
  }
</style>