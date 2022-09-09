<template>
  <div>
    <div class="midCard">
      <el-card style="width: 800px">
        <el-row>
          <el-col :span="12">
            <div style="color: #01a480;font-size: 20px">已出票</div>
          </el-col>
          <el-col :span="12">
            <div style="float: right">订单号:{{book.bookId}}</div>
            <div style="float: right">下单时间:{{book.bookTime}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top: -20px">
          <el-button type="primary" plain size="medium" @click="gotorefund()" style="float: left">我要退票</el-button>
        </el-row>
      </el-card>
    </div>
    <div class="midCard">
      <el-card style="width: 800px">
        <el-container>
          <el-header style="height: 50px;background-color: #f6f8fa;margin: -20px -20px 0px -20px">
            <el-col :span="5" style="font-size:20px;font-weight:bold;margin-top:-5px;margin-left: 0px">
              {{this.book.realStartCity}}<i class="el-icon-minus"></i>{{this.book.realArriveCity}}
            </el-col>
          </el-header>
          <div style="">
            <div>
              <el-image :src="require('../assets/img/airlines/'+book.flightId.slice(0,2)+'.png')" class="airlineLogo"></el-image><div style="font-size:16px;font-weight:bold;margin-top: -28px;margin-left: 40px">{{this.book.flightId}}</div>
            </div>
            <div style="font-size: 16px;margin: 10px 0">
              {{this.book.flightDate}}  {{getWeekDay(this.book.flightDate)}}
            </div>
            <div style="font-size: 16px;margin: 10px 0">
              {{this.book.realStartAirport}}<i class="el-icon-minus"></i>{{this.book.realArriveAirport}}
            </div >
            <div style="font-size: 16px;margin: 10px 0">
              起飞时间:{{this.book.realStartTime}} 抵达时间:{{this.book.realArriveTime}}
            </div>
          </div>
        </el-container>
      </el-card>
    </div>
    <div class="midCard">
      <el-card style="width: 800px">
        <el-container>
          <el-header style="height: 50px;background-color: #f6f8fa;margin: -20px -20px 0px -20px">
            <el-col :span="5" style="font-size:20px;font-weight:bold;margin-top:-5px;margin-left: 0px">
              出行人信息
            </el-col>
          </el-header>
          <ul>
            <li v-for="p in this.book.passenger">
              <div style="" >
                <div style="font-size: 16px;margin-left: -40px;margin-bottom: 10px">
                  姓名:{{p.name}}
                  身份证号:{{p.id }}
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
            <el-col :span="5" style="font-size:20px;font-weight:bold;margin-top:-5px;margin-left: 0px">
              联系信息
            </el-col>
          </el-header>
          <div style="margin-top: 10px">手机号:{{this.book.contactPhone}}</div>
        </el-container>
      </el-card>
    </div>
    <div class="midCard">
      <el-card style="width: 800px;margin-bottom: 40px">
        <el-container>
          <el-header style="height: 50px;background-color: #f6f8fa;margin: -20px -20px 0px -20px">
            <el-col :span="5" style="font-size:20px;font-weight:bold;margin-top:-5px;margin-left: 0px">
              支付费用
            </el-col>
          </el-header>
          <div style="margin-top: 10px">机票费:￥{{this.book.ticketPrice}} 机建费:￥{{this.book.ticketConstruct}} 燃油费:￥{{this.book.ticketOil}}  </div>
          <div style="margin-left: 260px">×{{this.book.passenger.length}}</div>
          <div style="margin-top: 10px">共支付:￥{{this.book.totalPrice}}</div>
        </el-container>
      </el-card>
    </div>
  </div>

</template>

<script>
import refund from "./refund";
import book from "./book";

export default {
  name: "bookDetail",
  created() {
    let data=this.$route.params.book;
    if(data!=null){
      this.book=JSON.parse(data);
    }else
    {
      this.$router.push('/404');
    }
    this.newbook=JSON.stringify(this.book);
  },
  data(){
    return{
      book:{

      },
      newbook:{

      }
    };
  },
  methods:{
    getWeekDay(date){
      var a = new Array("日", "一", "二", "三", "四", "五", "六");
      var week = new Date(date).getDay();
      return "周"+ a[week];
    },
    gotorefund(){
      this.$router.push({
        path:'/refund',
        query:{
          book:this.newbook
        }
      })
    }
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
