<template>
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>注册</title>
  </head>
  <body>
  <div class="ui three column stackable grid login-div">
    <div class="column"></div>
    <div class="column" id="loginapp">
      <form id="login" class="ui fluid form segment">
        <div class="field">
          <label style="margin-bottom: 10px">注册新用户</label>
          <div class="ui left icon input">
            <input type="text" name='user' placeholder="用户名" v-model="name">
            <i class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <input type="password" name="pwd" placeholder="密码" v-model="pwd">
            <i class="lock icon"></i>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <input type="password" name="repwd" placeholder="重复输入密码" v-model="repwd">
            <i class="lock icon"></i>
          </div>
        </div>
        <div class="field">
          <div class="ui left icon input">
            <input type="text" name="phone" placeholder="手机号" v-model="phone">
            <i class="phone icon"></i>
          </div>
        </div>
        <br>
        <div class="inline field">
              <div class="fluid ui blue button" @click="register()">注册</div>
          </div>
      </form>
    </div>
    <div class="column"></div>
  </div>
  </body>
  </html>

</template>

<script>
import axios from "axios";

export default {
  name: 'register',
  data: function () {
    return {
      name: '',
      pwd: '',
      repwd: '',
      phone: '',
    }
  },
  methods: {
    register () {
      if(this.name==''){alert('用户名不能为空');return;}
      if(this.pwd==''){alert('密码不能为空');return;}
      if(this.phone==''){alert('手机号不能为空');return;}
      if(this.phone.length!=11){alert('手机号的长度应为11位');this.pwd='';this.repwd='';return;}
      if(this.pwd!=this.repwd){alert('两次输入的密码不一致');this.pwd='';this.repwd='';return;}
      if(this.name.length<5){alert('用户名的长度应至少为5位');this.pwd='';this.repwd='';return;}
      if(this.pwd.length<6){alert('密码的长度应至少为6位');this.pwd='';this.repwd='';return;}
      var flag = 0;
      var axios = require('axios');
      var data = JSON.stringify({
        "username": this.name,
        "password": this.pwd,
        "phone": this.phone
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/register',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
        .then((response)=> {
          // console.log(JSON.stringify(response.data));
          var code=response.data.code;
          if(code==1){
            alert('注册成功!');
            this.$router.push('/login');
          }else if(code==-1){
            alert('注册失败,用户名重复,请尝试更换');
            this.pwd='';
            this.repwd='';
          }else{
            alert('注册失败,其他原因')
          }
          console.log("post成功！");
        })
        .catch((error)=> {
          console.log(error);
        });
    },


  },
}


</script>

<style scoped>
body {
  font-family: Verdana, Arial, Helvetica, sans-serif;
  margin:0;
  background-color:#FFFFFF;
}
.ui.grid{
  margin:0;
}
.header-row1{
  height: 0px;
}
.login-header{
  background-color: #0066b1;
  height: 110px;
}
.ui.white{
  color:#ffffff;
}
.text-center{
  text-align: center;
}
.ui.login-div{
  margin:150px 0 0 0;
}
</style>
