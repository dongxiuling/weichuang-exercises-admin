<template>
    <div class="app-container">
        <el-input v-model="input" placeholder="请输入章节名" style="width:50%;margin-left:30% "></el-input>
        <div>
        <span style="font-size:22px">单选题</span>
        
        
 
<el-button class="filter-item" style="margin-left: 10px;margin-bottom:20px"
 type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>

  <el-table
      :data="tableData"
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
          <el-button type="primary"  @click="handleUpdate(row)">修改</el-button>
          <el-button type="danger" @click="opendelete(row)">删除</el-button>
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
    
     <el-form-item label="B"><el-input type="textarea"  :rows="1" v-model="temp.B"></el-input>
     </el-form-item>
     
     <el-form-item label="C"><el-input type="textarea"  :rows="1" v-model="temp.C"></el-input>
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
      //         singleList: [{
      //     question: '第一题',
        
      //   }, {
      //     question: '第二题',
          
      //   }, {
      //     question: '第三题',
          
      //   }],
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
    

    }
  },
  methods:{




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
     handleCreate() {
         this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row){
      this.dialogStatus = 'update'
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true;
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
          const tempData = Object.assign({}, this.temp)
          
            for (const v of this.tableData) {
              if (v.index === this.temp.index) {
                const index = this.tableData.indexOf(v)
                this.tableData.splice(index, 1, this.temp)
                break
              }
            }
          this.dialogFormVisible = false
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

<style lang="scss" scoped>

</style>