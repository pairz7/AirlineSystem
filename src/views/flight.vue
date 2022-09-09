<template>
<div class="flightQuery" style="background-color: rgba(133,169,210,0.4);margin-top: -20px;height: 800px">
  <flightQuery></flightQuery>
</div>
</template>

<script>
import flightQuery from "../components/flightQuery";

export default {
  name: "flight",
  components:{flightQuery}
}
</script>

<style scoped>
.flightQuery{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 180px;
}
</style>
