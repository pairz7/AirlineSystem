<template>
  <div>
    <div style="text-align: center;font-size: 24px;margin-top: 150px;font-family: 微软雅黑">哎呀，出现了点小问题</div>
    <div style="text-align: center;font-size: 24px;margin-top: 20px;font-family: 微软雅黑">
      <el-button type="text" style="position: relative;font-size: 18px" @click="$router.push('/')">回到主页</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "notfound"
}
</script>

<style scoped>

</style>
