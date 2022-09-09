<template>
  <el-container>
    <el-main>
      <div class="midCard">
        <el-card class="bookCard">
          <div style="font-size: 16px;">
            乘机人
            <el-button type="text" style="float: right;margin-top: -10px"@click="goBack()" >< 返回修改</el-button>
          </div>
          <ul style="margin-left: -45px">
            <li v-for="(passenger,index) in passengers">
              <div class="passengerCard">
                <el-col :span="6" style="text-align: left;padding-left: 15px;padding-top: 10px;font-size: 26px;font-weight: bold;color: #99a9bf">
                  {{index+1}}
                </el-col>
                <el-col :span="2" style="margin-top: 18px;margin-right: 10px">
                  <div style="margin-bottom: 26px">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</div>
                  <div style="margin-bottom: 25px">身份证号</div>
                  <div>手机号码</div>
                </el-col>
                <el-col :span="8">
                  <el-input class="psInput" size="small" placeholder="姓名" v-model="passenger.name" disabled></el-input>
                  <br>
                  <el-input class="psInput" size="small" placeholder="身份证号" v-model="passenger.id" disabled></el-input>
                  <br>
                  <el-input class="psInput" size="small" placeholder="未填写" v-model="passenger.phone" disabled></el-input>
                </el-col>
              </div>
            </li>
          </ul>
        </el-card>
      </div>
      <div class="midCard">
        <el-card class="phoneCard">
          <div style="font-size: 16px;font-weight: bold">
            联系人
          </div>
          手机号<el-input class="psInput" size="small" v-model="bookInfo.phone" placeholder="手机号,接收航变信息" style="margin-left: 10px;width: 270px;margin-right: 20px" disabled></el-input>
          Email<el-input class="psInput" size="small" placeholder="未填写" v-model="bookInfo.email" style="margin-left: 10px;width: 270px" disabled></el-input>
        </el-card>
      </div>
      <div class="midCard">
        <el-button type="warning" style="width: 750px;margin-bottom: 20px;height: 50px" @click="centerDialogVisible=true">支付</el-button>
      </div>
      <el-dialog
        style="height: 600px"
        title="请使用微信支付"
        :visible.sync="centerDialogVisible"
        width="300px"
        center>
        <el-image :src="require('../assets/img/qrcode/paycode.png')" style="width: 200px;margin-left: 25px"></el-image>
        <div style="text-align: center;font-size: 18px">{{this.totalFee}}元</div>
        <el-button @click="centerDialogVisible = false" style="margin-left: 10px;margin-top: 20px;margin-bottom: 30px">未支付</el-button>
        <el-button type="primary" @click="submitOrder()" style="margin-left: 20px;margin-top: 20px;margin-bottom: 30px">已支付完成</el-button>
      </el-dialog>
    </el-main>
    <el-aside width="400px;">
      <bookSideCard ref="sideCard" :bookPassengers="passengers" :bookTicket="bookInfo.ticket" style="margin-top: 15px;margin-right: 20px"></bookSideCard>
    </el-aside>
  </el-container>
</template>

<script>
import axios from "axios";
import bookSideCard from "@/components/bookSideCard";

export default {
  name: "submitBook",
  components:{bookSideCard},
  beforeUpdate() {
    this.saveInfo();
  },
  watch:{
    "$store.state.userInfo.isLogin":{
      immediate:true,
      handler(isLogin){
        if(!isLogin){
          this.$router.push('/');
        }
      }
    },
  },
  created() {
    let bookInfoData=this.$route.params.bookInfo;
    if(bookInfoData!=null)this.bookInfo=JSON.parse(bookInfoData);
    let passengerData=this.$route.params.passengers;
    if(passengerData!=null)
    {this.passengers=JSON.parse(passengerData);return;}
    let NbookInfoData=localStorage.getItem('PayBookInfo');
    if(NbookInfoData!=null)this.bookInfo=JSON.parse(NbookInfoData);
    let NpassengerData=localStorage.getItem('PayPassengers');
    if(NpassengerData!=null)this.passengers=JSON.parse(NpassengerData);
  },
  mounted() {
    this.totalFee=this.$refs.sideCard.totalFee;
  },
  beforeRouteLeave :function (to,from,next){
    this.saveInfo();
    next();
  },
  methods:{
    saveInfo(){
      localStorage.setItem('PayPassengers',JSON.stringify(this.passengers));
      localStorage.setItem('PayBookInfo',JSON.stringify(this.bookInfo));
    },
    goBack(){
      this.$router.push({
        name:'book',
        params:{
          ticket:JSON.stringify(this.bookInfo.ticket),
          passengers:JSON.stringify(this.passengers),
          bookInfo:JSON.stringify(this.bookInfo)
        }
      });
    },
    submitOrder(){
      let flag=true;
      var axios = require('axios');
      var data = JSON.stringify({
        "flightId": this.bookInfo.ticket.flightId,
        "flightDate": this.bookInfo.ticket.flightDate,
        "userName": this.$store.state.userInfo.name,
        "realStartCity": this.bookInfo.ticket.realStart,
        "realStartAirport": this.bookInfo.ticket.realStartAirport,
        "realStartTime": this.bookInfo.ticket.realStartTime,
        "realArriveCity": this.bookInfo.ticket.realArrive,
        "realArriveAirport": this.bookInfo.ticket.realArriveAirport,
        "realArriveTime": this.bookInfo.ticket.realArriveTime,
        "realTranCity": this.bookInfo.ticket.realTranCity,
        "ticketPrice": this.bookInfo.ticket.ticketPrice,
        "ticketConstruct": this.$refs.sideCard.globalInfo.airportFee,
        "ticketOil": this.$refs.sideCard.globalInfo.oilFee,
        "totalPrice": this.$refs.sideCard.totalFee,
        "contactPhone": this.bookInfo.phone,
        "passengers": JSON.stringify(this.passengers)
      });

      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/addBook',
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
            alert("订票成功")
            _this.$router.push('/OrderInfo');
          }else{
            alert("订票失败")
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("发生未知错误")
        });

    }

  },
  data(){
    return{
      centerDialogVisible: false,
      totalFee:0,
      passengers:[
        {
          name:'qzz',
          id:'122',
          phone:'',
          class:'成人'
        }
      ],
      bookInfo:{
        phone:'',
        email:'',
        username:'',
        ticket:{
        }
      },
    };
  }
}
</script>

<style scoped>
.bookCard{
  width: 750px;
  min-height: 100px;
  margin-bottom: 10px;
}
.phoneCard{
  width: 750px;
  min-height: 100px;
  margin-bottom: 10px;
}
.midCard{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
.passengerCard{
  position: relative;
  text-align: center;
  width: 715px;
  min-height: 140px;
  min-height: 150px;
  border-style: solid;
  border-radius: 6px;
  border-width: 2px;
  border-color: #eeeeee;
  margin-bottom: 10px;
}
.psInput{
  width: 300px;
  margin-top: 12px;
}

</style>
