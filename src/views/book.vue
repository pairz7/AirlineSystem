<template>
<el-container>
  <el-main>
    <div class="midCard">
      <el-card class="bookCard">
        <div style="font-size: 16px;">
          乘机人
        </div>
        <ul style="margin-left: -45px">

          <li v-for="(passenger,index) in passengers">
            <div class="passengerCard">
              <el-col :span="6" style="text-align: left;padding-left: 15px;padding-top: 10px;font-size: 26px;font-weight: bold;color: #99a9bf">
                {{index+1}}
              </el-col>
              <el-col :span="10">
                <el-form
                  :model="passenger"
                  ref="passenger"
                  :rules="rules"
                >
                  <el-form-item class="psInput" style="margin-top: 5px" prop="name">
                    <el-input size="small" placeholder="姓名" v-model="passenger.name" :id="'name'+index" style="margin-bottom: 0"></el-input>
                  </el-form-item>
                  <el-form-item  class="psInput" prop="id">
                    <el-input size="small" placeholder="身份证号" :id="'id'+index" v-model="passenger.id"></el-input>
                  </el-form-item>
                  <el-form-item  class="psInput">
                    <el-input size="small" placeholder="手机号码(选填)" v-model="passenger.phone"></el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="4" style="float: right;margin-right: 10px">
                <el-button type="text" @click="clearPassengerInfo(index)">清空</el-button>
                <el-button type="text" @click="delPassenger(index)">× 删除</el-button>
              </el-col>
            </div>
          </li>
        </ul>
        <div class="midCard" style="margin-top: 0px">
          <el-button type="text" @click="createPassenger()"><span style="font-size: 20px;">⊕</span> 新增乘机人</el-button>
        </div>
      </el-card>
    </div>
    <div class="midCard">
      <el-card class="phoneCard">
        <div style="font-size: 16px;font-weight: bold">
          联系人
        </div>
        <el-form :model="bookInfo" ref="bookInfo" :rules="rules" style="margin-top: 10px">
          <el-col :span="10">
            <el-form-item prop="phone" style="margin-left: 20px;" class="psInput">
              <el-input  size="small" v-model="bookInfo.phone" placeholder="手机号,接收航变信息"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" style="margin-left: 50px">
            <el-form-item>
              <el-input class="psInput" size="small" v-model="bookInfo.email" placeholder="Email(选填,接收航变信息)" style="margin-left: 20px"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </div>
    <div class="midCard">
      <el-button type="primary" style="width: 750px;margin-bottom: 20px;height: 50px" @click="gotoNext()">下一步</el-button>
    </div>
  </el-main>
  <el-aside width="400px;">
      <bookSideCard :bookPassengers="passengers" :bookTicket="bookInfo.ticket" style="margin-top: 15px;margin-right: 20px"></bookSideCard>
  </el-aside>
</el-container>
</template>

<script>
import bookSideCard from "@/components/bookSideCard";

export default {
  name: "book",
  components:{bookSideCard},
  created() {
    let data=this.$route.params.ticket;
    if(data!=null) this.bookInfo.ticket=JSON.parse(data);
    let passengersData=this.$route.params.passengers;
    let bookInfoData=this.$route.params.bookInfo;
    if(passengersData!=null){
      this.passengers=JSON.parse(passengersData);
    }
    if(bookInfoData!=null){
      this.bookInfo=JSON.parse(bookInfoData);
    }
    if(data!=null){return;}
    let localTicketData=localStorage.getItem('ticket');
    if(localTicketData!=null){
      this.bookInfo.ticket=JSON.parse(localTicketData);
    }
    let localFormData=localStorage.getItem('bookInfo');
    if(localFormData!=null){
      this.bookInfo=JSON.parse(localFormData);
    };
    let localPassengerData=localStorage.getItem('passengers');
    if(localPassengerData!=null){
      this.passengers=JSON.parse(localPassengerData);
    }
  },
  beforeUpdate() {
    this.saveTicket();
    this.saveInfo();
  },
  beforeRouteLeave: function(to, from , next){
    if(to.name!='submitBook'&&this.$store.state.userInfo.isLogin){
      next(false)
      this.$confirm('您将离开本页面，是否进行数据保存？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveInfo();
        this.saveTicket();
        next();
      }).catch(() => {
        next()
      });
    }else{
      this.saveTicket();
      next();
    }
  },
  methods:{
    saveInfo(){
      let dataPassenger=JSON.stringify(this.passengers);
      let dataBookInfo=JSON.stringify(this.bookInfo);
      localStorage.setItem('passengers',dataPassenger);
      localStorage.setItem('bookInfo',dataBookInfo);
    },
    saveTicket(){
      let dataTicket=JSON.stringify(this.bookInfo.ticket);
      localStorage.setItem('ticket',dataTicket);
    },
    createPassenger(){
      let newP={name:'',id:'',phone:'',class:'成人'};
      this.passengers.push(newP);
    },
    delPassenger(index){
      if(this.passengers.length==1)return;
      this.passengers.splice(index,1);
    },
    clearPassengerInfo(index){
      this.passengers[index].phone='';
      this.passengers[index].id='';
      this.passengers[index].name='';
    },
    gotoNext(){
      this.$refs['bookInfo'].validate(valid=>{
        if(valid){
          let flag=false;
          for(let i=0;i<this.passengers.length;i++){
            if(this.passengers[i].name==''||this.passengers[i].id.length!=18){
              let input1=document.getElementById('name'+i);
              input1.focus();
              input1.blur();
              let input2=document.getElementById('id'+i);
              input2.focus();
              input2.blur();
              flag=true;
            }
          }
          if (flag){return;}
          this.bookInfo.username=this.$store.state.userInfo.name;
              this.$router.push({
                name:'submitBook',
                params:{
                  bookInfo:JSON.stringify(this.bookInfo),
                  passengers:JSON.stringify(this.passengers)
                }
              });
        }
        });

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
  data(){
    return{
      rules:{
        phone:[
          {required:true,min:11,max:11,message:'请输入11位大陆手机号',trigger:'blur'}
        ],
        name:[
          {required:true,message:'请输入乘机人姓名',trigger:'blur'}
        ],
        id:[
          {required:true,min:18,max:18,message:'请输入18位居民身份证号',trigger:'blur'}
        ]

      },
      passengers:[
        {
          name:'',
          id:'',
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
  min-height: 350px;
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
  min-height: 170px;
  border-style: solid;
  border-radius: 6px;
  border-width: 2px;
  border-color: #eeeeee;
  margin-bottom: 10px;
}
.psInput{
  width: 300px;
  margin-bottom: 17px;
}

</style>
