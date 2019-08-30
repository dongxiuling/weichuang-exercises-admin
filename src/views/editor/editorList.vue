<template>
    <div>
        <el-input v-model="input" placeholder="请输入章节名"></el-input>
        <div>
        <el-tag>单选题</el-tag>
        <router-link to = "/editor/question">
        <el-button round icon="el-icon-plus"></el-button>
        </router-link>
        <el-table :data="tableData" stripe >
        <el-table-column
        label="题目"
        border
         align="center">
        <template slot-scope="scope">
            <i class="el-icon-edit-outline"></i>
        <span style="margin-left: 10px">{{ scope.row.question }}</span>
      </template>
    </el-table-column>
    
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit"></el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" icon="el-icon-close"></el-button>
      </template>
    </el-table-column>
  </el-table>

        </div>
    </div>
</template>

<script>
    export default {
         data() {
             return {
                 tableData: [{
          question: '第一题',
        
        }, {
          question: '第二题',
          
        }, {
          question: '第三题',
          
        }],
       input: ''
    }
  }

    }
</script>

<style lang="scss" scoped>

</style>