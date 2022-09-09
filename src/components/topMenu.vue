<template>
  <div>
    <el-menu
      class="top-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#0066b1"
      text-color="#ffffff"
      active-text-color="#ffffff"
      router
    >
      <el-menu-item index="">
        <h1 class="ui header white" style="margin-top: 16px">
          <i class="counterclockwise rotated plane icon" style="margin-top: 0;color: white;"></i>
          飞机订票系统
        </h1>
      </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <el-submenu index="1">
        <template slot="title">机票预订</template>
        <el-menu-item index="/ticket">国内机票</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">自助服务</template>
        <el-menu-item index="/flight">航班动态</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">会员服务</template>
        <el-menu-item index="/OrderInfo">我的订单</el-menu-item>
        <el-menu-item index="/userInfo">个人信息</el-menu-item>
      </el-submenu>

      <el-menu-item
        v-if="this.$store.state.userInfo.isLogin==false"
         index="/register"
        style="float: right"
      >
        <i class="el-icon-edit"></i>注册
      </el-menu-item>
      <el-submenu v-if="this.$store.state.userInfo.isLogin==true" index="5" style="float: right">
        <template slot="title" style="color: white">您好，{{this.$store.state.userInfo.name}}</template>
        <el-menu-item index="/userInfo" >个人信息</el-menu-item>
        <el-menu-item index="/OrderInfo" >我的订单</el-menu-item>
        <el-menu-item index="/admin" v-if="this.$store.state.userInfo.name=='admin'">后台管理</el-menu-item>
        <el-menu-item @click="logout()">注销</el-menu-item>
      </el-submenu>
      <el-menu-item v-else index="/login" style="float: right">
        <i class="el-icon-s-custom"></i>登录
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "topMenu",
  data() {
    return {
      currentUser:this.$store.state.userInfo.name,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.$store.commit("logOut");

    }
  }
};
</script>

<style scoped>
.ui.white{
  color:#ffffff;
  font-size: 20px;
}
</style>
