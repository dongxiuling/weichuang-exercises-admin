<template>
    <div >
        <el-row>
            <el-button class ="add" round icon="el-icon-plus" @click="createSort()"></el-button>
        </el-row>

        <el-table
    :data="tableData"
    stripe
    >
    <el-table-column
      label="类别"
      style="width: 90%"  class="chapter" align="center" @click="open()">
      <template slot-scope="scope">
        <span style="margin-left: 10px" @click="showTable(scope.$index,scope.row)">{{ scope.row.Name }}</span>
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
    <el-dialog
    :visible.sync="dialogFormVisible"
    :title="textMap[dialogStatus]"
    >
    <el-form ref="dataForm" :model="temp" label-position="left" label-width="20%" style="width: 80%; margin-left:50px;">
    <el-form-item label="题目" prop="name">
      <el-input v-model="temp.Name"/>
      </el-form-item>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogStatus==='create'?addSort():changeSort()">确 定</el-button>
    </el-form>
    </el-dialog>


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
          
        }],
        temp:{
          Name:''
        },
        dialogFormVisible:false,
        textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogStatus:'',
      inx:undefined
      }
    },
    methods: {
      resetTemp() {
      this.temp = {
        Name:''
      }
    },
      addSort(){
       this.$refs['dataForm'].validate((valid) => {
        if (valid) {
            this.tableData.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
        }
      })
      },
      createSort(){
        this.resetTemp();
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      })
      },
      changeSort(){
        this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
            for (const v of this.tableData) {
              if (v.index === this.temp.index) {
                // const index = this.tableData.indexOf(v);
                this.tableData.splice(this.inx,1,this.temp);
                break;
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
      },
      handleEdit(index, row) {
        this.temp = Object.assign({}, row);
        this.inx=index;
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
      },
      handleDelete(index, row) {
        this.tableData.splice(index,1);
      },
      showTable(index,row){
        console.log(this.tableData[index].Name);
        var name = this.tableData[index].Name;
        this.$router.push({ name: 'table', params: {paicheNo: name}});
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