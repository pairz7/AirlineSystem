<template>
  <div>
    <el-card class="box-card">
      <span style="font-size:20px;font-weight:bold;">嗨，您想去哪里？</span>
      <el-form
        :model="searchForm"
        :rules="rules"
        ref="searchForm"
        label-width="100px"
        class="searchForm"
      >
        <el-form-item label="出发城市" prop="departure">
          <el-input v-model="searchForm.departure"></el-input>
        </el-form-item>
        <el-form-item label="到达城市" prop="destination">
          <el-input v-model="searchForm.destination"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="airDate">
          <el-date-picker
            placeholder="点击选择"
            value-format="yyyy-MM-dd"
            v-model="searchForm.airDate"
            style="width: 100%;"
            :picker-options="expireTimeOption"
          ></el-date-picker>
        </el-form-item>
        <el-button type="primary" @click="submitForm('searchForm')">查询</el-button>

      </el-form>
    </el-card>
  </div>
</template>


<script>
export default {
  name:'searchBox',
  data() {
    return {
      searchForm: {
        departure: "",
        destination: "",
        airDate: "",
      },
      rules: {
        departure: [
          { required: true, message: "请输入出发城市", trigger: "blur" }
        ],
        destination: [
          { required: true, message: "请输入到达城市", trigger: "blur" }
        ]
      },
      expireTimeOption: {
        disabledDate(date) {
          return date.getTime() <= Date.now();
        }
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var axios = require('axios');
          var data = JSON.stringify({
            "startCity": this.searchForm.departure,
            "arriveCity": this.searchForm.destination,
            "flightDate": this.searchForm.airDate
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
          var _this=this;
          axios(config)
            .then(function (response) {
              if(response.data.code==-1){
                alert("未查询到相关机票,请更改搜索条件");
                return;
              }
              if(response.data.code==1){
                _this.$router.push({
                  path:'/ticketResult',
                  query:{
                    startCity:_this.searchForm.departure,
                    arriveCity:_this.searchForm.destination,
                    flightDate:_this.searchForm.airDate
                  }
                })
              }
            })
            .catch(function (error) {
              console.log(error);
              alert("发生未知错误");
            });
        } else {
          alert("提交信息错误");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.searchForm {
  margin-top: 20px;
  margin-left: 50px;
  width: 440px;
  height: 230px;
}
button {
  float: right;
  margin: 10px;
}
.box-card {
  width: 620px;
}
</style>
