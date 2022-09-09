<template>
  <div>
    <el-card class="box-card">
      <el-form
        :model="flightForm"
        :rules="rules"
        ref="flightForm"
        label-width="100px"
        class="flightForm"
      >
        <el-row class="texthead">
          航班动态查询
        </el-row>
        <el-form-item label="航班号" prop="flightNO">
          <el-input v-model="flightForm.flightNO" placeholder="例如 CA2412"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="airDate">
          <el-date-picker
            placeholder="点击选择"
            value-format="yyyy-MM-dd"
            v-model="flightForm.airDate"
            style="width: 100%;"
            :picker-options="expireTimeOption"
          ></el-date-picker>
        </el-form-item>
        <el-button @click="submitForm('flightForm')">查询</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "flightQuery",
  data(){
    return{
      flightForm: {
        flightNO:"",
        airDate: "",
      },
      rules:{
        flightNO: [
          {required:true,message:"请输入6位航班号",trigger:"blur"}
        ]
      },
      expireTimeOption:{
        disabledDate(date) {
          return date.getTime()<=Date.now();
        }
      }
    }
  },
  methods:{
    submitForm(formName) {
      if(this.flightForm.flightNO.length!=6){
        alert("请输入6位航班号");
        return;
      }
      if(this.flightForm.airDate==""){
        alert("请选择日期");
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.flightForm);
          var axios = require('axios');
          var data = JSON.stringify({
            "flightId": this.flightForm.flightNO,
            "flightDate": this.flightForm.airDate
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
                alert("未查询到相关航班,请更改查询条件");
                return;
              }
              if(response.data.code==1){
                _this.$router.push({
                  path:'/flightResult',
                  query:{
                    id:_this.flightForm.flightNO,
                    date:_this.flightForm.airDate
                  }
                });
              }
            })
            .catch(function (error) {
              console.log(error);
              alert(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });}

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
.texthead{
  text-align: center;
  font-size: 20px;
  margin-bottom: 25px;
  margin-top: 5px;
}

</style>
