<template>
<el-card class="card">
  <el-row>
    <el-col>
      <div style="font-size: 15px;font-weight: 600; text-align: center" >
        {{this.getDateFormat(this.ticket.flightDate,"M月d日")}}
        {{this.getWeekDay(this.ticket.flightDate)}}
        &nbsp;
        {{this.ticket.realStart}}
        <el-image :src="require('../assets/img/component/to1.png')" style="width: 35px;height: 8px;margin-left: 1px;margin-right: 1px;"></el-image>
        {{this.ticket.realArrive}}
      </div>
    </el-col>
  </el-row>
  <el-row style="margin-left: 60px;margin-top: 3px">
    <el-col :span="24">
      <div class="flightText" style="text-align: center">
        <el-image :src="require('../assets/img/airlines/'+ticket.flightId.slice(0,2)+'.png')" class="airlineLogo"></el-image>
        <div style="font-size: 12px;color: #99a9bf;margin-left: -5px">
          {{ticket.flights.flightName}}
            {{ticket.flights.flightId}}&nbsp;&nbsp;{{ticket.flights.flightType}}
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row style="margin-top: 16px;margin-left: 20px">
    <el-col :span="8">
      <div class="flightText" style="text-align: center">
        <div style="font-size: 24px;">
          {{ticket.flights.startTimePlan}}
          <br>
          <div style="font-size: 12px">
            {{ticket.flights.startAirport}}
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <el-image :src="require('../assets/img/component/to.png')" class="flytoImg"></el-image>
      <div v-if="ticket.flights.tranCity!=null&&ticket.flights.tranCity!=''">
        <div class="jtCity">
          经停{{ticket.flights.tranCity}}
        </div>
        <div class="jtTime">
          {{getTime(ticket.flights.tranStartDate+" "+ticket.flights.tranStartTime,ticket.flights.tranArriveDate+" "+ticket.flights.tranArriveTime)}}
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="flightText">
        <div style="font-size: 24px;">
          {{ticket.flights.arriveTimePlan}}
          <br>
          <div style="font-size: 12px">
            {{ticket.flights.arriveAirport}}
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-divider></el-divider>
  <ul>
    <li v-for="(person,index) in passengers" :key="index" style="font-size: 12px;margin-top: 10px">
      <div>
        机票
        <div style="float: right;margin-right: 30px">
          ￥{{ticket.ticketPrice}}
        </div>
      </div>
      <div>
        机建
        <div style="float: right;margin-right: 30px">
          ￥{{globalInfo.airportFee}}
        </div>
      </div>
      <div>
        燃油税
        <div style="float: right;margin-right: 30px">
          ￥{{globalInfo.oilFee}}
        </div>
      </div>
    </li>
  </ul>
  <el-divider></el-divider>
  <div style="float: right;font-size: 24px;color: coral;margin-right: 25px;margin-bottom: 30px">
    ￥{{totalFee}}
  </div>
</el-card>
</template>

<script>
export default {
  name: "bookSideCard",
  computed:{
    totalFee(){
      let total=0;
      total+=this.ticket.ticketPrice*this.passengers.length;
      total+=(this.globalInfo.oilFee+this.globalInfo.airportFee)*this.passengers.length;
      return total;
    },
  },
  watch:{
    bookPassengers(newVal){
      this.passengers=newVal;
    },
    bookTicket(newVal){
      this.ticket=newVal;
    }
  },
  props:[
    'bookPassengers',
    'bookTicket'
  ],
  data(){
    return{
      globalInfo:{
        airportFee:50,
        oilFee:140
      },
      passengers:this.bookPassengers,
      ticket:this.bookTicket
    };
  },
  methods:{
    getDateFormat(date,format){
      var d=new Date(date);
      return d.Format(format);
    },
    getWeekDay(date){
      var a = new Array("日", "一", "二", "三", "四", "五", "六");
      var week = new Date(date).getDay();
      return "周"+ a[week];
    },
    getTime(endTime,startTime) {
      var d1=new Date(startTime);
      var d2=new Date(endTime);
      var min=parseInt((parseInt(d2-d1)/1000/60)%60);
      var hour=parseInt((parseInt(d2-d1)/1000/60)/60);
      return hour+"时"+min+"分";
    },

  }
}
</script>

<style scoped>
.card{
  width: 350px;
  min-height: 360px;
}
.flightText{
  margin-top: 2px;
  display: flex;
  align-items: center;
  vertical-align: middle;
}
.jtCity{
  position: relative;
  margin-top: -28px;
  margin-left: 12px;
  font-size: 10px;
}
.jtTime{
  position: relative;
  margin-top: 6px;
  margin-left: 11px;
  font-size: 6px;
}
.flytoImg{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 110px;
  margin-left: -17px;
  padding-top: 10px;
  margin-top: 5px;
}
.airlineLogo{
  height: 24px;
  width: 24px;
  padding: 5px;
  margin-right: 5px;
}
</style>
