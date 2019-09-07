<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
        <div class="title">欢迎来到题库后台管理系统 </div>
        <div class="imgs">
            <img src="./../../assets/1.png" alt="">
            <img src="./../../assets/2.png" alt="">
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    .title{
      color:#606266;
       text-align: center;
       height:40px;
       line-height: 40px;
       font-size:24px;
    }
    .imgs{
       text-align: center;
       margin-top:70px;
       img{
          width:280px;
       }
    }
  }
}
</style>
