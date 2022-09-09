<template>
  <div>
    <el-container>
      <el-header style="padding:0">
        <topMenu></topMenu>
      </el-header>
      <el-main style="padding:0">
        <router-view></router-view>
      </el-main>
      <el-footer style="padding:0">
        <footInfo></footInfo>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import topMenu from "./components/topMenu";
import footInfo from "./components/footInfo";
export default {
  name: 'App',
  components:{topMenu,footInfo},
  created() {
    let userInfoData=localStorage.getItem('userInfo');
    if(userInfoData!=null){
      let userInfo=JSON.parse(userInfoData);
      this.$store.state.userInfo=userInfo;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
.el-header {
  padding: 0;
  margin: 0;
}
.el-main {
  padding: 0;
  min-height: calc(100vh - 210px);
}
.el-footer {
  padding: 0;
  height: 190px;
  margin: 0;
}
.body{
  margin: 0;
  padding: 0;
}
</style>
