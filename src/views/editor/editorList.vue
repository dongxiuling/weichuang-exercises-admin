<template>
  <div class="app-container">
    <div>
      <span style="font-size:22px">{{title}}</span>

      <!-- 列表 -->
      <!-- 单选题 -->
      <div>
        <span style="position:relative">
          <el-tag style="font-size:15px;position:absolute;margin-top:10px;margin-left:10px">单选题</el-tag>
          <el-button
            class="filter-item"
            round
            size="small"
            style="margin-left:87%;margin-bottom:10px;margin-top:10px"
            icon="el-icon-plus"
            @click="handleAddSingle"
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
              <span>{{row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column class-name="status-col" label="编辑" width="220" align="center">
            <template slot-scope="scope">
              <el-button type="primary" @click="handleEditSingle(scope.$index, scope.row)">修改</el-button>
              <el-button type="danger" @click="handleDelSingle(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 多选题 -->
      <div>
        <span>
          <el-tag style="font-size:15px;position:absolute;margin-top:10px;margin-left:10px">多选题</el-tag>
          <el-button
            class="filter-item"
            round
            size="small"
            style="margin-left:87%;margin-bottom:10px;margin-top:10px"
            icon="el-icon-plus"
            @click="handleAddMultiple"
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
            <template slot-scope="scope">
              <el-button type="primary" @click="handleEditMultiple(scope.$index, scope.row)">修改</el-button>
              <el-button type="danger" @click="handleDelMultiple(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <router-link to="/chapter/chapterList">
        <el-button type="primary" round style="width:10%;margin-top:20px;margin-left:45%">确定</el-button>
      </router-link>

      <!-- 多选添加 -->
      <el-dialog title="创建" :visible.sync="addFormMultipleVisible" :close-on-click-modal="false">
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
            <el-input type="textarea" :rows="1" v-model="addForm.choice_a"></el-input>
          </el-form-item>

          <el-form-item label="B">
            <el-input type="textarea" :rows="1" v-model="addForm.choice_b"></el-input>
          </el-form-item>

          <el-form-item label="C">
            <el-input type="textarea" :rows="1" v-model="addForm.choice_c"></el-input>
          </el-form-item>
          <el-form-item label="D">
            <el-input type="textarea" :rows="1" v-model="addForm.choice_d"></el-input>
          </el-form-item>
          <!-- <el-form-item label="答案">
            <el-input v-model="addForm.answer"></el-input>
          </el-form-item>-->
          <el-form-item label="答案">
            <el-checkbox-group v-model="checkListFrom">
              <el-checkbox label="A"></el-checkbox>
              <el-checkbox label="B"></el-checkbox>
              <el-checkbox label="C"></el-checkbox>
              <el-checkbox label="D"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="addFormMultipleVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="addSubmitMultiple" :loading="addLoading">提 交</el-button>
        </span>
      </el-dialog>

      <!-- 单选添加 -->
      <el-dialog title="创建" :visible.sync="addFormSingleVisible" :close-on-click-modal="false">
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
            <el-input type="textarea" :rows="1" v-model="addForm.choice_a"></el-input>
          </el-form-item>

          <el-form-item label="B">
            <el-input type="textarea" :rows="1" v-model="addForm.choice_b"></el-input>
          </el-form-item>

          <el-form-item label="C">
            <el-input type="textarea" :rows="1" v-model="addForm.choice_c"></el-input>
          </el-form-item>
          <el-form-item label="D">
            <el-input type="textarea" :rows="1" v-model="addForm.choice_d"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-radio-group v-model="addForm.answer">
              <el-radio label="A">A</el-radio>
              <el-radio label="B">B</el-radio>
              <el-radio label="C">C</el-radio>
              <el-radio label="D">D</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="addFormSingleVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="addSubmitSingle" :loading="addLoading">提 交</el-button>
        </span>
      </el-dialog>

      <!-- 多选编辑 -->
      <el-dialog title="编辑" :visible.sync="editFormMultipleVisible" :close-on-click-modal="false">
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
            <el-input type="textarea" :rows="1" v-model="editForm.choice_a"></el-input>
          </el-form-item>

          <el-form-item label="B">
            <el-input type="textarea" :rows="1" v-model="editForm.choice_b"></el-input>
          </el-form-item>

          <el-form-item label="C">
            <el-input type="textarea" :rows="1" v-model="editForm.choice_c"></el-input>
          </el-form-item>
          <el-form-item label="D">
            <el-input type="textarea" :rows="1" v-model="editForm.choice_d"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-checkbox-group v-model="checkListFrom">
              <el-checkbox label="A"></el-checkbox>
              <el-checkbox label="B"></el-checkbox>
              <el-checkbox label="C"></el-checkbox>
              <el-checkbox label="D"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="editFormMultipleVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="editSubmitMultiple" :loading="editLoading">提 交</el-button>
        </span>
      </el-dialog>
      <!-- 单选编辑 -->
      <el-dialog title="编辑" :visible.sync="editFormSingleVisible" :close-on-click-modal="false">
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
            <el-input type="textarea" :rows="1" v-model="editForm.choice_a"></el-input>
          </el-form-item>

          <el-form-item label="B">
            <el-input type="textarea" :rows="1" v-model="editForm.choice_b"></el-input>
          </el-form-item>

          <el-form-item label="C">
            <el-input type="textarea" :rows="1" v-model="editForm.choice_c"></el-input>
          </el-form-item>
          <el-form-item label="D">
            <el-input type="textarea" :rows="1" v-model="editForm.choice_d"></el-input>
          </el-form-item>
          <el-form-item label="答案">
            <el-radio-group v-model="editForm.answer">
              <el-radio label="A">A</el-radio>
              <el-radio label="B">B</el-radio>
              <el-radio label="C">C</el-radio>
              <el-radio label="D">D</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="editFormSingleVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="editSubmitSingle" :loading="editLoading">提 交</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getSingleExerciseList,
  getMultipleExerciseList,
  updateSingleList,
  updateMultipleList,
  insertSingle,
  insertMultiple,
  delSingleList,
  delMultipleList
} from "@/api/chapter";
export default {
  data() {
    return {
      checkList: [],
      checkListFrom: [],
      singleList: [],
      multipleList: [],
      //  新增页面数据
      addForm: {
        id: undefined,
        title: "",
        choice_a: "",
        choice_b: "",
        choice_c: "",
        choice_d: "",
        answer: "",
        answer_desc: null,
        exer_id: null,
        kindID: undefined
      },
      // 新增页面是否显示
      addFormSingleVisible: false,
      addFormMultipleVisible: false,
      addLoading: false,

      // 编辑页面是否显示
      editFormSingleVisible: false,
      editFormMultipleVisible: false,
      editLoading: false,

      // 编辑界面数据
      editForm: {
        id: undefined,
        title: "",
        choice_a: "",
        choice_b: "",
        choice_c: "",
        choice_d: "",
        answer: "",
        answer_desc: null,
        exer_id: null,
        kindID: undefined
      },

      title: this.$route.params.editorTitle,
      id: this.$route.params.editorId
    };
  },
  created() {
    this.getData();
    // console.log(this.$route.params.editorId);
  },
  methods: {
    // 获取页面
    getData() {
      // 获取单选列表
      getSingleExerciseList({ exer_id: this.id }).then(res => {
        this.singleList = res.data;
      });
      // 获取多选列表
      getMultipleExerciseList({ exer_id: this.id }).then(res => {
        this.multipleList = res.data;
        for(var n in this.multipleList){
          this.checkList[n]=this.multipleList[n].answer.split("|");
        }
      });
    },
    resetCheckListFrom() {
      this.checkListFrom = [];
    },
    // 显示单选新增页面
    handleAddSingle: function() {
      this.addFormSingleVisible = true;
      this.addForm = {
        id: undefined,
        title: "",
        choice_a: "",
        choice_b: "",
        choice_c: "",
        choice_d: "",
        answer: "",
        answer_desc: null,
        exer_id: null,
        kindID: undefined
      };
    },
    // 显示多选新增页面
    handleAddMultiple: function() {
      this.addFormMultipleVisible = true;
      this.resetCheckListFrom();
      this.addForm = {
        id: undefined,
        title: "",
        choice_a: "",
        choice_b: "",
        choice_c: "",
        choice_d: "",
        answer: "",
        answer_desc: null,
        exer_id: null,
        kindID: undefined
      };
    },
    // 单选新增
    addSubmitSingle: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            insertSingle({
              exer_id: this.id,
              title: this.addForm.title,
              choice_a: this.addForm.choice_a,
              choice_b: this.addForm.choice_b,
              choice_c: this.addForm.choice_c,
              choice_d: this.addForm.choice_d,
              answer: this.addForm.answer
            }).then(res => {
              this.addFormSingleVisible = false;
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.getData();
            });
          });
        }
      });
    },
    // 多选新增
    addSubmitMultiple: function() {
      this.addForm.answer = this.checkListFrom.join("|");
      
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            insertMultiple({
              exer_id: this.id,
              title: this.addForm.title,
              choice_a: this.addForm.choice_a,
              choice_b: this.addForm.choice_b,
              choice_c: this.addForm.choice_c,
              choice_d: this.addForm.choice_d,
              answer: this.addForm.answer
            }).then(res => {
              this.addFormMultipleVisible = false;
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.getData();
            });
          });
        }
      });
    },

    // 单选删除
    handleDelSingle: function(row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          delSingleList({ sc_id: row.sc_id }).then(res => {
            this.$message({
              message: "删除成功",

              type: "success"
            });
            this.getData();
          });
        })
        .catch(() => {});
    },
    // 多选删除
    handleDelMultiple: function(row) {
      console.log(row);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          delMultipleList({ mc_id: row.mc_id }).then(res => {
            this.$message({
              message: "删除成功",

              type: "success"
            });
            this.getData();
          });
        })
        .catch(() => {});
    },

    // 显示单选编辑
    handleEditSingle: function(index, row) {
      this.editFormSingleVisible = true;
      this.editForm = Object.assign({}, row);
    },
    // 显示多选编辑
    handleEditMultiple: function(index, row) {
      this.editFormMultipleVisible = true;
      this.checkListFrom = this.checkList[index];
      this.editForm = Object.assign({}, row);
    },

    // 单选编辑
    editSubmitSingle: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            updateSingleList({
              sc_id: this.editForm.sc_id,
              title: this.editForm.title,
              choice_a: this.editForm.choice_a,
              choice_b: this.editForm.choice_b,
              choice_c: this.editForm.choice_c,
              choice_d: this.editForm.choice_d,
              answer: this.editForm.answer
            }).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormSingleVisible = false;
              this.getData();
            });
          });
        }
      });
    },
    // 多选编辑
    editSubmitMultiple: function() {
      this.editForm.answer = this.checkListFrom.join("|");
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            updateMultipleList({
              mc_id: this.editForm.mc_id,
              title: this.editForm.title,
              choice_a: this.editForm.choice_a,
              choice_b: this.editForm.choice_b,
              choice_c: this.editForm.choice_c,
              choice_d: this.editForm.choice_d,
              answer: this.editForm.answer
            }).then(res => {
              this.$message({
                message: "提交成功",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormMultipleVisible = false;
              this.getData();
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