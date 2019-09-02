<template>
  <div class="app-container">
    <router-link to="/editor/editorList">
      <el-button class="add" round icon="el-icon-plus" style="width:100%">添加</el-button>
    </router-link>

    <el-table :data="tableData" stripe>
      <el-table-column label="章节" style="width: 90%" class="chapter" align="center">
        <template slot-scope="scope">
          <i class="el-icon-document"></i>
          <span style="margin-left: 10px">{{ scope.row.chapterName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <router-link to="/editor/editorList">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :page-size="10"
      :total="total"
      style="float:right;"
    ></el-pagination>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tableData: [
        {
          chapterName: "第一章"
        },
        {
          chapterName: "第二章"
        },
        {
          chapterName: "第三章"
        },
        {
          chapterName: "第四章"
        }
      ],
      total: 0,

      page: 1
    };
  },
  methods: {
    handleEdit(index, row) {},
    // 删除
    handleDelete(index, row) {
      this.$confirm("是否删除该项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.total--;
          this.tableData.splice(row.index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //页码编辑
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    },

    // 获取列表
    
			getUsers() {

				let para = {

					page: this.page,

					// name: this.filters.name

				};

				this.listLoading = true;

				//NProgress.start();

				getUserListPage(para).then((res) => {

					this.total = res.data.total;

					this.users = res.data.users;

					this.listLoading = false;

					//NProgress.done();

				});

			},
  }
};
</script>


<style  scoped>
</style>