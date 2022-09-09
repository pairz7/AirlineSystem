<template>
  <el-tabs type="border-card" style="min-height: 700px">
    <el-tab-pane>
      <span slot="label"><i class="el-icon-date"></i> 全部订单</span>
      <ul>
        <li v-for="(book,index) in books" class="midCard" >
          <el-card style="width: 1000px" >
            <div style="background-color: #eeeeee;height: 30px;margin: -20px -20px 10px;" >
              <el-row style="height: 12px;font-size: 11px;">
                <el-col :span="6" style="margin-left: 18px;margin-top: 5px" >
                  订单号:{{book.bookId}}
                </el-col>
                <el-col :span="4" style="margin-top: 5px;margin-left: -50px">
                  预定日期:{{book.bookTime}}
                </el-col>
                <el-col :span="13" style="margin-top: 5px;margin-left: 6px">
                  <el-button size="mini" type="text" style="margin-top: -6px">删除订单</el-button>
                </el-col>
              </el-row>
            </div>
            <el-row style="margin-bottom: -10px">
              <el-col :span="7">
                <div style="font-size: 16px;margin-bottom: 2px">
                  {{book.realStartCity}}<i class="el-icon-minus"></i>{{book.realArriveCity}}
                </div>
                <div style="margin-bottom: 2px">
                  出发日期:{{book.flightDate}}   {{book.realStartTime}}到{{book.realArriveTime}} {{book.flightId}}
                </div>
                <div>
                  出行人: <span v-for="person in book.passenger">{{person.name}} </span>
                </div>
              </el-col>
              <el-col :span="1" style="float: right;font-size: 20px;margin-right: 16px;color: #ffa400">
                ￥{{book.totalPrice}}
              </el-col>
            </el-row>
            <el-row>
              <el-button size="mini" type="primary" style="float: right;margin-top: 10px" @click="jumpRefund(index)">退票</el-button>
              <el-button size="mini" type="primary" style="float: right;margin-top: 10px;margin-right: 10px" @click="jumpDetail(index)">查看详细</el-button>
            </el-row>
          </el-card>

        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import axios from "axios";
import bookDetail from "./bookDetail";
import refund from "./refund";

export default {
  name: "myOrder",
  beforeCreate() {
    let queryUser=this.$store.state.userInfo.name;
    let _this=this;
    if(this.$store.state.userInfo.isLogin){
      var axios = require('axios');
      var data = JSON.stringify({
        "userName": queryUser
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/getBook',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            _this.books=response.data.result;

          }else{
            alert("未查询到订单记录")
          }
        })
        .catch(function (error) {
          console.log(error);
          _this.$router.push('/404');
        });
    }else{
      _this.$router.push('/login');
    }


  },
  watch:{
    "$store.state.userInfo.isLogin":{
      immediate:true,
      handler(isLogin){
        if(!isLogin){
          this.$router.push('/');
        }
      }
    }
  },
  methods:{
    jumpDetail(index){
      this.$router.push({
        name:bookDetail,
        params:{
          book:JSON.stringify(this.books[index])
        }
      })
    },
    jumpRefund(index){
      this.$router.push({
        path:'/refund',
        query:{
          book:JSON.stringify(this.books[index])
        }
      })
    },
  },
  data(){
    return{
      books:[]
    };
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
</style>
