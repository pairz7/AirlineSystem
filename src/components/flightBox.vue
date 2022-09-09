<template>
  <div class="midbox">
    <el-card class="box-card">
      <el-row>
          <div class="flightText" v-if="this.flight.flightId!=''">
            <el-image :src="airlineLogoUrl" class="airlineLogo"></el-image>{{flight.flightName}}{{this.flight.flightId}}
          </div>
        <div class="flightState plan" v-if="flight.flightState=='航班计划'||flight.flightState=='航班起飞'">{{this.flight.flightState}}</div>
        <div class="flightState delay" v-if="flight.flightState=='航班延误'">{{this.flight.flightState}}</div>
        <div class="flightState cancel" v-if="flight.flightState=='航班取消'">{{this.flight.flightState}}</div>
      </el-row>
      <el-row style="margin-top: 10px">
          <div class="default leftText">{{this.flight.startCity}}</div>
          <div class="default rightText">{{this.flight.arriveCity}}</div>
      </el-row>
      <el-row style="margin-top: 2px;font-size: 14px">
        <div class="leftText">预计{{this.getDate(this.flight.flightDate)}}</div>
        <div class="rightText">预计{{this.getDate(this.flight.arriveDate)}}</div>
      </el-row>
      <el-row style="padding-bottom: 20px">
        <el-row gutter="160">
          <el-col :span="5" class="timeText">{{this.flight.startTime}}</el-col>
          <el-col :span="12">
            <el-image :src="this.url.flyto" class="flytoImg"></el-image>
            <div v-if="this.flight.tranCity!=null&&this.flight.tranCity!=''">
              <el-popover
                placement="bottom"
                :title="'经停 '+this.flight.tranCity"
                width="350"
                trigger="hover"
                class="city-logo"
                >
                <div>{{this.flight.tranAirport}}</div>
                <el-row>
                  <div class="leftText">计划{{this.getDate(this.flight.tranArriveDate)}} {{this.flight.tranArriveTimePlan}}到达</div>
                  <div class="rightText">计划{{this.getDate(this.flight.tranStartDate)}} {{this.flight.tranStartTimePlan}}起飞</div>
                </el-row>
                <el-row>
                  <div class="leftText">预计{{ this.flight.tranArriveTime }}到达</div>
                  <div class="rightText">预计{{ this.flight.tranStartTime }}起飞</div>
                </el-row>
                <span slot="reference">经停</span>
              </el-popover>
              <div class="tranCity" >{{ this.flight.tranCity }}</div>
            </div>
          </el-col>
          <el-col :span="5" class="timeText">{{this.flight.arriveTime}}</el-col>
        </el-row>
        <el-row style="margin-top: 1px;font-size: 14px">
          <div class="leftText">原计划{{this.flight.startTimePlan}}</div>
          <div class="rightText">原计划{{this.flight.arriveTimePlan}}</div>
        </el-row>
<el-col>
  <div class="rightText"></div>
</el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";

Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
export default {
  name: "flightBox",
  data(){
    return{
      flight:{
        flightId:"FLIGHT",//航班号
        flightName:"",//航空公司
        flightType:"",//执飞机型
        startCity:"",//起飞城市
        startAirport:"",//起飞机场
        startTime:"00:00",//实际起飞时间
        startTimePlan:"00:00",//计划起飞时间
        arriveCity:"",
        arriveAirport:"",
        arriveTime:"00:00",
        arriveTimePlan:"00:00",
        arriveDate:"01-01",//到达日期
        tranCity:"",//经停城市
        tranAirport:"",//经停机场
        tranArriveDate:"",//经停到达日期
        tranStartDate:"",//经停出发日期
        tranArriveTime:"",//经停实际到达时间
        tranArriveTimePlan:"",//经停计划到达时间
        tranStartTime:"",//经停实际起飞时间
        tranStartTimePlan:"",//经停计划起飞时间
        flightDate:"01-01",//执飞日期
        flightState:"航班计划"//航班状态
      },
      url:{
        flyto:require("../assets/img/component/fly.png"),
      }

    };
  },
  methods:{
    getDate(date){
      var d=new Date(date);
      return d.Format("MM/dd");
    }
  },
  computed:{
    airlineLogoUrl(){
      return require("../assets/img/airlines/"+this.flight.flightId.slice(0,2)+".png");
    },
  },
  beforeCreate() {
    var axios = require('axios');
    var data = JSON.stringify({
      "flightId": this.$route.query.id,
      "flightDate": this.$route.query.date
    });
    let _this=this;
    var config = {
      method: 'post',
      url: '/Login-0.0.1-SNAPSHOT/getFlightById',
      headers: {
        'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios(config)
      .then(function (response) {
        if(response.data.code==-1){
          _this.$router.push('/404');
        }
        if(response.data.code==1){
          _this.flight=response.data.result[0];
          _this.flight.flightState='航班计划';
        }
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  }
}
</script>

<style scoped>
button {
  float: right;
  margin: 10px;
}
.box-card {
  width: 660px;
}
.airlineLogo{
  height: 48px;
  width: 48px;
  padding: 5px;
  margin-right: 5px;
}
.flightText{
  font-size: 22px;
  display: flex;
  align-items: center;

  vertical-align: middle;
}
.leftText{
  float: left;
}
.rightText{
  float: right;
}
.midbox{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}
.flytoImg{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 267px;
}
.timeText{
  font-size: 28px;
  margin-top: 15px;
}
.default{
  font-size: 16px;
}
.city-logo {
  text-align: center;
  background: #fff;
  border-style: solid;
  width: 48px;
  position: absolute;
  top: 12px;
  left: 365px;
  border-radius: 6px;
  border-width: 1px;
  border-color: #0066b1;
  font-size: 12px;
}
.tranCity{
  text-align: center;
  background: #fff;
  position: absolute;
  top: 38px;
  left: 375px;
  font-size: 13px;
}
.flightState{
  position: absolute;
  top:15px;
  font-size: 22px;
  left: 528px;
}
.plan{
  color: #01a480;
}
.delay{
color: #ffa400;
}
.cancel{
  color: #f5190a;
}
</style>
