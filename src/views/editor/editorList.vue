<template>
    <div class="app-container">
        <el-input v-model="input" placeholder="请输入章节名" style="width:50%;margin-left:30% "></el-input>
        
        <!-- 列表 -->
        <div>
        <span>
        <el-tag style="font-size:15px;margin-left:10px;margin-top:20px">单选题</el-tag>
        
        
 
<el-button class="filter-item" round size="small" style="margin-left:83%;margin-bottom:10px;margin-top:10px"
  icon="el-icon-plus"  @click="handleAdd">添加
      </el-button>
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
          <el-button type="primary"  @click="handleEdit">修改</el-button>
          <el-button type="danger" @click="handleDel(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</div>

<div>
        <el-tag>多选题</el-tag>
        <router-link to = "/editor/question">
        <el-button round icon="el-icon-plus"></el-button>
        </router-link>
        <el-table
         :data="multipleList"
          stripe
           fit >
        <el-table-column
        label="题目"
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
          @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

<div>
        <el-tag>简答题</el-tag>
        <router-link to = "/editor/question">
        <el-button round icon="el-icon-plus"></el-button>
        </router-link>
        <el-table
         :data="shortList"
          stripe
           fit >
        <el-table-column
        label="题目"
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
          @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>

<div>
        <el-tag>编程题</el-tag>
        <router-link to = "/editor/question">
        <el-button round icon="el-icon-plus"></el-button>
        </router-link>
        <el-table
         :data="programList"
          stripe
           fit >
        <el-table-column
        label="题目"
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
          @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
<el-button type="primary" round>确定</el-button>


<!-- 新增界面 -->
  <el-dialog
    title="创建" :visible.sync="addFormVisible"
    :close-on-click-modal="false"
    >
    <el-form  ref="addForm" :model="addForm" label-position="left" label-width="20%" style="width: 80%; margin-left:50px;">
      <el-form-item label="题目" prop="title">
      <el-input type="textarea"  :rows="3"   v-model="addForm.title"/>
      </el-form-item>
     <el-form-item label="A"><el-input type="textarea"  :rows="1" v-model="addForm.A"></el-input>
     </el-form-item>
    
     <el-form-item label="B"><el-input type="textarea"  :rows="1" v-model="addForm.B"></el-input>
     </el-form-item>
     
     <el-form-item label="C"><el-input type="textarea"  :rows="1" v-model="addForm.C"></el-input>
     </el-form-item>
     <el-form-item label="D"><el-input type="textarea"  :rows="1" v-model="addForm.D"></el-input>
     </el-form-item>
     <el-form-item label="答案"><el-input v-model="addForm.answer"></el-input>
     </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click.native="addFormVisible = false">取 消</el-button>
    <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提 交</el-button>
  </span>
    </el-dialog>

<!-- 编辑界面 -->
<el-dialog
    title="编辑" :visible.sync="editFormVisible"
    :close-on-click-modal="false"
    >
    <el-form  ref="editForm" :model="editForm" label-position="left" label-width="20%" style="width: 80%; margin-left:50px;">
      <el-form-item label="题目" prop="title">
      <el-input type="textarea"  :rows="3"   v-model="editForm.title"/>
      </el-form-item>
     <el-form-item label="A"><el-input type="textarea"  :rows="1" v-model="editForm.A"></el-input>
     </el-form-item>
    
     <el-form-item label="B"><el-input type="textarea"  :rows="1" v-model="editForm.B"></el-input>
     </el-form-item>
     
     <el-form-item label="C"><el-input type="textarea"  :rows="1" v-model="editForm.C"></el-input>
     </el-form-item>
     <el-form-item label="D"><el-input type="textarea"  :rows="1" v-model="editForm.D"></el-input>
     </el-form-item>
     <el-form-item label="答案"><el-input v-model="editForm.answer"></el-input>
     </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click.native="editFormVisible = false">取 消</el-button>
    <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提 交</el-button>
  </span>
    </el-dialog>

    </div>
</template>

<script>
    export default {
         data() {
             return {
              //  新增页面数据
              addForm:
                {
                 title: '',
                  A:'',
                  B:'',
                  C:'',
                  D:'',
                  answer:''
                },
              // 新增页面是否显示
              addFormVisible: false,
              addLoading: false,

            // 编辑页面是否显示
            editFormVisible: false,
            editLoading: false,

            // 编辑界面数据
            	editForm:{
                title: '',
                  A:'',
                  B:'',
                  C:'',
                  D:'',
                  answer:''
				},

      

      singleList: [{
          title: '第一题',
        A:'1',
          B:'2',
          C:'3',
          D:'4',
          answer:'A'
        }, {
          title: '第二题',
          A:'1',
          B:'2',
          C:'3',
          D:'4',
          answer:'A'
        }, {
          title: '第三题',
          A:'1',
          B:'2',
         C:'3',
          D:'4',
          answer:'A'
        }],
      //   multipleList: [
      //     {
      //     question: '第一题',
        
      //   }, 
      //   {
      //     question: '第二题',
          
      //   }, {
      //     question: '第三题',
          
      //   }],
      //   shortList: [{
      //     question: '第一题',
        
      //   }, {
      //     question: '第二题',
          
      //   }, {
      //     question: '第三题',
          
      //   }],
      //   programList: [{
      //     question: '第一题',
        
      //   }, {
      //     question: '第二题',
          
      //   }, {
      //     question: '第三题',
          
      //   }],
      //  
      //  dialogFormVisible: false,
      //  dialogStatus: '',
      //  textMap: {
      //   update: '编辑',
      //   create: '添加'
      // },
      
      input: '',
      
      
      // temp: [{
      //   id:undefined,
      //     title: '',
      //     diffcutly:1,
      //     A:'1',
      //     B:'2',
      //     C:'3',
      //     answer:'A'
        
      //   }, {
      //      title: 'web storage和cookie的区别',
      //     diffcutly:1,
      //     A:'1',
      //     B:'2',
      //     C:'3',
      //     answer:'A'
          
      //   }, {
      //      title: 'CSS中 link 和@import 的区别是？',
      //     diffcutly:1,
      //     A:'1',
      //     B:'2',
      //     C:'3',
      //     answer:'A'
          
      //   }, {
      //      title: '介绍一下CSS的盒子模型？',
      //     diffcutly:1,
      //     A:'1',
      //     B:'2',
      //     C:'3',
      //     answer:' A'
          
      // }],
      
    
    

    }
  },
  methods:{

// 显示新增页面

  handleAdd:function(){
    this.addFormVisible = true;
    this.addForm = {
                  title: '',
                  A:'',
                  B:'',
                  C:'',
                  D:'',
                  answer:''
        };
  },

  // 新增
  addSubmit:function(){
    	this.$refs.addForm.validate((valid) => {

					if (valid) {

						this.$confirm('确认提交吗？', '提示', {}).then(() => {

							this.addLoading = true;

							//NProgress.start();

							let para = Object.assign({}, this.addForm);

							
							addUser(para).then((res) => {

								this.addLoading = false;

								//NProgress.done();

								this.$message({

									message: '提交成功',

									type: 'success'

								});

								this.$refs['addForm'].resetFields();

								this.addFormVisible = false;

								// this.getUsers();

							});

						});

					}

				});
  },

// 显示编辑界面

	handleEdit :function (index, row) {
        
				this.editFormVisible = true;

				this.editForm = Object.assign({}, row);

			},

// 编辑
editSubmit: function () {

				this.$refs.editForm.validate((valid) => {

					if (valid) {

						this.$confirm('确认提交吗？', '提示', {}).then(() => {

							this.editLoading = true;

							//NProgress.start();

							let para = Object.assign({}, this.editForm);
              	editUser(para).then((res) => {

								this.editLoading = false;

								//NProgress.done();

								this.$message({

									message: '提交成功',

									type: 'success'

								});

								this.$refs['editForm'].resetFields();

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
        
         this.$confirm('是否删除该项?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.total--;
          this.singleList.splice(row,1);
          this.$message({
            type: 'success',
            message: '删除成功!'
            
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         

        
      }

    //  resetTemp() {
    //   //  this.temp=[...this.singleList];
    //    this.temp = {
    //     title: '',
    //     A:'',
    //     B:'',
    //     C:'',
    //     D:'',
    //     answer:''
    //   }

    // },
    //  handleCreate() {
       
    //      this.resetTemp()
    //   this.dialogStatus = 'create'
    //   this.dialogFormVisible = true
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // handleUpdate(row){
    //   // this.temp=[...this.singleList];
    //   this.dialogStatus = 'update'
    //   this.temp = Object.assign({}, row)
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // createData(){
    //   // this.temp=[...this.singleList];
    //    this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //         this.singleList.unshift(this.temp)
    //         this.dialogFormVisible = false
    //         this.total++;
    //         this.$notify({
    //           title: '成功',
    //           message: '添加成功',
    //           type: 'success',
    //           duration: 2000
    //         })
          
    //     }
    //   })
    // },
    // updateData(){
    //   // this.temp=[...this.singleList];
    //   this.$refs['dataForm'].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, this.temp)
          
    //         for (const v of this.singleList) {
    //           if (v.index === this.temp.index) {
    //             const index = this.singleList.indexOf(v)
    //             this.singleList.splice(index, 1, this.temp)
    //             break
    //           }
    //         }
    //       this.dialogFormVisible = false
    //       this.$notify({
    //           title: '成功',
    //           message: '修改成功',
    //           type: 'success',
    //           duration: 2000
    //       })
    //     }
    //   })
    // }
  }
    }
</script>

<style lang="scss" scoped>

</style>