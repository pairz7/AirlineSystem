<template>
  <div>
    <div class="midCard">
      <el-card style="width: 800px">
        <el-container>
          <el-header style="height: 50px;background-color: #f6f8fa;margin: -20px -20px 0px -20px;">
            <el-col :span="5" style="font-size:20px;font-weight:bold;margin-top:-5px;margin-left: 0px">
              选择退票原因
            </el-col>
          </el-header>
          <div style="margin-top: 10px;margin-bottom: 5px;">
            <el-radio v-model="reasonRadio" :label="0">{{reason[0]}}</el-radio>
          </div>
          <div style="margin-bottom: 5px">
            <el-radio v-model="reasonRadio" :label="1">{{reason[1]}}</el-radio>
          </div>
          <div>
            <el-radio v-model="reasonRadio" :label="2">{{reason[2]}}</el-radio>
          </div>
        </el-container>
      </el-card>
    </div>
    <div class="midCard">
      <el-card style="width: 800px">
        <el-container>
          <el-header style="height: 50px;background-color: #f6f8fa;margin: -20px -20px 0px -20px">
            <el-col :span="5" style="font-size:20px;font-weight:bold;margin-top:-5px;margin-left: 0px">
              确定退订产品
            </el-col>
          </el-header>
          <ul style="min-height: 50px">
            <li v-for="p in this.book.passenger">
              <div style="" >
                <div style="font-size: 16px;font-weight: bold;margin-left: -40px;margin-bottom: 10px">
                  乘客:{{p.name}}
                </div>
                <div style="font-size: 14px;margin-left: -40px;margin-bottom: 10px">
                  {{book.flightDate}} {{book.realStartCity}}-{{book.realArriveCity}}
                </div>
              </div>
            </li>
          </ul>

        </el-container>
      </el-card>
    </div>
    <div class="midCard">
      <el-card style="width: 800px;">
        <el-container>
          <el-header style="height: 50px;background-color: #f6f8fa;margin: -20px -20px 0px -20px">
            <el-col :span="5" style="font-size:20px;font-weight:bold;margin-top: -5px;margin-left: 0px">
              确认联系方式
            </el-col>
          </el-header>
          <div style="margin-top: 10px">手机号:
            <el-input size="mini" style="width: 200px;margin-left: 10px" v-model="book.contactPhone"></el-input></div>
        </el-container>
      </el-card>
    </div>
    <div class="midCard">
      <el-card style="width: 800px;margin-bottom: 40px">
        <el-container>
          <el-header style="height: 50px;background-color: #f6f8fa;margin: -20px -20px 0px -20px">
            <el-col :span="5" style="font-size:20px;font-weight:bold;margin-top: -5px;margin-left: 0px">
              退款明细
            </el-col>
          </el-header>
          <div style="font-weight: bold;font-size: 14px;margin-top: 10px">需退产品</div>
          <div style="margin-top: 6px">机票费:￥{{this.book.ticketPrice}} 机建费:￥{{this.book.ticketConstruct}} 燃油费:￥{{this.book.ticketOil}}  </div>
          <div style="margin-left: 260px">×{{this.book.passenger.length}}</div>
          <div style="margin-top: 6px">总金额:￥{{this.book.totalPrice}}</div>
          <div style="font-weight: bold;font-size: 14px;margin-top: 14px">扣款项</div>
          <div style="margin-top: 6px">退票手续费:￥{{refundFee}}</div>
          <div style="margin-top: 6px">备注: {{extra}}</div>
          <div style="font-weight: bold;font-size: 16px;margin-top: 10px">预计退款:￥{{finalRefund}}</div>
        </el-container>
      </el-card>
    </div>
    <div class="midCard">
      <el-button type="primary" style="width: 800px;margin-top: -30px;margin-bottom: 30px" @click="submitRefund()">提交退票</el-button>
    </div>
  </div>

</template>

<script>

export default {
  name: "refund",
  computed:{
    refundFee(){
      if(this.reasonRadio=='0'){
        return (this.book.totalPrice*this.refundRatio).toFixed(1);
      }else {
        return 0;
      }
    },
    extra(){
      if(this.reasonRadio=='0'){
        return "自愿退票按照航空公司退票政策收取"+this.refundRatio*100+"%手续费";
      }else if(this.reasonRadio=='1'){
        return "航班取消或延误30分钟以上不收取手续费";
      }else if(this.reasonRadio=='2'){
        return "疫情防控政策变化不收取手续费"
      }else{
        return "";
      }
    },
    finalRefund(){
      return this.book.totalPrice-this.refundFee;
    }
  },
  created() {
    let data=this.$route.query.book;
    if(data!=null){
      this.book=JSON.parse(data);
    }else
    {
      this.$router.push('/404');
    }
  },
  data(){
    return{
      refundRatio:0.4,
      reasonRadio:'',
      reason:[
        '自愿退票','航班取消或延误30分钟以上','疫情防控政策变化'
      ],
      book:{
        "bookId": "BK763471021277065216",
        "flightId": "ZH2210",
        "flightDate": "2022-09-08",
        "bookTime": "2022-09-03 16:02:21 ",
        "userName": "wang",
        "realStartCity": "上海",
        "realStartAirport": "上海虹桥机场",
        "realArriveCity": "南宁",
        "realArriveAirport": "南宁吴圩机场",
        "realStartTime": "16:27",
        "realArriveTime": "19:27",
        "realTranCity": "长沙",
        "ticketPrice": 1234,
        "ticketConstruct": 23,
        "ticketOil": 89,
        "totalPrice": 8888,
        "contactPhone": "31327129821",
        "passengers": null,
        "passenger": [
          {
            "id": "2374023472304",
            "name": "wang"
          },

        ]
      },
    };
  },
  methods:{
    submitRefund(){
      if(this.reasonRadio==''&&this.reasonRadio!='0'){
        alert("请选择退票原因");
        return;
      }
      var axios = require('axios');
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/deleteBook?bookId='+this.book.bookId,
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)'
        }
      };
      let _this=this;
      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            alert("退票成功!");

          }else{
            alert("退票失败")
          }
          _this.$router.push('/OrderInfo');
        })
        .catch(function (error) {
          console.log(error);
          alert("发生未知错误");
          _this.$router.push('/OrderInfo');
        });


    },
    getWeekDay(date){
      var a = new Array("日", "一", "二", "三", "四", "五", "六");
      var week = new Date(date).getDay();
      return "周"+ a[week];
    },
  }
}
</script>

<style scoped>
.midCard{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
.airlineLogo{
  height: 32px;
  width: 32px;
  padding: 5px;
  margin-top: 10px;
}
</style>
