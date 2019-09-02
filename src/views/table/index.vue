<template>
  <div class="app-container">
  <span style="font-size:22px">{{name}}</span>
  <el-button class="filter-item" style="margin-left: 10px;margin-bottom:20px" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95" type="index">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题目" prop="title">
       <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="难度" width="110" align="center">
      <template slot-scope="scope">
          <span>{{ scope.row.diffcutly }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="编辑" width="220" align="center">
        <template slot-scope="scope">
          <el-button type="primary"  @click="handleUpdate(scope.$index,scope.row)">修改</el-button>
          <el-button type="danger" @click="opendelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin:20px auto"
      background
      @current-change="handleCurrentChange" 
      :current-page="currentPage"
      :page-size="pagesize" 
      layout="total, prev, pager, next, jumper"
      :total="total"
      >
    </el-pagination>

    <el-dialog
    :visible.sync="dialogFormVisible"
    :title="textMap[dialogStatus]"
    >
    <el-form ref="dataForm" :model="temp" label-position="left" label-width="20%" style="width: 80%; margin-left:50px;">
      <el-form-item label="题目" prop="title">
      <el-input type="textarea"  :rows="3"   v-model="temp.title"/>
      </el-form-item>
     <el-form-item label="A"><el-input type="textarea"  :rows="1" v-model="temp.A"></el-input>
     </el-form-item>
     </el-form-item>
     <el-form-item label="B"><el-input type="textarea"  :rows="1" v-model="temp.B"></el-input>
     </el-form-item>
     </el-form-item>
     <el-form-item label="C"><el-input type="textarea"  :rows="1" v-model="temp.C"></el-input>
     </el-form-item>
     </el-form-item>
     <el-form-item label="难度"><el-input v-model="temp.diffcutly"></el-input>
     </el-form-item>
      </el-form-item>
     <el-form-item label="答案"><el-input v-model="temp.answer"></el-input>
     </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      // list: null,
      // listLoading: true
      //当前页数
      currentPage:1,
      //每页条数
      pagesize:4,
      total:4,
      dialogFormVisible:false,
      tableData: [{
        id:1,
          title: '请你谈谈Cookie的弊端',
          diffcutly:1,
          A:'1',
          B:'2',
          C:'3',
          answer:'A'
        
        }, {
          id:2,
          title: 'web storage和cookie的区别',
          diffcutly:1,
          A:'1',
          B:'2',
          C:'3',
          answer:'A'
          
        }, {
          id:3,
           title: 'CSS中 link 和@import 的区别是？',
          diffcutly:1,
          A:'1',
          B:'2',
          C:'3',
          answer:'A'
          
        }, {
          id:4,
           title: '介绍一下CSS的盒子模型？',
          diffcutly:1,
         A:'1',
          B:'2',
          C:'3',
          answer:'A'
          
      }] ,
      temp: [{
        id:undefined,
          title: '',
          diffcutly:1,
          A:'1',
          B:'2',
          C:'3',
          answer:'A'
        
        }, {
           title: 'web storage和cookie的区别',
          diffcutly:1,
          A:'1',
          B:'2',
          C:'3',
          answer:'A'
          
        }, {
           title: 'CSS中 link 和@import 的区别是？',
          diffcutly:1,
          A:'1',
          B:'2',
          C:'3',
          answer:'A'
          
        }, {
           title: '介绍一下CSS的盒子模型？',
          diffcutly:1,
          A:'1',
          B:'2',
          C:'3',
          answer:' A'
          
      }],
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      inx:undefined,
      name:this.$route.params.paicheNo
    }
    
  },
  // created() {
  //   this.fetchData()
  // },
  methods: {
    
    // fetchData() {
    //   this.listLoading = true
    //   getList().then(response => {
    //     this.list = response.data.items
    //     this.listLoading = false
    //   })
    // },
    //分页
    
    handleCurrentChange(val) {
      this.currentPage = val
      

    },
  
    //分页结束
    resetTemp() {
      this.temp = {
        diffcutly: undefined,
        title: '',
        A:'',
        B:'',
        C:'',
        answer:''
      }
    },
    opendelete(row) {
        this.$confirm('是否删除当前题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.total--;
          this.tableData.splice(row.index,1);
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
      },
       handleCreate() {
         this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(index,row){
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true;
      this.inx=index;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData(){
       this.$refs['dataForm'].validate((valid) => {
        if (valid) {
            this.tableData.unshift(this.temp)
            this.dialogFormVisible = false
            this.total++;
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          
        }
      })
    },
    updateData(){
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
            for (const v of this.tableData) {
              if (v.index === this.temp.index) {
                this.tableData.splice(this.inx,1,this.temp);
                break;
              }
            }
          this.dialogFormVisible = false;
          this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success',
              duration: 2000
          })
        }
      })
    }
  }
}
</script>
