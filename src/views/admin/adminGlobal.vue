<template>
  <el-container>
    <adminMenu></adminMenu>
    <el-main>
      <div style="margin-top: 20px;margin-left: 12px;font-size: 24px;margin-bottom: 20px">
        全局设置
      </div>
      <div>
        <el-button style="margin-left: 35px;" size="mini" @click="Aquery()">查询</el-button>
      </div>

      <ul>
        <li v-for="(setting,index) in settings">
          <el-row style="margin-bottom: 10px;width: 600px">
            <el-col :span="6">
              {{setting.key}}:{{setting.value}}
            </el-col>
            <el-col :span="10" style="margin-left: 20px">
              <el-input class="myInput" size="mini" v-model="newValue[index].value" :id="'input'+index"></el-input>
              <el-button style="margin-left: 10px" type="primary" size="mini" @click="updateSetting(setting.key,newValue[index].value)">修改</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>
      <el-input v-model="a" id="a"></el-input>

    </el-main>
  </el-container>
</template>

<script>
import adminMenu from "../../components/admin/adminMenu";
import axios from "axios";
export default {
  name: "adminGlobal",
  components:{adminMenu},
  mounted() {
    this.initSetting();
  },
  data(){
    return{
      a:'',
      newValue:[{value:''},{value:''},{value: ''},{value: ''},{value: ''}],
      settings:[
        {
          key:'机建费',
        },
        {
          key:'燃油费',
        },
        {
          key:'退票手续费比例',
        },
        {
          key:'会员里程数'
        },
        {
          key:'会员折扣'
        }
      ],
      Settings:[
        {
          key:'机建费',
        },
        {
          key:'燃油费',
        },
        {
          key:'退票手续费比例',
        },
        {
          key:'会员里程数'
        },
        {
          key:'会员折扣'
        }
      ],
    };
  },
  methods:{
    Aquery(){
      let input=document.getElementById("a");
      input.value=this.a;
      this.a=2;
      this.a='';
    },
    updateSetting(key,new_value){
      var axios = require('axios');
      var data = JSON.stringify({
        "key":key,
        "value": new_value
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/updateGlobalVar',
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
            this.initSetting();
          }else{
            alert("修改失败")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    initSetting(){
      for(let i=0;i<this.Settings.length;i++){
        var axios = require('axios');
        var data = JSON.stringify({
          "key": this.Settings[i].key
        });
        var config = {
          method: 'post',
          url: '/Login-0.0.1-SNAPSHOT/getGlobalVar',
          headers: {
            'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
            'Content-Type': 'application/json'
          },
          data : data
        };
        let _this=this;
        axios(config)
          .then(function (response) {
            if(response.data.result!=null){
              _this.settings[i]=response.data.result;
              _this.Aquery();

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    }
  }
}
</script>

<style scoped>
.myInput{
  width: 160px;
}
</style>
