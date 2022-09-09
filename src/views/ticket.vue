<template>
  <div>
    <div class="searchBox"  style="background-color: rgba(133,169,210,0.4);margin-top: -20px;height: 800px">
      <searchBox></searchBox>
    </div>

  </div>
</template>

<script>
import searchBox from "../components/searchBox";

export default {
  name: "ticket",
  components:{searchBox},
}
</script>

<style scoped>
.searchBox{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}
</style>
