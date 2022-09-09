<template>
  <el-container>
    <adminMenu></adminMenu>
    <el-main>
      <div style="margin-top: 20px;margin-left: 12px;font-size: 24px;margin-bottom: 20px">
        航班管理
      </div>
      <div style="margin-top: 10px;margin-left: 10px">
        <el-date-picker
          size="medium"
          style="width: 200px"
          v-model="searchDate"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
        <el-input size="medium" v-model="searchId" style="width: 300px" placeholder="输入航班号查询">
          <el-button slot="append" icon="el-icon-search" @click="searchById(searchId,searchDate)"></el-button>
        </el-input>
        <span style="margin-left: 20px">或者</span>
        <el-input size="medium" style="width: 160px;margin-left: 20px" v-model="searchStartCity" placeholder="输入起飞城市">
        </el-input>
        <el-input size="medium" style="width: 200px" placeholder="输入抵达城市" v-model="searchArriveCity">
        <el-button slot="append" icon="el-icon-search" @click="searchByCity(searchStartCity,searchArriveCity)"></el-button>
        </el-input>
        <el-button type="text" style="float:right;margin-right: 50px" @click="newFormVisible=true">新增航班</el-button>
        <el-dialog :title="newFlight.flight.flightName+newFlight.flight.flightId" :visible.sync="newFormVisible" :close-on-click-modal="false">
          <el-form style="margin-left: 20px" :rules="rules" ref="newFlight" :model="newFlight.flight">
            <el-row>
              <el-col :span="10">
                <el-form-item label="航班号" prop="flightId">
                  <el-input v-model="newFlight.flight.flightId" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="航空公司" prop="flightName">
                  <el-input v-model="newFlight.flight.flightName" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="出发城市" prop="startCity">
                  <el-input v-model="newFlight.flight.startCity" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="出发机场" prop="startAirport">
                  <el-input v-model="newFlight.flight.startAirport" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="到达城市" prop="arriveCity">
                  <el-input v-model="newFlight.flight.arriveCity" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="到达机场" prop="arriveAirport">
                  <el-input v-model="newFlight.flight.arriveAirport" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="出发日期" prop="flightDate">
                  <el-date-picker
                    style="width: 200px"
                    v-model="newFlight.flight.flightDate"
                    type="date"
                    placeholder="选择日期" >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="到达日期" prop="arriveDate">
                  <el-date-picker
                    style="width: 200px"
                    v-model="newFlight.flight.arriveDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="计划起飞时间" prop="startTimePlan">
                  <el-time-select
                    style="width: 172px"
                    v-model="newFlight.flight.startTimePlan"
                    :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00'
  }"
                    placeholder="选择时间">
                  </el-time-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="计划抵达时间" prop="arriveTimePlan">
                  <el-time-select
                    style="width: 172px"
                    v-model="newFlight.flight.arriveTimePlan"
                    :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:newFlight.flight.startTimePlan
  }"
                    placeholder="选择时间">
                  </el-time-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="实际起飞时间" prop="startTime">
                  <el-time-select
                    style="width: 172px"
                    v-model="newFlight.flight.startTime"
                    :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00'
  }"
                    placeholder="选择时间">
                  </el-time-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="实际抵达时间" prop="arriveTime">
                  <el-time-select
                    style="width: 172px"
                    v-model="newFlight.flight.arriveTime"
                    :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:newFlight.flight.startTime
  }"
                    placeholder="选择时间">
                  </el-time-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item label="执飞机型" prop="flightType">
                  <el-select placeholder="请选择" v-model="newFlight.flight.flightType">
                    <el-option v-for="item in aircraft" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="航班状态" prop="flightPlan">
                  <el-select placeholder="请选择" v-model="newFlight.flight.flightPlan">
                    <el-option label="航班计划" value="航班计划"></el-option>
                    <el-option label="航班延误" value="航班延误"></el-option>
                    <el-option label="航班取消" value="航班取消"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-checkbox v-model="isNewTran" style="margin-bottom: 10px">是否经停</el-checkbox>
            </el-row>
            <div v-if="isNewTran">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="经停城市" prop="tranCity">
                    <el-input v-model="newFlight.flight.tranCity" style="width: 200px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="经停机场" prop="tranAirport">
                    <el-input v-model="newFlight.flight.tranAirport" style="width: 200px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="经停出发日期" prop="tranStartDate">
                    <el-date-picker
                      style="width: 200px"
                      v-model="newFlight.flight.tranStartDate"
                      type="date"
                      placeholder="选择日期" >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="经停到达日期" prop="tranArriveDate">
                    <el-date-picker
                      style="width: 200px"
                      v-model="newFlight.flight.tranArriveDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="经停计划起飞时间" prop="tranStartTimePlan">
                    <el-time-select
                      style="width: 172px"
                      v-model="newFlight.flight.tranStartTimePlan"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:newFlight.flight.tranArriveTimePlan
  }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="经停计划抵达时间" prop="tranArriveTimePlan">
                    <el-time-select
                      style="width: 172px"
                      v-model="newFlight.flight.tranArriveTimePlan"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:newFlight.flight.startTimePlan
  }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="经停实际起飞时间" prop="tranStartTime">
                    <el-time-select
                      style="width: 172px"
                      v-model="newFlight.flight.tranStartTime"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:newFlight.flight.tranArriveTime
  }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="经停实际抵达时间" prop="tranArriveTime">
                    <el-time-select
                      style="width: 172px"
                      v-model="newFlight.flight.arriveTime"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:newFlight.flight.startTime
  }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>

          </el-form>
          <div slot="footer" style="margin-top: -35px">
            <el-button @click="cancelNew()">取 消</el-button>
            <el-button type="primary" @click="submitNewFlight()" style="margin-right: 15px">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <ul v-if="flights.length>0">
        <li v-for="(flight,index) in flights">
          <div class="midbox">
            <el-card class="box-card">
              <el-row>
                <div class="flightText" v-if="flight.flightId!=''">
                  <el-image :src="require('../assets/img/airlines/'+flight.flightId.slice(0,2)+'.png')" class="airlineLogo"></el-image>{{flight.flightName}}{{flight.flightId}}
                </div>
                <div class="flightPlan plan" v-if="flight.flightPlan=='航班计划'||flight.flightPlan=='航班起飞'">{{flight.flightPlan}}</div>
                <div class="flightPlan delay" v-if="flight.flightPlan=='航班延误'">{{flight.flightPlan}}</div>
                <div class="flightPlan cancel" v-if="flight.flightPlan=='航班取消'">{{flight.flightPlan}}</div>
              </el-row>
              <el-row style="margin-top: 10px">
                <div class="default leftText">{{flight.startCity}}</div>
                <div class="default rightText">{{flight.arriveCity}}</div>
              </el-row>
              <el-row style="margin-top: 2px;font-size: 14px">
                <div class="leftText">预计{{getDate(flight.flightDate)}}</div>
                <div class="rightText">预计{{getDate(flight.arriveDate)}}</div>
              </el-row>
              <el-row style="padding-bottom: 20px">
                <el-row gutter="160">
                  <el-col :span="5" class="timeText">{{flight.startTime}}</el-col>
                  <el-col :span="12">
                    <el-image :src="url.flyto" class="flytoImg"></el-image>
                    <div v-if="flight.tranCity!=null&&flight.tranCity!=''">
                      <el-popover
                        placement="bottom"
                        :title="'经停 '+flight.tranCity"
                        width="350"
                        trigger="hover"
                        class="city-logo"
                      >
                        <div>{{flight.tranAirport}}</div>
                        <el-row>
                          <div class="leftText">计划{{getDate(flight.tranArriveDate)}} {{flight.tranArriveTimePlan}}到达</div>
                          <div class="rightText">计划{{getDate(flight.tranStartDate)}} {{flight.tranStartTimePlan}}起飞</div>
                        </el-row>
                        <el-row>
                          <div class="leftText">预计{{ flight.tranArriveTime }}到达</div>
                          <div class="rightText">预计{{ flight.tranStartTime }}起飞</div>
                        </el-row>
                        <span slot="reference">经停</span>
                      </el-popover>
                      <div class="tranCity" >{{ flight.tranCity }}</div>
                    </div>
                  </el-col>
                  <el-col :span="5" class="timeText">{{flight.arriveTime}}</el-col>
                </el-row>
                <el-row style="margin-top: 1px;font-size: 14px">
                  <div class="leftText">原计划{{flight.startTimePlan}}</div>
                  <div class="rightText">原计划{{flight.arriveTimePlan}}</div>
                </el-row>
              </el-row>
              <el-col :span="24" >
                <el-button type="text" style="float: right;margin-left: 10px" size="medium" @click="deleteFlight(index)">删除</el-button>
                <el-button type="text" style="float: right;" size="medium" @click="initEditDialog(index)">修改</el-button>
              </el-col>
            </el-card>
          </div>
          <el-dialog :title="editFlight.flight.flightName+editFlight.flight.flightId" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
            <el-form style="margin-left: 20px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="出发城市">
                    <el-input v-model="editFlight.flight.startCity" style="width: 200px"></el-input>
                  </el-form-item>
                  <el-form-item label="出发机场">
                    <el-input v-model="editFlight.flight.startAirport" style="width: 200px"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="到达城市">
                    <el-input v-model="editFlight.flight.arriveCity" style="width: 200px"></el-input>
                  </el-form-item>
                  <el-form-item label="到达机场">
                    <el-input v-model="editFlight.flight.arriveAirport" style="width: 200px"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="出发日期">
                    <el-date-picker
                      style="width: 200px"
                      v-model="editFlight.flight.flightDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="到达日期">
                    <el-date-picker
                      style="width: 200px"
                      v-model="editFlight.flight.arriveDate"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="计划起飞时间">
                    <el-time-select
                      style="width: 172px"
                      v-model="editFlight.flight.startTimePlan"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00'
  }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="计划抵达时间">
                    <el-time-select
                      style="width: 172px"
                      v-model="editFlight.flight.arriveTimePlan"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:editFlight.flight.startTimePlan
  }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="实际起飞时间">
                    <el-time-select
                      style="width: 172px"
                      v-model="editFlight.flight.startTime"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00'
  }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="实际抵达时间">
                    <el-time-select
                      style="width: 172px"
                      v-model="editFlight.flight.arriveTime"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:editFlight.flight.startTime
  }"
                      placeholder="选择时间">
                    </el-time-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="执飞机型">
                    <el-select placeholder="请选择" v-model="editFlight.flight.flightType">
                      <el-option v-for="(item,index) in aircraft" :value="item.value" :label="item.label" :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="航班状态">
                    <el-select placeholder="请选择" v-model="editFlight.flight.flightPlan">
                      <el-option label="航班计划" value="航班计划"></el-option>
                      <el-option label="航班延误" value="航班延误"></el-option>
                      <el-option label="航班取消" value="航班取消"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-checkbox v-model="isEditTran">是否经停</el-checkbox>
              </el-row>
              <div v-if="isEditTran">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="经停城市" prop="tranCity">
                      <el-input v-model="editFlight.flight.tranCity" style="width: 200px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="经停机场" prop="tranAirport">
                      <el-input v-model="editFlight.flight.tranAirport" style="width: 200px"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="经停出发日期" prop="tranStartDate">
                      <el-date-picker
                        style="width: 200px"
                        v-model="editFlight.flight.tranStartDate"
                        type="date"
                        placeholder="选择日期" >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="经停到达日期" prop="tranArriveDate">
                      <el-date-picker
                        style="width: 200px"
                        v-model="editFlight.flight.tranArriveDate"
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="经停计划起飞时间" prop="tranStartTimePlan">
                      <el-time-select
                        style="width: 172px"
                        v-model="editFlight.flight.tranStartTimePlan"
                        :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:editFlight.flight.tranArriveTimePlan
  }"
                        placeholder="选择时间">
                      </el-time-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="经停计划抵达时间" prop="tranArriveTimePlan">
                      <el-time-select
                        style="width: 172px"
                        v-model="editFlight.flight.tranArriveTimePlan"
                        :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:editFlight.flight.startTimePlan
  }"
                        placeholder="选择时间">
                      </el-time-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="经停实际起飞时间" prop="tranStartTime">
                      <el-time-select
                        style="width: 172px"
                        v-model="editFlight.flight.tranStartTime"
                        :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:editFlight.flight.tranArriveTime
  }"
                        placeholder="选择时间">
                      </el-time-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="经停实际抵达时间" prop="tranArriveTime">
                      <el-time-select
                        style="width: 172px"
                        v-model="editFlight.flight.tranArriveTime"
                        :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '24:00',
                  minTime:newFlight.flight.startTime
  }"
                        placeholder="选择时间">
                      </el-time-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

            </el-form>
            <div slot="footer" style="margin-top: -35px">
              <el-button @click="cancelEdit(editFlight.index)">取 消</el-button>
              <el-button type="primary" @click="updateFlight(editFlight.index)" style="margin-right: 15px">确 定</el-button>
            </div>
          </el-dialog>
        </li>
      </ul>
      <div style="font-size: 20px;text-align: center;font-weight: bold;margin-top: 200px" v-else>请先进行查询!</div>
    </el-main>
  </el-container>



</template>

<script>
import adminMenu from "../components/admin/adminMenu";
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
  name: "admin",
  components:{adminMenu},
  methods:{
    searchById(id,date){
      date=new Date(date).Format('yyyy-MM-dd');
      var axios = require('axios');
      var data = JSON.stringify({
        "flightId": id,
        "flightDate": date
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/getFlightById',
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
            _this.flights=response.data.result;
            alert("共查询到"+_this.flights.length+"条相关记录");
          }else{
            alert("未查询到相关结果")
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("出现未知错误");
        });
    },
    searchByCity(startCity,arriveCity){
      var axios = require('axios');
      var data = JSON.stringify({
        "startCity": startCity,
        "arriveCity": arriveCity
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
          if(response.data.code==1){
            _this.flights=response.data.result;
            alert("共查询到"+_this.flights.length+"条相关记录");
          }else{
            alert("未查询到相关结果")
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("出现未知错误");
        });
    },
    submitNewFlight(){
      this.$refs['newFlight'].validate((valid) => {
        if (valid) {
          this.newFlight.flight.flightDate=new Date(this.newFlight.flight.flightDate).Format('yyyy-MM-dd');
          this.newFlight.flight.arriveDate=new Date(this.newFlight.flight.arriveDate).Format('yyyy-MM-dd');
          this.newFlight.flight.tranStartDate=new Date(this.newFlight.flight.tranStartDate).Format('yyyy-MM-dd');
          this.newFlight.flight.tranArriveDate=new Date(this.newFlight.flight.tranArriveDate).Format('yyyy-MM-dd');
          this.newFormVisible=false;
          var axios = require('axios');
          var data = JSON.stringify(this.newFlight.flight);
          var config = {
            method: 'post',
            url: '/Login-0.0.1-SNAPSHOT/addFlight',
            headers: {
              'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
              'Content-Type': 'application/json'
            },
            data : data
          };
          axios(config)
            .then(function (response) {
              if(response.data.code==1){
                alert("新增成功");
              }else{
                alert("新增失败");
              }
            })
            .catch(function (error) {
              console.log(error);
              alert("出现未知错误:"+error);
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    cancelNew(){
      this.newFormVisible = false;
      this.newFlight.flight={
        flightId:'',//航班号
          flightName:"",//航空公司
          flightType:"",//执飞机型
          startCity:"",//起飞城市
          startAirport:"",//起飞机场
          startTime:'',//实际起飞时间
          startTimePlan:'',//计划起飞时间
          arriveCity:"",
          arriveAirport:"",
          arriveTime:"",
          arriveTimePlan:"",
          arriveDate:"",//到达日期
          flightDate:"",//执飞日期
          flightPlan:""//航班状态
      };
    },
    cancelEdit(index){
      this.flights[index]=this.editFlight.backupFlight;
      this.dialogFormVisible = false
    },
    initEditDialog(index){
      this.dialogFormVisible = true;
      this.editFlight.flight=this.flights[index];
      this.editFlight.index=index;
      this.editFlight.backupFlight=JSON.parse(JSON.stringify(this.flights[index]));
      this.isEditTran=(this.flights[index].tranCity!=null)
    },
    getDate(date){
      let d=new Date(date);
      return d.Format("MM/dd");
    },
    updateFlight(index){
      this.dialogFormVisible = false;
      var axios = require('axios');
      this.flights[index].flightDate=new Date(this.flights[index].flightDate).Format('yyyy-MM-dd');
      this.flights[index].arriveDate=new Date(this.flights[index].arriveDate).Format('yyyy-MM-dd');
      this.flights[index].tranArriveDate=new Date(this.flights[index].tranArriveDate).Format('yyyy-MM-dd');
      this.flights[index].tranStartDate=new Date(this.flights[index].tranStartDate).Format('yyyy-MM-dd');
      var data = JSON.stringify(this.flights[index]);
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/updateFlight',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            alert("修改成功");

          }else{
            alert("修改失败");
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("修改失败");
        });
    },
    deleteFlight(index){
      this.$confirm('确定要删除此航班?', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var axios = require('axios');
        var data = JSON.stringify({
          flightId: this.flights[index].flightId,
          flightDate: this.flights[index].flightDate
        });
        var config = {
          method: 'post',
          url: '/Login-0.0.1-SNAPSHOT/deleteFlight',
          headers: {
            'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios(config)
          .then(function (response) {
            if(response.data.code==1){
              alert("删除成功");
              this.flights.slice(index,1);
            }else{
              alert("删除失败");
            }
          })
          .catch(function (error) {
            console.log(error);
            alert("删除失败");
          });
      }).catch(() => {

      });

    }
  },
  data(){
    return{
      isNewTran:false,
      isEditTran:false,
      searchDate:'',
      searchId:'',
      searchStartCity:'',
      searchArriveCity:'',
      aircraft:[
        {
          value: '空客320',
          label:'空客320',
          type:'中型机'
        },
        {
          value:'空客330',
          label:'空客330',
          type: '大型机'
        },
        {
          value: '空客380',
          label: '空客380',
          type: '大型机'
        },
        {
          value:'波音738',
          label:'波音738',
          type: '中型机'
        },
        {
          value: '波音777',
          label: '波音777',
          type: '大型机'
        },
        {
          value: '波音747',
          label: '波音747',
          type: '大型机'
        }
      ],
      newFlight:{
        flight: {
          flightId:'',//航班号
          flightName:"",//航空公司
          flightType:"",//执飞机型
          startCity:"",//起飞城市
          startAirport:"",//起飞机场
          startTime:'',//实际起飞时间
          startTimePlan:'',//计划起飞时间
          arriveCity:"",
          arriveAirport:"",
          arriveTime:"",
          arriveTimePlan:"",
          arriveDate:"",//到达日期
          flightDate:"",//执飞日期
          flightPlan:""//航班状态
        }
      },
      editFlight:{
        index:0,
        flight:{
          flightId:'SC7969',//航班号
          flightName:"山东航空",//航空公司
          flightType:"波音738",//执飞机型
          startCity:"济南",//起飞城市
          startAirport:"济南遥墙机场",//起飞机场
          startTime:'',//实际起飞时间
          startTimePlan:'',//计划起飞时间
          arriveCity:"南宁",
          arriveAirport:"南宁吴圩机场",
          arriveTime:"10:05",
          arriveTimePlan:"10:05",
          arriveDate:"2022-09-03",//到达日期
          flightDate:"2022-09-03",//执飞日期
          flightPlan:"航班计划"//航班状态
        }
      },
      dialogFormVisible: false,
      newFormVisible:false,
      flights:[
      ],
      url:{
        flyto:require("../assets/img/component/fly.png"),
      },
      rules:{
        flightId:[{required:true,message:'此项为必填项',trigger:'blur'},],//航班号
        flightName:[{required:true,message:'此项为必填项',trigger:'blur'},],//航空公司
        flightType:[{required:true,message:'此项为必填项',trigger:'blur'},],//执飞机型
        startCity:[{required:true,message:'此项为必填项',trigger:'blur'},],//起飞城市
        startAirport:[{required:true,message:'此项为必填项',trigger:'blur'},],//起飞机场
        startTime:[{required:true,message:'此项为必填项',trigger:'blur'},],//实际起飞时间
        startTimePlan:[{required:true,message:'此项为必填项',trigger:'blur'},],//计划起飞时间
        arriveCity:[{required:true,message:'此项为必填项',trigger:'blur'},],
        arriveAirport:[{required:true,message:'此项为必填项',trigger:'blur'},],
        arriveTime:[{required:true,message:'此项为必填项',trigger:'blur'},],
        arriveTimePlan:[{required:true,message:'此项为必填项',trigger:'blur'},],
        arriveDate:[{required:true,message:'此项为必填项',trigger:'blur'},],//到达日期
        flightDate:[{required:true,message:'此项为必填项',trigger:'blur'},],//执飞日期
        flightPlan:[{required:true,message:'此项为必填项',trigger:'blur'},],//航班状态
        tranCity:[{required:true,message:'此项为必填项',trigger:'blur'},],//航班状态
        tranAirport:[{required:true,message:'此项为必填项',trigger:'blur'},],//航班状态
        tranStartDate:[{required:true,message:'此项为必填项',trigger:'blur'},],//航班状态
        tranStartTimePlan:[{required:true,message:'此项为必填项',trigger:'blur'},],//航班状态
        tranStartTime:[{required:true,message:'此项为必填项',trigger:'blur'},],//航班状态
        tranArriveTime:[{required:true,message:'此项为必填项',trigger:'blur'},],//航班状态
        tranArriveTimePlan:[{required:true,message:'此项为必填项',trigger:'blur'},]//航班状态
      }
    };
  }
}
</script>


<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
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
  margin-top: 20px;
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
.flightPlan{
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
