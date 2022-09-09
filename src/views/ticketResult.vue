<template>
  <div>
    <ul>
      <li class="ticketCardPos" style="margin-bottom: 10px">
        <div style="font-size: 22px">
          {{this.$route.query.startCity}}
        </div>
        <el-image :src="require('../assets/img/component/to.png')" style="width: 35px;height: 12px;margin-left: 6px;margin-right: 6px"></el-image>
        <div style="font-size: 22px">
          {{this.$route.query.arriveCity}}
        </div>
        <div style="font-size: 15px;margin-left: 10px;margin-top: 5px">
          {{this.getDateFormat(this.$route.query.flightDate,"M月d日")}}
          {{this.getWeekDay(this.$route.query.flightDate)}}
        </div>
      </li>
      <li class="ticketCardPos">
        <el-card class="filterCard">
          <el-col :span="3">
            <el-checkbox v-model="isDirect" style="margin-left: 10px">仅看直飞</el-checkbox>
          </el-col>
          <el-col :span="3">
            <el-select v-model="airlineFilter" placeholder="航空公司" size="mini" style="width: 100px;bottom: 3px">
              <el-option
                v-for="item in airlines"
                :key="item.flights.flightName"
                :label="item.flights.flightName"
                :value="item.flights.flightName">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="depTimeFilter" placeholder="起飞时间" size="mini" style="width: 120px;bottom: 3px">
              <el-option
                v-for="item in spanTime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-select v-model="desTimeFilter" placeholder="抵达时间" size="mini" style="width: 120px;margin-left: 10px;bottom: 3px">
              <el-option
                v-for="item in spanTime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-select v-model="classFilter" placeholder="舱位" size="mini" style="width:85px;margin-left: 20px;bottom: 3px">
              <el-option
                v-for="item in classType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <el-button size="mini" style="position: relative;bottom: 3px;left:35px" @click="clearFilter()">清除筛选</el-button>
          </el-col>
          <el-col :span="8">
            <div style="margin-top: -3px;float: right">
              <el-radio-group v-model="sortType" size="mini">
                <el-radio-button label="低价优先"></el-radio-button>
                <el-radio-button label="起飞时间早-晚"></el-radio-button>
              </el-radio-group>
            </div>
          </el-col>
        </el-card>
      </li>
      <li v-for="(ticket,index) in tickets" :key="index" v-if="ticket.isShow&&ticket.ticketRest>0">
        <div class="ticketCardPos">
          <el-card class="ticketCard">
            <el-row :gutter="26">
              <el-col :span="7">
                <div class="flightText" style="margin-top:-5px" v-if="ticket.flightId!=''">
                  <el-image :src="require('../assets/img/airlines/'+ticket.flightId.slice(0,2)+'.png')" class="airlineLogo"></el-image>
                  <div style="font-size: 15px">
                    {{ticket.flights.flightName}}
                    <br>
                    <a :href="'/#/flightResult?id='+ticket.flightId+'&date='+ticket.flightDate" style="font-size: 11px" v-on:click="">
                    {{ticket.flights.flightId}}&nbsp;&nbsp;{{ticket.flights.flightType}}
                  </a>
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="flightText">
                  <div style="font-size: 26px;">
                    {{ticket.flights.startTimePlan}}
                    <br>
                    <div style="font-size: 12px">
                      {{ticket.flights.startAirport}}
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
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
              <el-col :span="3">
                <div class="flightText">
                  <div style="font-size: 26px;">
                    {{ticket.flights.arriveTimePlan}}
                    <br>
                    <div style="font-size: 12px">
                      {{ticket.flights.arriveAirport}}
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :span="2">
                <div class="flightText" >
                  <span style="margin-top: 8px;color:#ffa400;font-size: 12px " v-if="ticket.ticketRest<=5">余票紧张</span>
                </div>
              </el-col>
              <el-col :span="6">
                <el-button style="float: right" type="primary" size="small" @click="order(index)">订票</el-button>
                <div class="priceStyle flightText">
                  <div style="font-size: 22px;">
                    ￥{{ticket.ticketPrice}}起
                    <div style="font-size: 12px;float: right;margin-top: 5px;margin-left: 10px;color: #0066b1">
                      {{ticket.ticketType}}
                    </div>

                  </div>
                </div>
              </el-col>
            </el-row>

          </el-card>
        </div>
      </li>
    </ul>
  </div>
</template>


<script>

import Ticket from "./ticket";

export default {
  name: "ticketResult",
  components: {},
  methods:{
    getTime(endTime,startTime) {
      var d1=new Date(startTime);
      var d2=new Date(endTime);
      var min=parseInt((parseInt(d2-d1)/1000/60)%60);
      var hour=parseInt((parseInt(d2-d1)/1000/60)/60);
      return hour+"时"+min+"分";
  },
    getDateFormat(date,format){
      var d=new Date(date);
      return d.Format(format);
    },
    getWeekDay(date){
      var a = new Array("日", "一", "二", "三", "四", "五", "六");
      var week = new Date(date).getDay();
      return "周"+ a[week];
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.flights.flightName) && res.set(arr.flights.flightName, 1));
    },
    handleAirlineList() {
      this.airlines=this.unique(this.tickets);
    },
    clearFilter(){
      this.airlineFilter='';
      this.depTimeFilter='';
      this.desTimeFilter='';
      this.classFilter='';
    },
    order(index){
      if(this.$store.state.userInfo.isLogin){
        this.$router.push({
          name:'book',
          params:{
            ticket:JSON.stringify(this.tickets[index])
          }
        });
      }else{
        alert("请先登录!");
        this.$router.push("/login");
      }
    }
  },


  watch:{
    isDirect:{
      immediate:true,
      handler(isDirect){
          for(let i=0;i<this.tickets.length;i++){
            let ticket=this.tickets[i];
            if(ticket.flights.tranCity!=null&&ticket.flights.tranCity!=""){
              if(isDirect) {
                this.tickets[i].isShow = false;
              }else{
                this.tickets[i].isShow = true;
            }
          }
        }
      }
    },
    airlineFilter:{
      immediate:true,
      handler(airlineFilter){
        for(let i=0;i<this.tickets.length;i++){
          let ticket=this.tickets[i];
          if(ticket.flights.flightName!=airlineFilter){
            this.tickets[i].isShow=false;
          }else{
            this.tickets[i].isShow=true;
          }
          if(airlineFilter==""){
            this.tickets[i].isShow=true;
          }
        }
        this.desTimeFilter=this.depTimeFilter;
      }
    },
    depTimeFilter:{
      immediate:true,
      handler(timeSpan){
        for(let i=0;i<this.tickets.length;i++){
          let ticket=this.tickets[i];
          let time=ticket.flights.startTimePlan;
          if(timeSpan=='1'){
            if(time>='06'&&time<='12'){
              this.tickets[i].isShow=true;
            }else{
              this.tickets[i].isShow=false;
            }
          }else if(timeSpan=="2"){
            if(time>='12'&&time<='18'){
              this.tickets[i].isShow=true;
            }else{
              this.tickets[i].isShow=false;
            }
          }else if(timeSpan=="3"){
            if(time>='18'&&time<='24'){
              this.tickets[i].isShow=true;
            }else{
              this.tickets[i].isShow=false;
            }
          }
          if(timeSpan==""){
            this.tickets[i].isShow=true;
          }
        }
      }
    },
    desTimeFilter:{
      immediate:true,
      handler(timeSpan){
        for(let i=0;i<this.tickets.length;i++){
          let ticket=this.tickets[i];
          let time=ticket.flights.arriveTimePlan;
          if(timeSpan=='1'){
            if(time>='06'&&time<='12'){
              this.tickets[i].isShow=true;
            }else{
              this.tickets[i].isShow=false;
            }
          }else if(timeSpan=="2"){
            if(time>='12'&&time<='18'){
              this.tickets[i].isShow=true;
            }else{
              this.tickets[i].isShow=false;
            }
          }else if(timeSpan=="3"){
            if(time>='18'&&time<='24'){
              this.tickets[i].isShow=true;
            }else{
              this.tickets[i].isShow=false;
            }
          }
          if(timeSpan==""){
            this.tickets[i].isShow=true;
          }
        }
      }
    },
    classFilter:{
      immediate:true,
      handler(classFilter){
        for(let i=0;i<this.tickets.length;i++){
          let ticket=this.tickets[i];
          if(ticket.ticketType!=classFilter){
            this.tickets[i].isShow=false;
          }else{
            this.tickets[i].isShow=true;
          }
          if(classFilter==""){
            this.tickets[i].isShow=true;
          }
        }
        this.desTimeFilter=this.depTimeFilter;

      }
    },
    sortType:{
      immediate:true,
      handler(sortType){
        if(sortType=="低价优先"){
          var compare = function (obj1, obj2) {
            var val1 = obj1.ticketPrice;
            var val2 = obj2.ticketPrice;
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }
          }
        }else if(sortType=="起飞时间早-晚"){
          var compare = function (obj1, obj2) {
            var val1 = obj1.flights.startTimePlan;
            var val2 = obj2.flights.startTimePlan;
            if (val1 < val2) {
              return -1;
            } else if (val1 > val2) {
              return 1;
            } else {
              return 0;
            }
          }
        }
        this.tickets.sort(compare);
      }
    }
  },
  beforeCreate() {
    var axios = require('axios');
    var data = JSON.stringify({
      "startCity": this.$route.query.startCity,
      "arriveCity": this.$route.query.arriveCity,
      "flightDate": this.$route.query.flightDate
    });
    // this.queryInfo.startCity=this.$route.query.startCity;
    // this.queryInfo.arriveCity=this.$route.query.arriveCity;
    // this.queryInfo.tripDate=this.$route.query.flightDate;

    var config = {
      method: 'post',
      url: '/Login-0.0.1-SNAPSHOT/getTicket',
      headers: {
        'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
        'Content-Type': 'application/json'
      },
      data : data
    };
    let _this=this;
    axios(config)
      .then(function (response) {
        if(response.data.code==1){
          _this.tickets=response.data.result;
          for(let i=0;i<_this.tickets.length;i++){
            _this.tickets[i].isShow=true;
             if(_this.tickets[i].flights.tranCity==_this.$route.query.startCity){
              _this.tickets[i].flights.startCity=_this.tickets[i].flights.tranCity;
              _this.tickets[i].flights.startAirport=_this.tickets[i].flights.tranAirport;
              _this.tickets[i].flights.startTime=_this.tickets[i].flights.tranStartTime;
              _this.tickets[i].flights.startTimePlan=_this.tickets[i].flights.tranStartTimePlan;
              _this.tickets[i].flights.flightDate=_this.tickets[i].flights.tranStartDate;
              _this.tickets[i].flights.tranCity=undefined;
            }
            if(_this.tickets[i].flights.tranCity==_this.$route.query.arriveCity){
              _this.tickets[i].flights.arriveCity=_this.tickets[i].flights.tranCity;
              _this.tickets[i].flights.arriveAirport=_this.tickets[i].flights.tranAirport;
              _this.tickets[i].flights.arriveTime=_this.tickets[i].flights.tranArriveTime;
              _this.tickets[i].flights.arriveTimePlan=_this.tickets[i].flights.tranArriveTimePlan;
              _this.tickets[i].flights.arriveDate=_this.tickets[i].flights.tranArriveDate;
              _this.tickets[i].flights.tranCity=undefined;
            }
          }
          _this.handleAirlineList();
        }else {
          this.$router.push('/404.html');
          return;
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  },
  data(){
    return{
      sortType:'',
      airlineFilter:'',
      airlines:[],
      depTimeFilter:'',
      desTimeFilter:'',
      classFilter:'',
      classType:[
        {label:"经济舱",value:'经济舱'},
        {label:"头等舱",value: '头等舱'}
      ],
      spanTime:[
        {label:"上午6~12点",value:1},
        {label:"下午12~18点",value:2},
        {label:"晚上18~24点",value: 3}
      ],
      isDirect:false,
      queryInfo:{
        startCity:"",
        arriveCity:"",
        tripDate:""
      },
      tickets:[
        // {
        // flightId:"SC2789",
        // flightDate:"2022-07-08",
        // ticketRest:1,
        // ticketPrice:1000,
        // ticketType:'2312',
        // realStart:"长沙",
        // realArrive:"上海",
        // flights:{
        //   flightId:"SC1789",
        //   flightName:"山东航空",
        //   flightType:"空客320",
        //   startCity:"南宁",
        //   startAirport:"南宁吴圩机场",
        //   startTime:"21:09",
        //   startTimePlan:"19:09",
        //   arriveCity:"上海",
        //   arriveAirport:"南宁吴圩机场",
        //   arriveTime:"22:45",
        //   arriveTimePlan:"22:44",
        //   arriveDate:"2022-07-08",
        //   tranCity:"长沙",
        //   tranAirport:"岳麓机场",
        //   tranArriveTime:"13:33",
        //   tranArriveTimePlan:"13:34",
        //   tranArriveDate:"2022-07-07",
        //   tranStartTime:"13:44",
        //   tranStartTimePlan:"13:45",
        //   tranStartDate:"2022-07-08",
        //   flightDate:"2022-07-08",
        //   flightRate:"90%"
        // },
        // isShow:true
        // },
        // {
        //   flightId:"SC1789",
        //   flightDate:"2022-07-08",
        //   ticketRest:12,
        //   ticketPrice:122,
        //   ticketType:'2312',
        //   realStart:"长沙",
        //   realArrive:"上海",
        //   flights:{
        //     flightId:"SC1789",
        //     flightName:"山东航空",
        //     flightType:"空客",
        //     startCity:"南宁",
        //     startAirport:"南宁吴圩机场",
        //     startTime:"21:09",
        //     startTimePlan:"19:09",
        //     arriveCity:"上海",
        //     arriveAirport:"南宁吴圩机场",
        //     arriveTime:"22:45",
        //     arriveTimePlan:"22:44",
        //     arriveDate:"2022-07-08",
        //     tranCity:"长沙",
        //     tranAirport:"岳麓机场",
        //     tranArriveTime:"13:33",
        //     tranArriveTimePlan:"13:34",
        //     tranArriveDate:"2022-07-08",
        //     tranStartTime:"13:44",
        //     tranStartTimePlan:"13:45",
        //     tranStartDate:"2022-07-08",
        //     flightDate:"2022-07-08",
        //     flightRate:"90%"
        //   },
        //   isShow: true
        // },
        // {
        //   flightId:"CA1234",
        //   flightDate:"2022-08-30",
        //   ticketRest:12,
        //   ticketPrice:1234,
        //   ticketType:'2312',
        //   realStart:"长沙",
        //   realArrive:"上海",
        //   flights:{
        //     flightId:"CA1234",
        //     flightName:"东方航空",
        //     flightType:"空客",
        //     startCity:"南宁",
        //     startAirport:"南宁吴圩机场",
        //     startTime:"21:09",
        //     startTimePlan:"12:09",
        //     arriveCity:"上海",
        //     arriveAirport:"上海浦东机场",
        //     arriveTime:"22:45",
        //     arriveTimePlan:"22:44",
        //     arriveDate:"2022-07-08",
        //     tranCity:"长沙",
        //     tranAirport:"长沙岳麓机场",
        //     tranArriveTime:"13:33",
        //     tranArriveTimePlan:"13:34",
        //     tranArriveDate:"2022-07-08",
        //     tranStartTime:"13:44",
        //     tranStartTimePlan:"13:45",
        //     tranStartDate:"2022-07-08",
        //     flightDate:"2022-07-08",
        //     flightRate:"90%"
        //   },
        //   isShow: true
        // },
        // {
        //   flightId:"CA2234",
        //   flightDate:"2022-08-30",
        //   ticketRest:10,
        //   ticketPrice:1034,
        //   ticketType:'2312',
        //   realStart:"长沙",
        //   realArrive:"上海",
        //   flights:{
        //     flightId:"CA2234",
        //     flightName:"东方航空",
        //     flightType:"空客",
        //     startCity:"南宁",
        //     startAirport:"南宁吴圩机场",
        //     startTime:"15:09",
        //     startTimePlan:"15:09",
        //     arriveCity:"上海",
        //     arriveAirport:"上海浦东机场",
        //     arriveTime:"22:45",
        //     arriveTimePlan:"22:44",
        //     arriveDate:"2022-07-08",
        //     flightDate:"2022-07-08",
        //     flightRate:"90%"
        //   },
        //   isShow: true
        // },
        // {
        //   flightId:"GX1234",
        //   flightDate:"2022-08-30",
        //   ticketRest:1,
        //   ticketPrice:1234,
        //   ticketType:'2312',
        //   realStart:"长沙",
        //   realArrive:"上海",
        //   flights:{
        //     flightId:"GX1234",
        //     flightName:"北部湾航空",
        //     flightType:"空客320",
        //     startCity:"南宁",
        //     startAirport:"南宁吴圩机场",
        //     startTime:"13:09",
        //     startTimePlan:"13:09",
        //     arriveCity:"上海",
        //     arriveAirport:"上海浦东机场",
        //     arriveTime:"22:45",
        //     arriveTimePlan:"17:44",
        //     arriveDate:"2022-07-08",
        //     flightDate:"2022-07-08",
        //     flightRate:"90%"
        //   },
        //   isShow: true
        // },
        // {
        //   flightId:"CZ1234",
        //   flightDate:"2022-08-30",
        //   ticketRest:10,
        //   ticketPrice:1834,
        //   ticketType:'2312',
        //   realStart:"长沙",
        //   realArrive:"上海",
        //   flights:{
        //     flightId:"CZ1234",
        //     flightName:"南方航空",
        //     flightType:"空客330",
        //     startCity:"南宁",
        //     startAirport:"南宁吴圩机场",
        //     startTime:"07:09",
        //     startTimePlan:"07:09",
        //     arriveCity:"上海",
        //     arriveAirport:"上海浦东机场",
        //     arriveTime:"22:45",
        //     arriveTimePlan:"22:44",
        //     arriveDate:"2022-07-08",
        //     flightDate:"2022-07-08",
        //     flightRate:"90%"
        //   },
        //   isShow: true
        // },
        // {
        //   flightId:"3U2234",
        //   flightDate:"2022-08-30",
        //   ticketRest:10,
        //   ticketPrice:834,
        //   ticketType:'2312',
        //   realStart:"长沙",
        //   realArrive:"上海",
        //   flights:{
        //     flightId:"3U2234",
        //     flightName:"四川航空",
        //     flightType:"波音738",
        //     startCity:"南宁",
        //     startAirport:"南宁吴圩机场",
        //     startTime:"08:09",
        //     startTimePlan:"08:09",
        //     arriveCity:"上海",
        //     arriveAirport:"上海浦东机场",
        //     arriveTime:"22:45",
        //     arriveTimePlan:"22:44",
        //     arriveDate:"2022-07-08",
        //     flightDate:"2022-07-08",
        //     flightRate:"90%"
        //   },
        //   isShow: true
        // },
      ]
    };
  }
}
</script>

<style scoped>
.ticketCardPos{
  display: flex;
  justify-content: center;
  align-items: center;
}
.ticketCard{
  height: 80px;
  width: 1000px;
  margin-bottom: 2px;
}
.filterCard{
  height: 60px;
  width: 1000px;
}
.airlineLogo{
  height: 48px;
  width: 48px;
  padding: 5px;
  margin-right: 5px;
}
.flightText{
  margin-top: 2px;
  display: flex;
  align-items: center;
  vertical-align: middle;
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
.priceStyle{
  float: right;
  margin-right: 10px;
  margin-top: 10px;
  color:#1775c2;
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
  margin-left: 12px;
  font-size: 6px;
}
.leftText{
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 10px;
}




</style>

