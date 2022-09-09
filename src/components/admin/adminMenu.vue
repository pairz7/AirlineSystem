<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246);margin-top: 10px">
      <el-menu style="min-height: 800px" router >
        <el-menu-item index="/adminGlobal"><i class="el-icon-setting"></i>全局设置</el-menu-item>
        <el-menu-item index="/admin"><i class="el-icon-position"></i>航班管理</el-menu-item>
        <el-menu-item index="/adminTicket"><i class="el-icon-tickets"></i>机票管理</el-menu-item>
        <el-menu-item index="/adminUser"><i class="el-icon-user"></i>客户管理</el-menu-item>
        <el-menu-item index="/adminDev"><i class="el-icon-coin"></i>开发测试</el-menu-item>
      </el-menu>
    </el-aside>

</template>

<script>
export default {
  name: "adminMenu",
  watch:{
    "$store.state.userInfo.isLogin":{
      immediate:true,
      handler(isLogin){
        if(!isLogin){
          this.$router.push('/')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
