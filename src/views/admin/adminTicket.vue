<template>
  <el-container>
    <adminMenu></adminMenu>
    <el-main>
      <div style="margin-top: 20px;margin-left: 12px;font-size: 24px;margin-bottom: 20px">
        机票管理
      </div>
      <div style="margin-top: 10px;margin-left: 10px">
        <el-date-picker
          size="medium"
          style="width: 200px"
          v-model="searchDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-input size="medium" style="width: 160px;" v-model="searchStartCity" placeholder="输入起飞城市">
        </el-input>
        <el-input size="medium" style="width: 200px" placeholder="输入抵达城市" v-model="searchArriveCity">
          <el-button slot="append" icon="el-icon-search" @click="searchByCity(searchStartCity,searchArriveCity,searchDate)"></el-button>
        </el-input>
        <el-button type="text" style="float:right;margin-right: 50px" @click="initNew()" v-if="this.searchStartCity!=''&&this.searchArriveCity!=''">在此航线上注册航班</el-button>
        <el-dialog :title="this.searchStartCity+' 到 '+this.searchArriveCity+' '+this.searchDate" :visible.sync="newVisible" :close-on-click-modal="false">
          <el-form style="margin-left: 20px" :model="newTicket" ref="newTicket" :rules="rules">
            <el-row>
              <el-col>
                <el-form-item label="航班号">
                  <el-select @change="selectChanged" v-model="newTicket.flightId">
                    <el-option  v-for="flight in this.flights" :key="flight.flightId" :value="flight.flightId" :label="flight.flightId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="newFlight.flightId!=null" style="font-size: 16px">
              <el-row style="margin-bottom: 10px;">
                <el-col :span="5">
                  {{this.newFlight.flightName}}{{this.newFlight.flightId}}
                </el-col>
                <el-col :span="3">
                 {{newFlight.flightDate}}
                </el-col>
                <el-col :span="7">
                  {{newFlight.startCity}}到{{newFlight.arriveCity}} 经停{{newFlight.tranCity}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="5">
                  出发:{{this.newFlight.startTimePlan}} 到达:{{this.newFlight.arriveTimePlan}}
                </el-col>
                <el-col :span="3">
                  机型:{{newFlight.flightType}}
                </el-col>
                <el-col :span="6">
                  状态:{{newFlight.flightPlan}}
                </el-col>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-col :span="7">
                  <el-form-item label="舱位类型" prop="ticketType">
                    <el-select size="mini" style="width: 150px" v-model="newTicket.ticketType">
                      <el-option value="经济舱" label="经济舱"></el-option>
                      <el-option value="头等舱" label="头等舱"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="票价" prop="ticketPrice">
                    <el-input-number size="mini" style="width: 150px" :min="0" v-model="newTicket.ticketPrice"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="余量" prop="ticketRest">
                    <el-input-number size="mini" style="width: 150px" :min="0" v-model="newTicket.ticketRest"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-form>
          <div slot="footer" style="margin-top: -35px">
            <el-button @click="cancelNew()">取 消</el-button>
            <el-button type="primary" @click="regTicket()" style="margin-right: 15px">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <ul v-if="tickets.length>0">
        <li v-for="(ticket,index) in tickets" :key="index" v-if="ticket.isShow&&ticket.ticketRest>0">
          <div class="ticketCardPos">
            <el-card class="ticketCard">
              <el-row :gutter="26">
                <el-col :span="4">
                  <div class="flightText" style="margin-top:-5px" v-if="ticket.flightId!=''">
                    <el-image :src="require('../../assets/img/airlines/'+ticket.flightId.slice(0,2)+'.png')" class="airlineLogo"></el-image>
                    <div style="font-size: 15px">
                      {{ticket.flights.flightName}}
                      <br>
                      <a :href="'/flightResult?id='+ticket.flightId+'&date='+ticket.flightDate" style="font-size: 11px" v-on:click="">
                        {{ticket.flights.flightId}}&nbsp;&nbsp;{{ticket.flights.flightType}}
                      </a>
                    </div>
                  </div>
                </el-col>
                <el-col :span="2">
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
                <el-col :span="2">
                  <el-image :src="require('../../assets/img/component/to.png')" class="flytoImg"></el-image>
                  <div v-if="ticket.flights.tranCity!=null&&ticket.flights.tranCity!=''">
                    <div class="jtCity">
                      经停{{ticket.flights.tranCity}}
                    </div>
                    <div class="jtTime">
                      {{getTime(ticket.flights.tranStartDate+" "+ticket.flights.tranStartTime,ticket.flights.tranArriveDate+" "+ticket.flights.tranArriveTime)}}
                    </div>

                  </div>
                </el-col>
                <el-col :span="2">
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
                <el-col :span="2" style="margin-left: 20px">
                  <div class="flightText" >
                    <div style="margin-top: 8px;color:#ffa400 ;font-size:12px">剩余票量:{{ticket.ticketRest}}</div>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="flightText" >
                    <div style="margin-top: 8px;color:#ffa400;font-size:12px ">执飞日期:{{ticket.flightDate}}</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <el-button style="float: right" type="primary" size="small" @click="deleteTicket(index)">删除</el-button>
                  <el-button style="float: right;margin-right: 3px" type="primary" size="small" @click="modify(index)">修改</el-button>
                  <el-button style="float: right;margin-right: -7px" type="primary" size="small" @click="checkPassenger(index)">乘客</el-button>
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
              <el-dialog style="" width="520px" :title="tickets[currentIndex].flights.flightName+tickets[currentIndex].flights.flightId+' '+tickets[currentIndex].flights.flightDate+' 已订数量:'+orderNum" :visible.sync="passengerVisible" :close-on-click-modal="false">
                <div class="centerTable">

                  <el-table
                    :data="passengers"
                    class="table"
                    :header-cell-style="{'text-align':'center'}"
                    :cell-style="{'text-align':'center'}"
                    style="width: 100%;table-layout: fixed">
                    <el-table-column
                      prop="name"
                      label="乘机人姓名"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="id"
                      label="身份证号"
                      width="300">
                    </el-table-column>
                  </el-table>
                </div>
                <div slot="footer" style="margin-top: -35px">
                  <el-button type="primary" @click="passengerVisible=false" style="margin-right: 15px">确 定</el-button>
                </div>
              </el-dialog>
              <el-dialog :title="editTicket.flights.flightName+editTicket.flights.flightId" :visible.sync="modifyVisible" :close-on-click-modal="false">
                <el-form style="margin-left: 20px" :model="editTicket" ref="editTicket">
                  <el-row style="margin-top: 20px">
                    <el-col :span="7">
                      <el-form-item label="舱位类型" prop="ticketType">
                        <el-select size="mini" style="width: 150px" v-model="editTicket.ticketType">
                          <el-option value="经济舱" label="经济舱"></el-option>
                          <el-option value="头等舱" label="头等舱"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="票价" prop="ticketPrice">
                        <el-input-number size="mini" style="width: 150px" :min="0" v-model="editTicket.ticketPrice"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="余量" prop="ticketRest">
                        <el-input-number size="mini" style="width: 150px" :min="0" v-model="editTicket.ticketRest"></el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <div>
                  <el-select v-model="recommendIndex" size="mini" style="width: 100px;float: right">
                    <el-option value="1" label="1"></el-option>
                    <el-option value="2" label="2"></el-option>
                    <el-option value="3" label="3"></el-option>
                    <el-option value="4" label="4"></el-option>
                  </el-select>
                  <el-button type="text" @click="recommend(modifyIndex)">将此航班加入推荐航班</el-button>
                </div>
                <div slot="footer" style="margin-top: 10px;margin-bottom: 40px">
                  <el-button @click="cancelModify(modifyIndex)">取 消</el-button>
                  <el-button type="primary" @click="updateTicket(modifyIndex)" style="margin-right: 15px">确 定</el-button>
                </div>
              </el-dialog>
            </el-card>
          </div>
        </li>
      </ul>
      <div style="font-size: 20px;text-align: center;font-weight: bold;margin-top: 200px" v-else>请先进行查询!</div>
    </el-main>
  </el-container>
</template>

<script>
import adminMenu from "../../components/admin/adminMenu";
import axios from "axios";

export default {
  name: "adminTicket",
  components:{adminMenu},
  data(){
    return{
      orderNum:'数据读取失败',
      recommendIndex:1,
      passengers:[

      ],
      currentIndex:0,
      rules:{
        ticketRest:[{required:true,message:"最小应设置为0",trigger:'blur'}],
        ticketPrice:[{required:true,message:"最小应设置为0",trigger:'blur'}],
        ticketType:[{required:true,message:"请设置舱位类型",trigger:'blur'}],
      },
      flights:[],
      passengerVisible:false,
      modifyVisible:false,
      newVisible:false,
      modifyIndex:0,
      searchDate:'',
      newFlight:{},
      newTicket:{
        flightId: "",
        flightDate: "",
        ticketRest: 0,
        ticketPrice: 0,
        ticketType: "",
        flights: {
          flightId: "",
          flightName: "",
          flightType: "",
          startCity: "",
          startAirport: "",
          startTime: "",
          startTimePlan: "",
          arriveCity: "",
          arriveAirport: "",
          arriveTime: "",
          arriveTimePlan: "",
          arriveDate: "",
          tranCity: "",
          tranAirport: "",
          tranArriveTime: "",
          tranArriveTimePlan: "",
          tranArriveDate: "",
          tranStartTime: "",
          tranStartTimePlan: "",
          tranStartDate: "",
          flightDate: "",
          flightRate: ""
        }
      },
      editTicket:{
        flightId: "3U4432",
        flightDate: "2022-09-08",
        ticketRest: 4567,
        ticketPrice: 1234,
        ticketType: "头等舱",
        realStart: "长沙",
        realArrive: "南宁",
        realStartTime: "13:44",
        realArriveTime: "22:45",
        realStartAirport: "长沙岳麓机场",
        realArriveAirport: "南宁吴圩机场",
        realTranCity: "",
        flights: {
          flightId: "3U4432",
          flightName: "西部航空",
          flightType: "波音",
          startCity: "哈尔滨",
          startAirport: "长沙岳麓机场",
          startTime: "19:24",
          startTimePlan: "19:09",
          arriveCity: "南宁",
          arriveAirport: "南宁吴圩机场",
          arriveTime: "22:45",
          arriveTimePlan: "22:44",
          arriveDate: "2022-07-08",
          tranCity: "长沙",
          tranAirport: "长沙岳麓机场",
          tranArriveTime: "13:33",
          tranArriveTimePlan: "13:34",
          tranArriveDate: "2022-07-08",
          tranStartTime: "13:44",
          tranStartTimePlan: "13:45",
          tranStartDate: "2022-07-08",
          flightDate: "2022-09-08",
          flightRate: "99%"
    }
      },
      searchStartCity:'',
      searchArriveCity:'',
      ticketBackup:{},
      tickets:[

      ]
    };
  },
  methods:{
    recommend(){
      var axios = require('axios');
      var data = JSON.stringify({
        "flightId": this.tickets[this.modifyIndex].flightId,
        "flightDate": this.tickets[this.modifyIndex].flightDate,
        "index": this.recommendIndex,
        "startCity": this.tickets[this.modifyIndex].realStart,
        "arriveCity": this.tickets[this.modifyIndex].realArrive,
        "ticketType": this.tickets[this.modifyIndex].ticketType,
        "ticketPrice": this.tickets[this.modifyIndex].ticketPrice
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/updateRecommend',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };
      alert(data)
      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            alert("设置成功")
          }else{
            alert("设置失败")
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("出现未知错误"+error)
        });

    },
    checkPassenger(index){
      let _this=this;
      this.passengerVisible=true;
      this.currentIndex=index;
      var axios = require('axios');
      var data = JSON.stringify({
        "flightId": this.tickets[index].flightId,
        "flightDate": this.tickets[index].flightDate
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/getQuantity',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            _this.orderNum=response.data.result;
          }else{
            _this.orderNum='数据读取失败';
          }
        })
        .catch(function (error) {
          console.log(error);
          _this.orderNum='数据读取失败';
        });

      var axios1 = require('axios');
      var config1 = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/getPassenger',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios1(config1)
        .then(function (response) {
          if(response.data.code==1){
            _this.passengers=response.data.result;
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    cancelNew() {
      this.newVisible=false;
      },
    regTicket(){
      this.newVisible=false;
      var axios = require('axios');
      var data = JSON.stringify({
        "flightId": this.newFlight.flightId,
        "flightDate": this.newFlight.flightDate,
        "ticketRest": this.newTicket.ticketRest,
        "ticketPrice": this.newTicket.ticketPrice,
        "ticketType": this.newTicket.ticketType
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
      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            alert("注册成功");
          }else{
            alert("注册失败")
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("出现未知原因"+error)
        });
    },
    selectChanged(value){
      this.newFlight=this.flights.find(function (obj){if(obj.flightId==value){return obj;}})
    },
    deleteTicket(index){
      this.$confirm("确定要删除吗?","提示",{
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        var axios = require('axios');
        var data = JSON.stringify({
          "flightId": this.tickets[index].flightId,
          "flightDate": this.tickets[index].flightDate
        });
        var config = {
          method: 'post',
          url: '/Login-0.0.1-SNAPSHOT/deleteTicket',
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
              alert("删除成功");
              _this.searchByCity(_this.searchStartCity,_this.searchArriveCity,_this.searchDate);
            }
            else{
              alert("删除失败")
            }
          })
          .catch(function (error) {
            console.log(error);
            alert("发生未知错误"+error)
          });

      })
        .catch(() => {

});
    },
    initNew(){
      var axios = require('axios');
      var data = JSON.stringify({
        "startCity": this.searchStartCity,
        "arriveCity": this.searchArriveCity
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
          if (response.data.code==1){
            _this.flights=JSON.parse(JSON.stringify(response.data.result));

            _this.newVisible=true;
          }else{
            alert("请查询正确航线");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cancelModify(modifyIndex){
      this.modifyVisible=false;
      this.tickets[modifyIndex]=this.ticketBackup;
    },
    updateTicket(modifyIndex){
      this.modifyVisible=false;
      var axios = require('axios');
      var data = JSON.stringify({
        "flightId": this.editTicket.flightId,
        "flightDate": this.editTicket.flightDate,
        "ticketRest": this.editTicket.ticketRest,
        "ticketPrice": this.editTicket.ticketPrice,
        "ticketType": this.editTicket.ticketType
      });

      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/updateTicket',
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
            alert("更新成功!");

            _this.searchByCity(_this.searchStartCity,_this.searchArriveCity,_this.searchDate);
          }else{
            alert("更新失败");
            _this.tickets[modifyIndex]=_this.ticketBackup;
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("发生未知错误"+error);
          _this.tickets[modifyIndex]=_this.ticketBackup;
        });

    },
    modify(index){
      this.modifyIndex=index;
      this.editTicket=this.tickets[index];
      this.modifyVisible=true;
      this.ticketBackup=JSON.parse(JSON.stringify(this.tickets[this.modifyIndex]));
    },
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
    searchByCity(searchStartCity,searchArriveCity,date){

      date=new Date(date).Format('yyyy-MM-dd');
      var axios = require('axios');
      var data = JSON.stringify({
        "startCity": searchStartCity,
        "arriveCity": searchArriveCity,
        "flightDate": date
      });

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
            alert("查询到"+_this.tickets.length+"条相关记录")
            for(let i=0;i<_this.tickets.length;i++) {
              _this.tickets[i].isShow = true;
              if (_this.tickets[i].flights.tranCity == searchStartCity) {
                _this.tickets[i].flights.startCity = _this.tickets[i].flights.tranCity;
                _this.tickets[i].flights.startAirport = _this.tickets[i].flights.tranAirport;
                _this.tickets[i].flights.startTime = _this.tickets[i].flights.tranStartTime;
                _this.tickets[i].flights.startTimePlan = _this.tickets[i].flights.tranStartTimePlan;
                _this.tickets[i].flights.flightDate = _this.tickets[i].flights.tranStartDate;
                _this.tickets[i].flights.tranCity = undefined;
              }
              if (_this.tickets[i].flights.tranCity == searchArriveCity) {
                _this.tickets[i].flights.arriveCity = _this.tickets[i].flights.tranCity;
                _this.tickets[i].flights.arriveAirport = _this.tickets[i].flights.tranAirport;
                _this.tickets[i].flights.arriveTime = _this.tickets[i].flights.tranArriveTime;
                _this.tickets[i].flights.arriveTimePlan = _this.tickets[i].flights.tranArriveTimePlan;
                _this.tickets[i].flights.arriveDate = _this.tickets[i].flights.tranArriveDate;
                _this.tickets[i].flights.tranCity = undefined;
              }
            }
          }else{
            alert("未查询到相关结果");
            this.tickets.clear();
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  },

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
  width: 1200px;
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
.centerTable{
  text-align: center;
}
.table{
  width: 80%;
  margin:auto;
}



</style>
