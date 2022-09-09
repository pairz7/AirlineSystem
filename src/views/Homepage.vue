<template>
<div>
  <Carousel></Carousel>
  <searchBox class="searchBox"></searchBox>
  <div class="hottitle">———— 热门航线 ————</div>
  <div class="hot">
    <el-row :gutter="30">
      <el-col :span="6" v-for="(flight,index) in this.flights" :key="index">
        <div class="el-card" @click="search(flight.startCity,flight.arriveCity,flight.flightDate)">
          <img :src="flight.img" alt />
          <span class="adr">{{flight.startCity}} - {{flight.arriveCity}}</span>
          <span>{{flight.ticketType}}单程含税</span>
          <span>￥{{flight.ticketPrice}}起</span>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>



import searchBox from "../components/searchBox";
import Carousel from "../components/Carousel";
export default {
  name: "Homepage",
  components:{searchBox,Carousel},
  data(){
    return{
      flights:[

      ],
    }
  },
  created() {
    this.initRecommend();
  },
  methods:{
    gotoLogin(){
      this.$router.push('/login');
    },
    gotoReg(){
      this.$router.push('/register');
    },
    search(startCity,arriveCity,flightDate){
      this.$router.push({
        path:'/ticketResult',
        query:{
          startCity:startCity,
          arriveCity:arriveCity,
          flightDate:flightDate
        }
      })
    },
    initRecommend(){
      var axios = require('axios');
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/getRecommend',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)'
        }
      };
      let _this=this;
      axios(config)
        .then(function (response) {
          _this.flights=response.data.result;
          for(let i=0;i<4;i++){
            let num=i+1;
            _this.flights[i].img=require("../assets/img/recommend/hot-"+num+".jpg");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.searchBox{
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  /*margin-top: 0%;*/
  position: absolute;
  margin-top: -400px;
  margin-left: 150px;
  z-index: 2;
  opacity: 0.95;
}
.hottitle {
  margin: 3rem auto;
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
}
.hot img {
  width: 100%;
}
.hot .el-col{
  text-align:left;
}
.hot .el-col>div>span{
  display:block;
  padding-left:10px;
}
.hot .el-col>div>span.adr{
  font-size:1rem;
  font-weight:700;
  margin:10px 0;
}
.hot .el-col>div>span:last-child{
  font-size:1.3rem;
  font-weight:700;
  color:#f00;
  padding-left:6px;
  margin-bottom:40px;
}
.hot .el-col .el-card {
  border:2px solid #eeeeee;
}
.hot .el-col .el-card:hover{
  border-color:#051039;
  cursor: pointer;
}
.hot {
  margin: 50px 15px;
}
</style>
