<template>
  <div class="midCard" style="background-color: rgba(133,169,210,0.4);margin-top: -20px;height: 800px">
    <el-card style="min-height:180px;width: 800px;margin-top: 0px;font-size: 18px;font-family: '等线'" v-if="user!=null">
      <b>尊贵的{{this.user.clientType}}会员您好</b>
      <el-row style="margin-bottom: 10px;margin-left:40px;margin-top: 20px">
        <el-col :span="12">
          <b>客户姓名: </b>{{this.user.clientName}}
        </el-col>
        <el-col :span="12" style="margin-bottom: 10px">
          <b>身份证号: </b>{{this.user.clientId}}
        </el-col>
      </el-row>
      <el-row style="margin-left:40px;margin-bottom: 20px">
        <el-col :span="12" >
          <b>所在地: </b>{{this.user.clientAddress}}
        </el-col>
        <el-col :span="12">
          <b>客户类型: </b>{{this.user.clientType}}
        </el-col>
      </el-row>
      <el-row style="margin-left:40px;margin-bottom: 0px">
        <el-col :span="12">
          <b>已飞里程数: </b>{{this.user.clientMileage}}公里
        </el-col>
        <el-col :span="12">
          <b>飞行次数: </b>{{this.user.clientCount}}次
        </el-col>
      </el-row>
      <el-row style="margin-left:40px;margin-top: 20px" v-if="user.clientType=='SVIP'||user.clientType=='VIP'">
        <el-col :span="12">
          <b>里程积分: </b>{{this.user.clientCredit}}
        </el-col>
        <el-col :span="12">
          <b>优惠折扣: </b>{{this.user.clientDiscount*10}}折
        </el-col>
      </el-row>
      <div style="text-align: center">
        <el-button type="text" v-if="user.clientType=='普通'" style="margin-top: 20px" @click="applyVip()">申请升级为VIP会员</el-button>
      </div>
    </el-card>
    <el-card style="min-height:180px;width:50%;margin-top: 0px;font-size: 18px;font-family: '等线'" v-else>
      <b>补充您的个人信息以加入会员</b>

      <el-form :model="myclient" style="margin-top: 20px" :rules="rules" ref="goodclient">
        <el-row>
          <el-col :span="8">
            <el-form-item label="客户姓名" prop="clientName">
              <el-input size="mini" v-model="myclient.clientName" @input="(val) => changeInputEvent(val, item)" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="身份证号" prop="clientId">
              <el-input size="mini" v-model="myclient.clientId" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在地址" prop="clientAddress">
              <el-input size="mini" v-model="myclient.clientAddress" style="width: 200px"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      </el-form>
        <el-row>
          <el-button style="width: 100px;float: right" size="small" @click="$router.go(-1)">暂时不用</el-button>
          <el-button style="width: 100px;float: right;margin-right: 20px" size="small" type="primary" @click="submitForm()">加入会员</el-button>
        </el-row>


    </el-card>
  </div>
</template>

<script>
export default {
  name: "userInfo",
  created() {
    if(!this.$store.state.userInfo.isLogin){
      this.$router.push('/login');
    }
    var axios = require('axios');
    var config = {
      method: 'post',
      url: '/Login-0.0.1-SNAPSHOT/getClientInfo?userName='+this.$store.state.userInfo.name,
      headers: {
        'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)'
      }
    };
    let _this=this;
    axios(config)
      .then(function (response) {
        _this.user=response.data.result;
      })
      .catch(function (error) {
        console.log(error);
      });

  },
  watch:{
    "$store.state.userInfo.isLogin":{
      immediate:true,
      handler(isLogin){
        if(!isLogin){
          this.$router.push('/')
        }
      }
    }
  },
  methods:{
    changeInputEvent(val, item){
      item.searchText = val;
      this.$forceUpdate()
    },
    applyVip(){
      var axios = require('axios');
      var data = JSON.stringify({
        "key": "会员里程数"
      });
      let _this=this;
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/getGlobalVar',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
        .then(function (response) {
          let threshold=response.data.result.value;
          if(_this.user.clientMileage>=threshold){
            var axios1 = require('axios');
            _this.user.clientType='VIP';
            _this.user.clientDiscount=0.88;
            var data1 = JSON.stringify(_this.user);
            var config = {
              method: 'post',
              url: '/Login-0.0.1-SNAPSHOT/updateClient',
              headers: {
                'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
                'Content-Type': 'application/json'
              },
              data : data1
            };
            axios(config)
              .then(function (response1) {
                if(response1.data.code==1){
                  alert("恭喜您！您已经升级成为VIP会员");
                  _this.$router.go(0);
                }
              })
              .catch(function (error1) {
                console.log(error1);
              });

          }else{
            alert("对不起，您的累计里程需要超过"+threshold+"公里才可以进行升级")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    submitForm(){
      this.$refs['goodclient'].validate((valid)=>{
        if(valid){
          var axios = require('axios');
          this.myclient.userName=this.$store.state.userInfo.name;
          var data = JSON.stringify(this.myclient);
          var config = {
            method: 'post',
            url: '/Login-0.0.1-SNAPSHOT/addClient',
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
                alert("欢迎您加入会员大家庭")
                _this.$router.go(0)
              }else{
                alert("加入失败")
              }
            })
            .catch(function (error) {
              console.log(error);
              alert("发生未知错误"+error)
            });

        }else{

        }
      });
    }
  },
  data(){
    return{

      myclient:{
        clientName: "",
        clientId: "",
        clientType: "普通",
        clientAddress: "",
        userName: "",
        clientMileage: 0,
        clientCredit: 0,
        clientCount: 0,
        clientDiscount: 1
      },
      user:{
        clientName: "",
        clientId: "",
        clientType: "普通",
        clientAddress: "",
        userName: "",
        clientMileage: 0,
        clientCredit: 0,
        clientCount: 0,
        clientDiscount: 1
      },
      rules:{
        clientName:[{required:true,message:"请输入客户姓名",trigger:'blur'}],
        clientId:[{required:true,min:18,max:18,message:"请输入18位身份证号",trigger:'blur'}],
        clientAddress:[{required:true,message:"请输入所在地址",trigger:'blur'}],
      },
    };
  }
}
</script>

<style scoped>
.midCard{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -2px;
}
</style>
