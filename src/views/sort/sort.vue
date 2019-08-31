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
      label="类别"
      style="width: 90%"  class="chapter" align="center" @click="open()">
      <template slot-scope="scope">
        <span style="margin-left: 10px" @click="showTable(scope.row)">{{ scope.row.Name }}</span>
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
          Name: 'JavaScript',
        
        }, {
          Name: 'Node',
          
        }, {
          Name: 'HTML',
          
        }, {
          Name: 'css',
          
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
      },
      showTable(){
        
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