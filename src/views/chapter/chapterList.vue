<template>
  <div class="app-container">
    <!-- 添加套题 -->

    <el-button class="add" round icon="el-icon-plus" style="width:100%" @click="createSort()">添加</el-button>

    <!-- 套题总页面 -->
    <el-table :data="list" stripe>
      <el-table-column label="章节" style="width: 90%" class="chapter" align="center">
        <template slot-scope="scope">
          <i class="el-icon-document"></i>
          <span
            style="margin-left: 10px"
            @click="showExercise(scope.$index,scope.row)"
          >{{ scope.row.title }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加套题 -->
    <el-dialog :visible.sync="addsortFromVisible" title="创建" :close-on-click-modal="false">
      <el-form
        ref="addsortFrom"
        :model="addsortFrom"
        label-position="left"
        label-width="20%"
        style="width: 80%; margin-left:50px;"
      >
        <el-form-item label="题目" prop="title">
          <el-input v-model="addsortFrom.title" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input v-model="addsortFrom.content" />
        </el-form-item>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsort">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import { getchapterList, insertchapterList } from "@/api/chapter";
export default {
  data() {
    return {
      list: null,
      addsortFromVisible: false,
      // 新增套题列表
      addsortFrom: {
        title: "",
        cotent: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    createSort() {
      this.addsortFromVisible = true;
      this.addsortFrom = {
        title: "",
        content: ""
      };
    },
    addsort: function() {
      this.$refs.addsortFrom.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let para = Object.assign({}, this.addsortFrom);

            insertchapterList(para).then(res => {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.$refs["addsortFrom"].resetFields();

              this.addsortFromVisible = false;
              this.getData();
            });
          });
        }
      });
    },
    showExercise(index, row) {
      var title = row.title; 
      var exer_id = row.exer_id; 
      // console.log(title, exer_id);
      this.$router.push({
        name: "editorList",
        params: { editorTitle: title, editorId: exer_id }
      });
    },
    getData() {
      getchapterList({}).then(res => {
       
        this.list = res.alldata;
      });
    }
  }
};
</script>


<style  scoped>
</style>