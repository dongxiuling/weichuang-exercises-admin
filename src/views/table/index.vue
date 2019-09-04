<template>
  <div class="app-container">
  <span style="font-size:22px">{{name}}</span>
  <el-button class="filter-item" style="margin-left: 10px;margin-bottom:20px" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加单选题
  </el-button><el-button class="filter-item" style="margin-left: 10px;margin-bottom:20px" type="primary" icon="el-icon-edit" @click="handleMultipleCreate">
        添加多选题
  </el-button><br>
  <el-tag style='margin-bottom:10px'>单选题</el-tag>
    <el-table
      :data="listSingle"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
    
      <el-table-column align="center" label="ID" width="95" type="index">
        <template slot-scope="scope">
          <span>{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题目" prop="title">
       <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="编辑" width="220" align="center">
        <template slot-scope="scope">
          <el-button type="primary"  @click="handleUpdate(scope.$index,scope.row)">修改</el-button>
          <el-button type="danger" @click="singleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
<el-tag style='margin-bottom:10px;margin-top:10px'>多选题</el-tag>
    <el-table
      :data="listMultiple"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95" type="index">
        <template slot-scope="scope">
          <span>{{ scope.$index+1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题目" prop="title">
       <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="编辑" width="220" align="center">
        <template slot-scope="scope">
          <el-button type="primary"  @click="handleMultipleUpdate(scope.$index,scope.row)">修改</el-button>
          <el-button type="danger" @click="multipleDelete(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    

    <el-dialog
    :visible.sync="dialogFormVisible"
    :title="textMap[dialogStatus]"
    >
    <el-form ref="dataForm" :model="temp" label-position="left" label-width="20%" style="width: 80%; margin-left:50px;">
      <el-form-item label="题目" prop="title">
      <el-input type="textarea"  :rows="3"   v-model="temp.title"/>
      </el-form-item>
     <el-form-item label="A"><el-input type="textarea"  :rows="1" v-model="temp.choice_a"></el-input>
     </el-form-item>
     </el-form-item>
     <el-form-item label="B"><el-input type="textarea"  :rows="1" v-model="temp.choice_b"></el-input>
     </el-form-item>
     </el-form-item>
     <el-form-item label="C"><el-input type="textarea"  :rows="1" v-model="temp.choice_c"></el-input>
     </el-form-item>
     </el-form-item>
     <el-form-item label="D"><el-input type="textarea"  :rows="1" v-model="temp.choice_d"></el-input>
     </el-form-item>
      </el-form-item>
     <el-form-item label="答案"><el-input v-model="temp.answer"></el-input>
     </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogStatus==='create'?(dialogType===1?createData():createMultipleData()):(dialogType===1?updateData():updataMultipleData())">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {getSingleParts,getMultipleParts,changeSingleParts,
changeMultipleParts,addSingleParts,addMultipleParts,
deleteSingleParts,deleteMultipleParts} from '@/api/list'


export default {
  data() {
    return {
       listLoading: true,
      //弹出框标识
      dialogFormVisible:false,
      //单选题数据
      listSingle:[],
      //多选题数据
      listMultiple:[],
      list:null,
      temp: {
          id:undefined,
          title: '',
          choice_a:'',
          choice_b:'',
          choice_c:'',
          choice_d:'',
          answer:'',
          answer_desc:null,
          exer_id:null,
          kindID:undefined//分类序号 删除插入操作用此序号
        
        },
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      dialogType:undefined,
      exerType:{
        single:1,
        multiple:2
      },
      inx:undefined,
      name:this.$route.params.paicheNo,
      id:this.$route.params.partsId,
    }
    
  },
    created() {
      this.fetchData();
    },
   methods: {
    fetchData(){
      //获取单选题列表
      getSingleParts({partsid:this.id}).then(response => {
        console.log(this.id);
        this.listSingle = response.data;
        console.log(response.data);

      });
      //获取多选题列表
      getMultipleParts({partsid:this.id}).then(response => {
        this.listMultiple = response.data;
        // console.log(listMultiple);
        // console.log(response.data);
      })
       },
      resetTemp() {
        this.temp = {
          id:undefined,
          title: '',
          choice_a:'',
          choice_b:'',
          choice_c:'',
          choice_d:'',
          answer:'',
          answer_desc:null,
          exer_id:null,
          kindID:undefined//分类序号 删除插入操作用此序号
        }
      },
      
    //删除单选
    singleDelete(index,row) {
      console.log(row.sc_id);
      let sc_id=row.sc_id;
        this.$confirm('是否删除当前题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listSingle.splice(index,1);
          deleteSingleParts({
            sc_id:sc_id
          }).then(response => {
            console.log(response.data)
            // this.listSingle = response.data;
          });
          
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
      //删除多选
      multipleDelete(index,row) {
        console.log(row);
        let mc_id=row.mc_id;
        this.$confirm('是否删除当前题目?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listMultiple.splice(index,1);
          deleteMultipleParts({
            mc_id:mc_id
          }).then(response => {
            console.log(response.data)
            // this.listMultiple = response.data;
          });
          
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
      //点击创建单选
    handleCreate() {
      this.dialogType=1;
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
      this.$refs['dataForm'].clearValidate()
      });
    },
    //点击创建多选
    handleMultipleCreate(){
      this.dialogType=2;
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
      this.$refs['dataForm'].clearValidate()
      });
    },
    //点击修改单选
    handleUpdate(index,row){
      this.dialogType=1;
      this.dialogStatus = 'update';
      this.temp = Object.assign({}, row);
      this.dialogFormVisible = true;
      this.inx=index;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    //点击修改多选
    handleMultipleUpdate(index,row){
      this.dialogType=2;
      this.dialogStatus = 'update';
      this.temp = Object.assign({}, row);
      this.dialogFormVisible = true;
      this.inx=index;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    //单选题添加题目
    createData(){
      let idSingle=this.id;
      console.log(idSingle);
       this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.listSingle.push(this.temp);
          addSingleParts({
            partsdoubleid:idSingle, title:this.temp.title, 
            choice_a:this.temp.choice_a,choice_b:this.temp.choice_b,
            choice_c:this.temp.choice_c, choice_d:this.temp.choice_d,answer:this.temp.answer
          }).then(response => {
            // console.log(1,response.data);
             this.listSingle.push(response.data[0]);
            // console.log(this.listSingle);

          });
            // this.listSingle.push(this.list);
            this.dialogFormVisible = false;
            this.total++;
            this.$notify({
              title: '成功',
              message: '添加单选题成功',
              type: 'success',
              duration: 2000
            });
        }
      });
    },
    //单选题修改题目
    updateData(){
      let idSingle=this.listSingle[this.inx].sc_id;
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listSingle.splice(this.inx,1,this.temp);
          changeSingleParts({
            sc_id:idSingle, title:this.temp.title, 
            choice_a:this.temp.choice_a,choice_b:this.temp.choice_b,
            choice_c:this.temp.choice_c, choice_d:this.temp.choice_d,answer:this.temp.answer
          });
          this.dialogFormVisible = false;
          this.$notify({
              title: '成功',
              message: '修改单选题成功',
              type: 'success',
              duration: 2000
          });
        }
      });
    },
    //多选题添加题目
    createMultipleData(){
      let idSingle=this.id;
        this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.listMultiple.push(this.temp);
          addMultipleParts({
            partsdoubleid:idSingle, title:this.temp.title, 
            choice_a:this.temp.choice_a,choice_b:this.temp.choice_b,
            choice_c:this.temp.choice_c, choice_d:this.temp.choice_d,answer:this.temp.answer
          }).then(response => {
            this.listMultiple.push(response.data[0])
          });
            // this.listMultiple.push(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: '成功',
              message: '添加多选题成功',
              type: 'success',
              duration: 2000
            });
        }
      });
    },
    //多选题修改题目
    updataMultipleData(){
      // console.log(this.listMultiple[this.inx].mc_id);
      let idSingle=this.listMultiple[this.inx].mc_id;
        this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listMultiple.splice(this.inx,1,this.temp);
          changeMultipleParts({
            mc_id:idSingle, title:this.temp.title, 
            choice_a:this.temp.choice_a,choice_b:this.temp.choice_b,
            choice_c:this.temp.choice_c, choice_d:this.temp.choice_d,answer:this.temp.answer
          }).then(response => {
            // console.log(1,response.data);
            // console.log(this.listSingle);

          });
          this.dialogFormVisible = false;
          this.$notify({
              title: '成功',
              message: '修改多选题成功',
              type: 'success',
              duration: 2000
          });
        }
      });
    }
  }
}
</script>
