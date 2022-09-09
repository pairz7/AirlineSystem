<template>
  <el-container>
    <adminMenu></adminMenu>
    <el-main>
      <div style="margin-top: 20px;margin-left: 12px;font-size: 24px;margin-bottom: 20px">
        客户管理
        <el-button type="primary" style="float: right;margin-right: 20px" size="small" @click="newVisible=true">新建客户</el-button>
      </div>
      <el-dialog :visible.sync="newVisible">
        <el-form :model="newClient">
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <el-input size="mini" style="width: 150px" v-model="newClient.clientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-form-item label="身份证号">
                  <el-input size="mini" style="width: 200px" v-model="newClient.clientId"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户类型">
                <el-select size="small" style="width: 140px" v-model="newClient.clientType">
                  <el-option value="普通" label="普通客户"></el-option>
                  <el-option value="VIP" label="VIP客户"></el-option>
                </el-select>
              </el-form-item>
            </el-col >
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所在地址">
                <el-input size="mini" style="width: 150px" v-model="newClient.clientAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-form-item label="用户名">
                  <el-input size="mini" style="width: 210px" v-model="newClient.userName"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="飞行里程">
                <el-input-number size="mini" :min="0" style="width: 140px" v-model="newClient.clientMileage">
                </el-input-number>
              </el-form-item>
            </el-col >
          </el-row>
          <el-row v-if="newClient.clientType=='VIP'">
            <el-col :span="8">
              <el-form-item label="积分">
                <el-input-number size="mini" style="width: 150px" v-model="newClient.clientCredit"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-form-item label="飞行次数">
                  <el-input-number size="mini" style="width: 180px" v-model="newClient.clientCount"></el-input-number>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="折扣优惠">
                <el-input-number size="mini" :precision="2" :min="0" :max="1" :step="0.05" style="width: 140px" v-model="newClient.clientDiscount">
                </el-input-number>
              </el-form-item>
            </el-col >
          </el-row>
        </el-form>
        <div slot="footer" style="margin-bottom: 50px">
          <el-button @click="newVisible=false">取 消</el-button>
          <el-button type="primary" @click="submitNew()" style="margin-right: 10px">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="clients"
        header-cell-style="text-align:center;"
        cell-style="text-align:center;"
        stripe
        style="width: 100%">
        <el-table-column
          prop="clientName"
          label="客户姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="clientId"
          label="身份证号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="clientType"
          label="客户类型">
        </el-table-column>
        <el-table-column
          prop="clientAddress"
          label="所在地址">
        </el-table-column>

        <el-table-column
          prop="userName"
          label="用户名">
        </el-table-column>

        <el-table-column
          prop="clientMileage"
          label="飞行里程">
        </el-table-column>

        <el-table-column
          prop="clientCredit"
          label="积分">
        </el-table-column>

        <el-table-column
          prop="clientCount"
          label="飞行次数">
        </el-table-column>

        <el-table-column
          prop="clientDiscount"
          label="购票折扣">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              style="margin-left: 10px"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>

          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="editVisible">
        <el-form :model="editClient">
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名">
                <el-input size="mini" style="width: 150px" disabled v-model="editClient.clientName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-form-item label="身份证号">
                  <el-input size="mini" style="width: 200px" disabled v-model="editClient.clientId"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户类型">
                <el-select size="small" style="width: 140px" v-model="editClient.clientType">
                  <el-option value="普通" label="普通客户"></el-option>
                  <el-option value="VIP" label="VIP客户"></el-option>
                </el-select>
              </el-form-item>
            </el-col >
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="所在地址">
                <el-input size="mini" style="width: 150px" v-model="editClient.clientAddress"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-form-item label="用户名">
                  <el-input size="mini" style="width: 210px" v-model="editClient.userName"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="飞行里程">
                <el-input-number size="mini" :min="0" style="width: 140px" v-model="editClient.clientMileage">
                </el-input-number>
              </el-form-item>
            </el-col >
          </el-row>
          <el-row v-if="editClient.clientType=='VIP'">
            <el-col :span="8">
              <el-form-item label="积分">
                <el-input-number size="mini" style="width: 150px" v-model="editClient.clientCredit"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item>
                <el-form-item label="飞行次数">
                  <el-input-number size="mini" style="width: 180px" v-model="editClient.clientCount"></el-input-number>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="折扣优惠">
                <el-input-number size="mini" :precision="2" :min="0" :max="1" :step="0.05" style="width: 140px" v-model="editClient.clientDiscount">
                </el-input-number>
              </el-form-item>
            </el-col >
          </el-row>
        </el-form>
        <div slot="footer" style="margin-bottom: 50px">
          <el-button @click="cancelEdit()" >取 消</el-button>
          <el-button type="primary" @click="submitEdit()" style="margin-right: 10px">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import adminMenu from "../../components/admin/adminMenu";
import axios from "axios";

export default {
  name: "adminUser",
  components:{adminMenu},
  created() {
    this.initData();
    },
  methods:{
    cancelEdit() {
      this.editVisible=false;
      this.clients[this.curIndex]=this.clientBackup;
    },
    submitNew(){
      this.newVisible=false;
      let _this=this;
      var axios = require('axios');
      var data = JSON.stringify(this.newClient);
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/addClient',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            alert("新增成功");
            _this.initData();
          }else{
            alert("新增失败")
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("发生未知错误"+error)
        });

    },
    submitEdit(){
      this.editVisible=false;
      var axios = require('axios');
      var data = JSON.stringify(this.editClient);
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/updateClient',
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
            alert("修改成功")
            _this.initData();
          }else{
            alert("修改失败")
            _this.initData();
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("发生未知错误"+error)
          _this.initData();
        });

    },
    initData(){
      var axios = require('axios');
      var data = '';
      let _this=this;
      var config = {
        method: 'post',
        url: '/Login-0.0.1-SNAPSHOT/getClient',
        headers: {
          'User-Agent': 'apifox/1.0.0 (https://www.apifox.cn)',
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(config)
        .then(function (response) {
          if(response.data.code==1){
            _this.clients=response.data.result;
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    handleEdit(index,row){
      this.editVisible=true;
      this.curIndex=index;
      this.editClient=this.clients[index];
      this.clientBackup=this.clients[index];
    },
    handleDelete(index,row){
      this.$confirm("确定要删除吗?","提示",{
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var axios = require('axios');
        var data = JSON.stringify({
          "clientId": this.clients[index].clientId
        });

        var config = {
          method: 'post',
          url: '/Login-0.0.1-SNAPSHOT/deleteClient',
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
              alert("删除成功");
              _this.initData();
            }
          })
          .catch(function (error) {
            console.log(error);
          });


      })
        .catch(() => {

        });
    }
  },
  data(){
    return{
      curIndex:0,
      newVisible:false,
      editVisible:false,
      clientBackup:{},
      editClient:{},
      newClient:{
        "clientName": "",
        "clientId": "",
        "clientType": "普通",
        "clientAddress": "",
        "userName": "",
        "clientMileage":0 ,
        "clientCredit": 0,
        "clientCount": 0,
        "clientDiscount": 1},
      clients:[]
    };
  }
}
</script>

<style scoped>

</style>
