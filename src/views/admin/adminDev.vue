<template>
  <el-container>
    <adminMenu></adminMenu>
    <el-main>
      <div style="margin-top: 20px;margin-left: 12px;font-size: 24px;margin-bottom: 20px">
        开发测试
      </div>
      <el-divider></el-divider>
      <div >
        <div style="margin-top: 20px;margin-left: 18px;font-size: 18px;margin-bottom: 20px">航班</div>
        <el-date-picker
          size="medium"
          style="width: 200px;margin-left: 20px"
          v-model="searchFlightInfo.flightDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-select v-model="searchFlightInfo.startIndex" placeholder="出发城市" size="small" style="width: 150px">
          <el-option :value="index" :label="city.city" v-for="(city,index) in citys" v-if="index!=searchFlightInfo.arriveIndex"></el-option>
        </el-select>
        <el-select v-model="searchFlightInfo.arriveIndex" placeholder="到达城市" size="small" style="width: 150px;">
          <el-option :value="index" :label="city.city" v-for="(city,index) in citys" v-if="index!=searchFlightInfo.startIndex"></el-option>
        </el-select>
        生成次数
        <el-input-number v-model="flightCount" :min="0" size="small"></el-input-number>
        <el-button type="primary" size="small" style="margin-left: 10px;margin-right: 20px" @click="generateFlight()">随机生成航班</el-button>
        <el-progress :text-inside="true" :stroke-width="26" style="width: 95%;margin-left: 20px;margin-top: 20px" :percentage="this.flightProgress"></el-progress>
      </div>
      <el-divider></el-divider>
      <div >
        <div style="margin-top: 20px;margin-left: 18px;font-size: 18px;margin-bottom: 20px">机票</div>
        <el-select v-model="searchTicketInfo.startIndex" placeholder="出发城市" size="small" style="width: 150px;margin-left: 20px">
          <el-option :value="index" :label="city.city" v-for="(city,index) in citys" v-if="index!=searchTicketInfo.arriveIndex"></el-option>
        </el-select>
        <el-select v-model="searchTicketInfo.arriveIndex" placeholder="到达城市" size="small" style="width: 150px;" @change="flashTicketSelect()">
          <el-option :value="index" :label="city.city" v-for="(city,index) in citys" v-if="index!=searchTicketInfo.startIndex"></el-option>
        </el-select>
        <el-select placeholder="航线航班" v-model="selectFlightId" size="small">
          <el-option :value="flight.flightId" :label="flight.flightId" v-for="flight in flights"></el-option>
        </el-select>
        <el-button type="primary" size="small" style="margin-left: 10px;margin-right: 20px" @click="generateTicket()">随机注册机票</el-button>
        <el-progress :text-inside="true" :stroke-width="26" style="width: 95%;margin-left: 20px;margin-top: 20px" :percentage="this.ticketProgress"></el-progress>
      </div>
      <div>

      </div>
    </el-main>
  </el-container>
</template>

<script>
import adminMenu from "../../components/admin/adminMenu";
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
  name: "adminDev",
  components:{adminMenu},
  data(){
    return{
      selectFlightId:'',
      flightCount:0,
      flightCnt:0,
      ticketCount:0,
      ticketCnt:0,
      flights:[],
      searchFlightInfo:{
        flightDate:'',
        startIndex:0,
        arriveIndex:1
      },
      searchTicketInfo:{
        startIndex:0,
        arriveIndex:1
      },
      flightInfos:[
        {flightId:'SC',flightName:"山东航空"},
        {flightId:'CA',flightName:"中国航空"},
        {flightId:'CZ',flightName:"南方航空"},
        {flightId:'GX',flightName:"北部湾航空"},
        {flightId:'9C',flightName:"春秋航空"},
        {flightId:'MF',flightName:"厦门航空"},
        {flightId:'3U',flightName:"四川航空"},
        {flightId:'HU',flightName:"海南航空"},
        {flightId:'ZH',flightName:"深圳航空"},
        {flightId:'JD',flightName:"首都航空"},
      ],
      citys:[
        {city:'上海',airport:'上海虹桥机场'},
        {city:'南京',airport:'南京禄口机场'},
        {city:'徐州',airport:'徐州观音机场'},
        {city:'杭州',airport:'杭州萧山机场'},
        {city:'宁波',airport:'宁波栎社机场'},
        {city:'济南',airport:'济南遥墙机场'},
        {city:'厦门',airport:'厦门高崎机场'},
        {city:'北京',airport:'北京首都机场'},
        {city:'石家庄',airport:'石家庄正定机场'},
        {city:'太原',airport:'太原武宿机场'},
        {city:'沈阳',airport:'沈阳桃仙机场'},
        {city:'哈尔滨',airport:'哈尔滨太平机场'},
        {city:'西安',airport:'西安咸阳机场'},
        {city:'乌鲁木齐',airport:'乌鲁木齐地窝铺机场'},
        {city:'广州',airport:'广州白云机场'},
        {city:'深圳',airport:'深圳宝安机场'},
        {city:'南宁',airport:'南宁吴圩机场'},
        {city:'桂林',airport:'桂林两江机场'},
        {city:'海口',airport:'海口美兰机场'},
        {city:'三亚',airport:'三亚凤凰机场'},
        {city:'武汉',airport:'武汉天河机场'},
        {city:'长沙',airport:'长沙黄花机场'},
        {city:'郑州',airport:'郑州新郑机场'},
        {city:'重庆',airport:'重庆江北机场'},
        {city:'成都',airport:'成都双流机场'},
        {city:'昆明',airport:'昆明长水机场'},
        {city:'拉萨',airport:'拉萨贡嘎机场'},
        {city:'天津',airport:'天津滨海机场'},
        {city:'青岛',airport:'青岛胶东机场'},
        {city:'临沂',airport:'临沂启阳机场'},
        {city:'黄山',airport:'黄山屯溪机场'},
        {city:'合肥',airport:'合肥骆岗机场'},
        {city:'温州',airport:'温州龙湾机场'},
        {city:'贵阳',airport:'贵阳龙洞堡机场'},
        {city:'兰州',airport:'兰州中川机场'},
        {city:'福州',airport:'福州长乐机场'},
        {city:'长春',airport:'长春龙嘉机场'},
        {city:'南昌',airport:'南昌昌北机场'},
        {city:'呼和浩特',airport:'呼和浩特白塔机场'},
        {city:'珠海',airport:'珠海金湾机场'},
        {city:'烟台',airport:'烟台蓬莱机场'},
      ],
      flightTypes:[
        '波音738','波音777','波音747','空客320','空客330','空客380'
      ],
      minutes:[
        '00','05','10','15','20','25','30','35','40','45','50','55'
      ],
      pricesLow:[
        599,699,830,950,1299,1499,1699,1899,1999,2300
      ],
      pricesHigh:[
        1699,1999,2200,2599,2999,3399,3200,3499,3999,4699
      ]
    };
  },
  computed:{
    flightProgress(){
      if(this.flightCount==0)return 0;
      return Math.floor((this.flightCnt/this.flightCount)*100);
    },
    ticketProgress(){
      if(this.ticketCount==0)return 0;
      return Math.floor((this.ticketCnt/this.ticketCount)*100);
    }
  },
  methods:{
    flashTicketSelect(){
      this.ticketCnt=0;
      var axios = require('axios');
      var data = JSON.stringify({
        "startCity": this.citys[this.searchTicketInfo.startIndex].city,
        "arriveCity": this.citys[this.searchTicketInfo.arriveIndex].city
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/getFlightBySAndA',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };
      let _this=this;
      axios(config)
        .then(function (response) {
          _this.flights=response.data.result;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    generateTicket(){
      this.ticketCnt=0;
      this.ticketCount=this.flights.length;
      for(let i=0;i<this.flights.length;i++){
        let rest,price,type;
        type='经济舱';
        rest=this.flights[i].economyQuantity;
        price=this.pricesLow[Math.floor(Math.random()*10)];
        this.submitTicket(this.flights[i].flightId,this.flights[i].flightDate,rest,price,type);
        type='头等舱';
        rest=this.flights[i].firstQuantity;
        price=this.pricesHigh[Math.floor(Math.random()*10)];
        this.submitTicket(this.flights[i].flightId,this.flights[i].flightDate,rest,price,type);
      }
      this.ticketCnt=0;

    },
    generateFlight(){
      this.flightCnt=0;
      for(let i=0;i<this.flightCount;i++){
        let random=Math.floor(Math.random()*10);
        let flightTypesNum=parseInt(Math.random()*6);
        let flightNum=1000+i;
        if(flightNum>9999)break;
        let flightInfo=JSON.parse(JSON.stringify(this.flightInfos[random]));
        flightInfo.flightId+=flightNum;
        this.searchFlightInfo.flightDate=new Date(this.searchFlightInfo.flightDate).Format("yyyy-MM-dd");
        let startHour=Math.floor(Math.random()*16+6);
        let flightHour=3
        if(startHour>18)flightHour=2;
        let arriveHour=startHour+flightHour;
        let startMinute=this.minutes[Math.floor(Math.random()*12)];
        let arriveMinute=this.minutes[Math.floor(Math.random()*12)];
        if(startHour<10){startHour='0'+startHour}
        if(arriveHour<10){arriveHour='0'+arriveHour}
        let startTime=startHour+':'+startMinute;
        let arriveTime=arriveHour+':'+arriveMinute;
        this.submitFlight(flightInfo,this.flightTypes[flightTypesNum],this.searchFlightInfo,startTime,arriveTime);
        let newSearchInfo=JSON.parse(JSON.stringify(this.searchFlightInfo));
        let temp=newSearchInfo.startIndex;
        newSearchInfo.startIndex=newSearchInfo.arriveIndex;
        newSearchInfo.arriveIndex=temp;
        newSearchInfo.flightDate=new Date(this.searchFlightInfo.flightDate).Format("yyyy-MM-dd");
        this.submitFlight(flightInfo,this.flightTypes[flightTypesNum],newSearchInfo,startTime,arriveTime);
      }
      this.flightCnt=this.flightCount;
      this.flightProgress=0;
    },
    submitTicket(flightId,flightDate,ticketRest,ticketPrice,ticketType){
      var axios = require('axios');
      var data = JSON.stringify({
        "flightId": flightId,
        "flightDate": flightDate,
        "ticketRest": ticketRest,
        "ticketPrice": ticketPrice,
        "ticketType": ticketType
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/addTicket',
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
            _this.ticketCnt++;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitFlight(flightInfo,flightType,searchFlightInfo,startTime,arriveTime){
      var axios = require('axios');
      var data = JSON.stringify({
        "flightId": flightInfo.flightId,
        "flightName": flightInfo.flightName,
        "flightType": flightType,
        "startCity":this.citys[searchFlightInfo.startIndex].city,
        "startAirport": this.citys[searchFlightInfo.startIndex].airport,
        "startTime": startTime,
        "startTimePlan": startTime,
        "arriveCity": this.citys[searchFlightInfo.arriveIndex].city,
        "arriveAirport": this.citys[searchFlightInfo.arriveIndex].airport,
        "arriveTime": arriveTime,
        "arriveTimePlan": arriveTime,
        "arriveDate": searchFlightInfo.flightDate,
        "flightDate": searchFlightInfo.flightDate,
        "flightRate": "88%",
        "flightPlan": "航班计划",
        "firstQuantity": 20,
        "economyQuantity": 130
      });

      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/addFlight',
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
            _this.flightCnt++;
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

</style>
