<template>
  <div class="app-container">
    <div ref="addChapter" :v-model="addChapter">
      <el-input v-model="input" placeholder="请输入章节名" style="width:50%;margin-left:30% "></el-input>

      <!-- 列表 -->
      <!-- 单选题 -->
      <div>
        <span>
          <el-tag style="font-size:15px;margin-left:10px;margin-top:20px">单选题</el-tag>
          <el-button
            class="filter-item"
            round
            size="small"
            style="margin-left:83%;margin-bottom:10px;margin-top:10px"
            icon="el-icon-plus"
            @click="handleAdd"
          >添加</el-button>
        </span>
        <el-table
          :data="singleList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="题目" align="center" prop="title">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="编辑" width="220" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" @click="handleEdit">修改</el-button>
              <el-button type="danger" @click="handleDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 多选题 -->
      <div>
        <span>
          <el-tag style="font-size:15px;margin-left:10px;margin-top:20px">多选题</el-tag>
          <el-button
            class="filter-item"
            round
            size="small"
            style="margin-left:83%;margin-bottom:10px;margin-top:10px"
            icon="el-icon-plus"
            @click="handleAdd"
          >添加</el-button>
        </span>
        <el-table
          :data="multipleList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="题目" align="center" prop="title">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="编辑" width="220" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" @click="handleEdit">修改</el-button>
              <el-button type="danger" @click="handleDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 简答题 -->
      <div>
        <span>
          <el-tag style="font-size:15px;margin-left:10px;margin-top:20px">简答题</el-tag>
          <el-button
            class="filter-item"
            round
            size="small"
            style="margin-left:83%;margin-bottom:10px;margin-top:10px"
            icon="el-icon-plus"
            @click="handleAdd"
          >添加</el-button>
        </span>
        <el-table
          :data="multipleList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="题目" align="center" prop="title">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="编辑" width="220" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" @click="handleEdit">修改</el-button>
              <el-button type="danger" @click="handleDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 编程题 -->
      <div>
        <span>
          <el-tag style="font-size:15px;margin-left:10px;margin-top:20px">编程题</el-tag>
          <el-button
            class="filter-item"
            round
            size="small"
            style="margin-left:83%;margin-bottom:10px;margin-top:10px"
            icon="el-icon-plus"
            @click="handleAdd"
          >添加</el-button>
        </span>
        <el-table
          :data="multipleList"
          element-loading-text="Loading"
          border
          fit
          highlight-current-row
        >
          <el-table-column label="题目" align="center" prop="title">
            <template slot-scope="{row}">
              <span>{{ row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="编辑" width="220" align="center">
            <template slot-scope="{row}">
              <el-button type="primary" @click="handleEdit">修改</el-button>
              <el-button type="danger" @click="handleDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <router-link to="/chapter/chapterList">
        <el-button
          type="primary"
          round
          @click="handleCreate"
          style="width:10%;margin-top:20px;margin-left:45%"
        >确定</el-button>
      </router-link>

      <!-- 新增界面 -->
      <el-dialog title="创建" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form
          ref="addForm"
          :model="addForm"
          label-position="left"
          label-width="20%"
          style="width: 80%; margin-left:50px;"
        >
          <el-form-item label="题目" prop="title">
            <el-input type="textarea" :rows="3" v-model="addForm.title" />
          </el-form-item>
          <el-form-item label="A">
            <el-input type="textarea" :rows="1" v-model="addForm.A"></el-input>
          </el-form-item>

          <el-form-item label="B">
            <el-input type="textarea" :rows="1" v-model="addForm.B"></el-input>
          </el-form-item>

          <el-form-item label="C">
            <el-input type="textarea" :rows="1" v-model="addForm.C"></el-input>
          </el-form-item>
          <el-form-item label="D">
            <el-input type="textarea" :rows="1" v-model="addForm.D"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-input v-model="addForm.answer"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提 交</el-button>
        </span>
      </el-dialog>

      <!-- 编辑界面 -->
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form
          ref="editForm"
          :model="editForm"
          label-position="left"
          label-width="20%"
          style="width: 80%; margin-left:50px;"
        >
          <el-form-item label="题目" prop="title">
            <el-input type="textarea" :rows="3" v-model="editForm.title" />
          </el-form-item>
          <el-form-item label="A">
            <el-input type="textarea" :rows="1" v-model="editForm.A"></el-input>
          </el-form-item>

          <el-form-item label="B">
            <el-input type="textarea" :rows="1" v-model="editForm.B"></el-input>
          </el-form-item>

          <el-form-item label="C">
            <el-input type="textarea" :rows="1" v-model="editForm.C"></el-input>
          </el-form-item>
          <el-form-item label="D">
            <el-input type="textarea" :rows="1" v-model="editForm.D"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-input v-model="editForm.answer"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  新增页面数据
      addForm: {
        title: "",
        A: "",
        B: "",
        C: "",
        D: "",
        answer: ""
      },
      // 新增页面是否显示
      addFormVisible: false,
      addLoading: false,

      // 编辑页面是否显示
      editFormVisible: false,
      editLoading: false,

      // 编辑界面数据
      editForm: {
        title: "",
        A: "",
        B: "",
        C: "",
        D: "",
        answer: ""
      },

      singleList: [
        {
          title: "第一题",
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          answer: "A"
        },
        {
          title: "第二题",
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          answer: "A"
        },
        {
          title: "第三题",
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          answer: "A"
        }
      ],
      multipleList: [
        {
          title: "第一题",
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          answer: "A"
        },
        {
          title: "第二题",
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          answer: "A"
        },
        {
          title: "第三题",
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          answer: "A"
        }
      ],
      input: "",

      //新增章节
      addChapter: []
    };
  },
  methods: {
    // 显示新增页面
    handleAdd: function() {
      this.addFormVisible = true;
      this.addForm = {
        title: "",
        A: "",
        B: "",
        C: "",
        D: "",
        answer: ""
      };
    },

    // 新增
    addSubmit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;

            //NProgress.start();

            let para = Object.assign({}, this.addForm);

            addUser(para).then(res => {
              this.addLoading = false;

              //NProgress.done();

              this.$message({
                message: "提交成功",

                type: "success"
              });

              this.$refs["addForm"].resetFields();

              this.addFormVisible = false;

              // this.getUsers();
            });
          });
        }
      });
    },

    // addSubmit: function() {
    //   this.singleList.push({
    //     title: this.title
    //   });
    // },

    // 显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;

      this.editForm = Object.assign({}, row);
    },

    // 编辑
    editSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true;

            //NProgress.start();

            let para = Object.assign({}, this.editForm);
            editUser(para).then(res => {
              this.editLoading = false;

              //NProgress.done();

              this.$message({
                message: "提交成功",

                type: "success"
              });

              this.$refs["editForm"].resetFields();

              this.editFormVisible = false;

              this.getUsers();
            });
          });
        }
      });
    },

    //删除
    // handleDel: function (index, row) {

    // 				this.$confirm('确认删除该记录吗?', '提示', {

    // 					type: 'warning'

    // 				}).then(() => {

    // this.listLoading = true;

    // // NProgress.start();

    // 		let para = { id: row.id };

    // 		removeUser(para).then((res) => {

    // 			this.listLoading = false;

    // 			//NProgress.done();

    // 			this.$message({

    // 				message: '删除成功',

    // 				type: 'success'

    // 			});

    // 			this.getUsers();

    // 		});

    // 	}).catch(() => {

    // 	});

    // },

    handleDel(row) {
      this.$confirm("是否删除该项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.total--;
          this.singleList.splice(row, 1);
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

    handleCreate: function() {
      this.$refs.addChapter.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;

            //NProgress.start();

            let para = Object.assign({}, this.addChapter);

            addUser(para).then(res => {
              this.addLoading = false;

              //NProgress.done();

              this.$message({
                message: "提交成功",

                type: "success"
              });

              this.$refs["addChapter"].resetFields();

              // this.getUsers();
            });
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>