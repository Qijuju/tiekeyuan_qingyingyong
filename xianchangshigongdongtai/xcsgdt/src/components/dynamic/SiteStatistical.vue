<template>
  <div class="1">
    <!-- 现场施工动态统计列表-表头-开始 -->
    <div class = "biaotou">
      <!--<van-nav-bar title="项目选择" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="close" slot="right" />
      </van-nav-bar>-->
      <div class="search">
        <van-row class="titlecolor">
          <!--<van-col span="4"><van-button type="primary" size="small" @click="onClickLeft()">返回</van-button></van-col>-->
          <!--<van-col span="4" type="primary" size="small" @click="onClickLeft()">返回</van-col>-->
          <van-col span="16">

            <div @click="isShowXMMC()">
              <van-cell-group>
                <van-field v-model="xmmc" placeholder="全部"  disabled/>
              </van-cell-group>
              <!--<van-row >
                <van-field
                  v-bind:value="xmmc"
                  label="项目名称"
                  placeholder="项目名称"
                  autosize
                  disabled
                />
              </van-row>-->
            </div>
          </van-col>
          <!--<van-col span="4"><van-button type="primary" size="small" @click="onClickRight()">关闭</van-button></van-col>-->
          <van-col span="3" style="line-height: 40px"><span v-on:click="onClickRight()">关闭</span></van-col>
        </van-row>
      </div>
      <!-- 现场施工动态统计列表-表头-结束 -->
     <div>
      <table  class="tablelist timecheck">
            <tr>
                <td @click="selectDay(0)">日</td>
                <td @click="selectWeek(0)">周</td>
                <td @click="selectMonth(0)">月</td>
                <td @click="selectYear(0)">年</td>
            </tr>
        </table>
     </div>

      <!-- 现场施工动态统计列表-时间选择框-开始 -->
      <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeftTimer" @click-right="onClickRightTimer" id="timerssa" class="timer">
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="arrow" slot="right" />
      </van-nav-bar>
    </div>
    <!-- 现场施工动态统计列表-时间选择框-结束 -->

    <!-- 现场施工动态统计列表-list展示数据-开始 --><!-- 代办流程名称 -->
     <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <table v-for="(plan, index) in ToSiteStatisticalList" class="tablelist talist" @click='toSiteDetails(plan.userid)'>
            <tr ><td style="width:50%;font-size:16px;padding-left: 15px">{{plan.name }}</td>
                <td style="width:50%;text-align:right;font-size:16px;padding-right: 15px">{{plan.count }}条
                 <van-icon name="arrow" slot="right" style="font-size:14px;" /></td>
            </tr>
        </table>
     </v-scroll>
      <!-- 现场施工动态统计列表-list展示数据-结束 -->

    <!--<van-row v-show="showxmmc" class="checkbox">-->
      <!--<van-col>-->
        <!--<van-picker :columns="xmcolumns"-->
                    <!--visible-item-count=3 v-bind:xmmc="xmmc" show-toolbar @cancel="closeAll"-->
                    <!--@confirm="onXMConfirm"-->
        <!--/>-->
      <!--</van-col>-->
    <!--</van-row>-->
    <van-row v-show="showxmmc" class="checkrow">
      <van-col>
        <van-picker :columns="xmcolumns"
                    visible-item-count=3 v-bind:xmmc="xmmc" show-toolbar @cancel="closeAll"
                    @confirm="onXMConfirm"
        />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import $ from "jquery";
import { Waterfall } from 'vant';
import { Toast } from 'vant';
import { Sku } from 'vant';
import Vue from 'vue';
import axios from 'axios';
import bus from '../bus';
import Scroll from '../Common/PullRefresh';  //引入上拉加载，下拉刷新的插件

// 现场施工动态统计列表-迭代动态数据-开始
export default {
   name: "SiteDynamic",
    components: {
      'v-scroll': Scroll
    },
  data() {
    return {
      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      xmmc:'',
      xmmc_id:'',
      showxmmc:false,
      xiangmuServlet:[],
      xmcolumns:['全部'],

      num : 10,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数
      count:10,//存放展示条数
      ToSiteStatisticalCount:'',//存放获取现场施工动态统计条数
      ToSiteStatisticalList:[],//存放获取现场施工动态统计列表
      requestName:'',//流程名称
      companyId:'',//公司id
      pageNo:'1',//页数
      gongsiServlet:[],//公司列表数据
      gsmc:'',//公司名称
      workflowTypeId:'18',//流程分类id  15代表现场施工动态
      pageSize:'100',//每页条数
      workflowId:'59',//流程类型id  51营业线 52临近营业线 53非营业线
      selectType:'day',// day天  Week周 Month月 Year年
      nowDayNum: 0,// 天数
      nowWeekNum: 0,// 周数
      nowMonthNum: 0,// 月数
      nowYearNum: 0,// 年数
      startDate:'',//开始时间
      endDate:'',//结束时间
      sDate:'',//开始时间-接口传值
      eDate:'',//结束时间-接口传值
      message:'',
      disabled: false

    };
  },

//打开页面是调用此方法，获取代办流程列表数据
  mounted: function() {
    // debugger;
    this.selectDay();
    this.getXiangmuServlet();
      },

  methods: {
    // 表头返回按钮事件
    onClickLeft() {
        this.$router.push({path: '/SiteDynamic'});
      },

    //  关闭应用程序。调取JSAPI,关闭应用程序
    onClickRight(){
      RPM.closeApplication();
    },

    closeAll(){
      this.showxmmc=false
    },

    closeOthers(value){
//        debugger
      if(value!='xmmc'){
        this.showxmmc=false
      }

    },

    //调用接口获取项目名称信息
    getXiangmuServlet(){
// debugger
      this.orgid = 265;
      // this.baseuserId = 223906;
      //let url='http://www.r93535.com/tljggxt/siteconstruction/mobile/companyList!list.action?orgid='+this.orgid;
      let url='http://rails.r93535.com/tljggxt/siteconstruction/mobile/companyList!list.action?orgid='+this.orgid;
      console.log(url);
      axios.get(url)
        .then(response => {
          // debugger
          this.xiangmuServlet = response.data.data;
          var dat = this.xiangmuServlet;
          for(var i in dat) {
            // console.log(dat[i].id)
            // console.log(dat[i].name)
            this.xmcolumns.push(dat[i].name);
          }
          // debugger
          console.log(response.dat)
          // console.log(this.xiangmuServlet)
          console.log(this.xmcolumns)
        }).catch(err => {
        console.error(err.message)
      })
    },
    isShowXMMC(){
      // debugger
      this.closeOthers('xmmc')
      this.showxmmc=!this.showxmmc
    },

    onXMConfirm(value, index) {
      // debugger
      var data = this.xiangmuServlet
      for(var i in data) {
        if(index!=0){
          if(data[i].name==value){
            this.xmmc=data[i].name;
            this.xmmc_id=data[i].id;
          }
        }else{
          this.xmmc_id=''
          this.xmmc='全部'
        }
      }
      this.closeAll();
      this.GetSiteStatisticalList();
      // Toast(`当前值：${value}, 当前索引：${index}`);
    },

    //获取日（年月日）
    getDate(dates){
      var dd = new Date();
      dd.setDate(dd.getDate()+dates);
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;
      var d = dd.getDate();
     // var day = y+"年"+m+"月"+d+"日";
      if(m.toString().length == 1){
        m ='0'+m;
      }
      if(d.toString().length == 1){
        d ='0'+d;
      }
      var day = y+"-"+m+"-"+d;
      return day;

    },

    //点击事件选择日（年月日）
    selectDay(num){
      this.selectType = 'day';
      //判断是否为0，为0则代表为当前日
      if(num == 0){
        this.nowDayNum = 0;
      }
      var nowDay = this.nowDayNum;
      var day = this.getDate(nowDay);
      //debugger
      //var date1 = day.toString().replace('年','-');
     // alert(date1);
      this.sDate = day+' 00:00';
      this.eDate = day+' 23:59';
      $('#timerssa').find("div").eq(1).html(day);
      this.GetSiteStatisticalList();
    },

    //获取周（年月日-年月日，一周日期）
    getMonday(){
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth()+1;
      var date = d.getDate();

      // 点击事件选择周（年月日-年月日，一周日期）
      var day=d.getDay();
      var monday = day!=0?day-1:6; // 本周一与当前日期相差的天数
      return monday;
    },

    //选择周
    selectWeek(num){
      this.selectType = 'week';
      //判断是否为0，为0则代表为当前周
      if(num == 0){
        this.nowWeekNum = 0;
      }
      var nowWeek = this.nowWeekNum;
      var nowMonday = this.getMonday();
      var week1 = this.getDate(-nowMonday+nowWeek*7);
      var week2 = this.getDate(-nowMonday+nowWeek*7+6);

      this.sDate = week1+' 00:00';
      this.eDate = week2+' 23:59';
      $('#timerssa').find("div").eq(1).html(week1+"--"+week2);
      this.GetSiteStatisticalList();
    },

    //获取月（年月）
    getMonth(months){
      var dd = new Date();
      dd.setMonth(dd.getMonth()+months);
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;
     // var month=y+"年"+m+"月";
      if(m.toString().length == 1){
        m ='0'+m;
      }
      var month=y+"-"+m;

      return month;
    },

//点击事件选择月（年月）
    selectMonth(num){
      this.selectType = 'month';
      //判断是否为0，为0则代表为当前月
      if(num == 0){
        this.nowMonthNum = 0;
      }
      //debugger;
      var nowMonth = this.nowMonthNum;
      var month = this.getMonth(nowMonth);

      this.sDate = month+'-01 00:00';
//计算结束时间 下个月的开始时间
      var dd = new Date();
      dd.setMonth(dd.getMonth()+nowMonth+1);
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;
      // var month=y+"年"+m+"月";
      if(m.toString().length == 1){
        m ='0'+m;
      }
      var month2=y+"-"+m;
      this.eDate = month2+'-01 00:00';
      $('#timerssa').find("div").eq(1).html(month);
      this.GetSiteStatisticalList();
    },

    //获取年（年）
    getYears(years){
      var d = new Date();
      var year = d.getFullYear();
      //var yr = (year+years)+"年";
      var yr = (year+years);
      return yr;

    },

    //点击事件选择年（年）
    selectYear(num){
      this.selectType = 'year';
      //判断是否为0，为0则代表为当前年
      if(num == 0){
        this.nowYearNum = 0;
      }
      var nowYear = this.nowYearNum;
      var year = this.getYears(nowYear);

      this.sDate = year+'-01-01 00:00';
      //计算结束时间 下个月的开始时间
      var d = new Date();
      var year2 = d.getFullYear();
      var yr = (year2+nowYear+1);
      this.eDate = yr+'-01-01 00:00';
      $('#timerssa').find("div").eq(1).html(year);
      this.GetSiteStatisticalList();
    },

    //点击跳转详情页
    toSiteDetails(userid){

      //时间显示
      var sd= $('#timerssa').find("div").eq(1).html();
      //debugger
      //定义一个变量传值
      var query = {
        userIdValue:userid,
        sDateValue:sd,
        startDateValue:this.sDate,
        //q_nf:(this.nf=='全部')?'':this.nf,
        //q_yf:(this.yf=='全部')?'':this.yf,
        endDateValue:this.eDate,
        //q_page:'1'
      }

      console.log("toSiteDetail");
      this.$router.push({path: '/SiteDetails', query: query});
    },

    // 表头前一天按钮事件
    onClickLeftTimer() {
      var st = this.selectType;
      if(st == 'week'){// day天  week周 month月 year年
        this.nowWeekNum--;
        this.selectWeek();
      }else if(st == 'month'){
        this.nowMonthNum--;
        this.selectMonth();
      }else if(st == 'year'){
        this.nowYearNum--;
        this.selectYear();
      }else{
        this.nowDayNum--;
        this.selectDay();
      }
      },
    // 表头后一天按钮事件
    onClickRightTimer() {
      var st = this.selectType;
      if(st == 'week'){// day天  week周 month月 year年
        this.nowWeekNum++;
        this.selectWeek();
      }else if(st == 'month'){
        this.nowMonthNum++;
        this.selectMonth();
      }else if(st == 'year'){
        this.nowYearNum++;
        this.selectYear();
      }else{
        this.nowDayNum++;
        this.selectDay();
      }
      },


//获取我发起的列表中的总条数

  // 点击搜索按钮跳转到搜索页面
  ToToDoWorkSearch(){
    this.$router.push({path: '/ToDoWorkSearch'});
  },

  // 点击筛选按钮跳转到筛选页面
  ToToDoWorkScreen(){
    this.$router.push({path: '/ToDoWorkScreen'});
  },

  // 获取获取现场施工动态的统计页面接口
  GetSiteStatisticalList(){
  // debugger
        let vm = this;
        this.companyId=13917;
        this.pageNo = 1;
        //this.sDate='2018-01-02';
        //this.eDate = '2018-06-09';
        // var url = 'http://www.r93535.com/tljggxt/siteconstruction/mobile/countList!list.action?startDate='+this.sDate+'&endDate='+this.eDate;
        var url = 'http://rails.r93535.com/tljggxt/siteconstruction/mobile/countList!list.action?startDate='+this.sDate+'&endDate='+this.eDate;
        if(this.xmmc_id != ''){
          url += '&companyId='+this.xmmc_id;
        }
        console.log(url);
        vm.$http.get(url).then((response) => {
          vm.ToSiteStatisticalList = response.data.slice(0,10);
          // alert(response.data.slice(0,10).length);
        }, (response) => {
          console.log('error');
        });
      },
//下拉页面刷新数据操作
      onRefresh(done) {
        // debugger
        // 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
        this.GetSiteStatisticalList();
        done() // call done
      },

//上拉页面加载更多数据操作
      onInfinite(done) {
        // debugger
        let vm = this;
        this.companyId=13917;
        this.pageNo = 1;
        //this.sDate='2018-01-02';
        //this.eDate = '2018-06-09';
        // var url = 'http://www.r93535.com/tljggxt/siteconstruction/mobile/countList!list.action?startDate='+this.sDate+'&endDate=='+this.eDate;
        var url = 'http://rails.r93535.com/tljggxt/siteconstruction/mobile/countList!list.action?startDate='+this.sDate+'&endDate=='+this.eDate;
        if(this.xmmc_id != ''){
              url += '&companyId='+this.xmmc_id;
        }
        vm.$http.get(url).then((response) => {
          // debugger
          vm.counter++;
          vm.pageEnd = vm.num * vm.counter;
          vm.pageStart = vm.pageEnd - vm.num;
          let arr = response.data;
          if(arr!==''&&arr!==null&&arr!==undefined){
            for(var i=0;i<arr.length;i++){
              vm.ToSiteStatisticalList.push(arr[i]);
            }
          }else {
            return;
          }
          done() // call done
        }, (response) => {
          console.log('error');
        });
      },


 }
};


</script>

<style scoped>
/* 表头标题演示 */
/*.biaotou{*/
  /*position: fixed;*/
  /*width: 100%;*/
/*}*/
/*公司选择*/
/*.van-picker{*/
  /*margin-top:300px;*/
  /*width:80%;*/
/*}*/
/* 规定头部，包括：标题、搜索、时间栏 */
.search{
  left:0px;
  width:100%;
  z-index:3;
  background: #E5F2FA;
  line-height:2.2;
}
/* 标题样式 */
.van-nav-bar{
  background-color: #99a71e;
}
.timer{
  background-color: #e5f2fa;
}
/* 筛选标题样式 */
.van-button--bottom-action{
  top:-3px;
}
/* 列表展示样式 */
.yo-scroll{
  top: 130px;
}
/* 现场施工动态统计列表-搜索筛选框-字体样式 */
/* .van-col-12 {
  font-size: 0px;
} */
/* 现场施工动态统计列表-搜索筛选框-背景颜色 */
.van-button--bottom-action {
  color:#000;
  background-color: #c9c9c9;
}
/*  现场施工动态统计列表-代办列表信息-table样式 */
/* html5 list页面的中间table标签样式  */
.tablelist{
  width:100%;
  border-collapse:collapse;
  border-bottom:1px solid #ccc;
  background-color: #efeff4;
}
.tablelist td{
  padding:6px 6px 3px 4px;
  font:Arial, Helvetica, sans-serif;
  text-align:left;
  height: 45px;
}
.tablelist th{
  padding:6px 6px 3px 4px;
  font:Arial, Helvetica, sans-serif;
  text-align:left;
}

/*修改的样式*/
.van-nav-bar{
  background: #2196F3;
  color: #fff;
}
.van-nav-bar .van-icon{
  color: #fff;
}
.titlecolor{
  background: #2196F3;
  color: #fff;
  height: 46px;
}
.timecheck{
  background-color: #E5F2FA;
  border: 0;
  border-bottom: 1px solid #ccc;
  padding: 0;
  margin: 0;
}
.timecheck tr td{
  border-left: 1px solid #ccc;
  font-size:16px;
  text-align:center;
  height: 35px;
  line-height: 35px;
  color: #2196F3;
}
.timecheck tr td:first-child{
  /*margin-left: -2px;*/
  border-left: 0;
}
.timer{
  /*background: #2196F3;*/
  background: #E5F2FA;
  color: #000;
  border-bottom: 1px solid #ccc;
}
.van-nav-bar .van-icon {
  color: #000;
  vertical-align: middle;
}
.checkbox .van-col{
  width: 100%;
}
.van-cell{
  padding: 6px 15px;
}
/*修改下边选择框*/
.van-picker{
  position: fixed;
  width: 100%;
}
.van-picker-column {
  font-size: 14px;
  text-align: left;
}
.checkrow{
  background-color: #fff;
}
.van-picker{
  bottom: 55px;
}
.van-col-16 {
  margin-left: 17%;
  margin-top: 2px;
}
</style>
