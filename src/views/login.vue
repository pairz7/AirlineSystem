<template>
  <!DOCTYPE html>
  <html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <title>登录</title>
  </head>
  <body>
  <div class="ui three column stackable grid login-div">
    <div class="column"></div>
    <div class="column" id="loginapp">
      <form id="login" class="ui fluid form segment">
        <div class="field">
          <label class="">用户名</label>
          <div class="ui left icon input">
            <input type="text" name='user' placeholder="" v-model="name">
            <i class="user icon"></i>
          </div>
        </div>
        <div class="field">
          <label class="">密码</label>
          <div class="ui left icon input">
            <input type="password" name="pwd" placeholder="" v-model="pwd">
            <i class="lock icon"></i>
          </div>
        </div>
        <div class="inline field">
          <el-button type="text" style="float: right;margin-right: 20px" @click="forgetVisible=true">忘记密码</el-button>
        </div>
        <div class="inline field">
          <div class="ui two column stackable grid">
            <div class="left aligned column">
              <div class="ui blue button" @click="login()" style="width: 100px">登录</div>
            </div>
            <div class="right aligned column">
              <div class="ui blue button " @click="register()" style="width: 100px">注册</div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <el-dialog :visible.sync="forgetVisible" width="400px" style="height: 500px">
      <div style="margin-left: 20px">
        <el-form :model="forgetUser">
          <el-form-item label="用户名">
            <el-input size="small" style="width: 250px" v-model="forgetUser.username"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input size="small" style="width: 250px" v-model="forgetUser.phone"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input size="small" style="width: 250px" v-model="forgetUser.password"></el-input>
          </el-form-item>
        </el-form>
        <el-footer>
          <el-button type="" style="float: right;margin-right: 20px;margin-left: 20px" @click="forgetVisible=false">取消</el-button>
          <el-button type="primary" style="float: right;" @click="handleForget()">找回密码</el-button>
        </el-footer>
      </div>
    </el-dialog>
  </div>
  </body>
  </html>
</template>

<script>


export default {
  name: 'login',
  data: function () {
    return {
      forgetUser:{
        "username": "",
        "password": "",
        "phone": ""
      },
      forgetVisible:false,
      name: '',
      pwd: '',
      fromRouter:''
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
        vm.fromRouter=from.name;
    })

  },
  methods: {
    handleForget(){
      var axios = require('axios');
      var data = JSON.stringify(this.forgetUser);
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/updatePassword',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      }
      this.forgetVisible=false;
      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            alert("找回成功")
          }else{
            alert("手机号不匹配")
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    register () { this.$router.push('Register') },
    login () {
      if(this.name==''){alert('用户名不能为空');return;}
      if(this.pwd==''){alert('密码不能为空');return;}
      var flag = 0;
      var axios = require('axios');
      var data = JSON.stringify({
        "username": this.name,
        "password": this.pwd
      });
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/login',
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
              if(this.fromRouter=='register'){
                this.$router.push('/');
              }else{
                this.$router.go(-1);
              }

              let userInfo={
                isLogin:true,
                admin:false,
                name:this.name
              }
              localStorage.setItem('userInfo',JSON.stringify(userInfo));
              this.$store.state.userInfo=userInfo;
              alert('登陆成功!');
            }else {
              this.pwd='';
              alert('用户名或密码错误，请重新输入');
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
.ui.white{
  color:#ffffff;
}

.ui.login-div{
  margin:150px 0 0 0;
}
</style>
