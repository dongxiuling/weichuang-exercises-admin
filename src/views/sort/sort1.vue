<template>
    <div >
      <el-table
      :data="list"
      stripe
      >
      <el-table-column
        label="类别"
        style="width: 90%"  class="chapter" align="center" @click="open()">
        <template slot-scope="scope">
          <span style="margin-left: 10px" @click="showTable(scope.$index,scope.row)">{{ scope.row.partsname }}</span>
        </template>
      </el-table-column>
    
    
  </el-table>
    


    </div>
</template>


<script>
import {getList} from '@/api/list'
export default {
    data() {
      return {
        list:null,
        tableData1: [{
          Name: 'java',
        
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
    created(){
      this.fetchData();
    },
    methods: {
      fetchData(){
          getList({
            bigpartname:"后端编程"
          }).then(response => {
            console.log(response.data)
            this.list = response.data;
          });
          //  console.log(this.list) ;
      },
      resetTemp() {
      this.temp = {
        Name:''
      }
    },
   
      showTable(index,row){
        console.log(this.tableData1[index].Name);
        var name = this.list[index].partsname;
        var id = this.list[index].partsid;
        // console.log(id);
        this.$router.push({ name: 'table', params: {paicheNo: name,partsId:id}});
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