<script src="../../../node_modules/vant/lib/datetime-picker/index.js"></script>
<template>
  <div class="search">
    <!-- 现场施工动态现场动态列表-表头-开始 -->
   <!-- <div class = "biaotou">-->
      <van-nav-bar title="建设动态详情" left-text="返回" @click-left="onClickLeft" @click-right="onClickRight" id="timer">
        <!--<van-icon name="arrow-left" slot="left" />-->
        <!--<van-icon name="close" slot="right" />-->
      </van-nav-bar>
      <!-- 现场施工动态现场动态列表-表头-结束 -->
      <!-- 现场施工动态现场动态列表-时间选择框-开始 -->
       <!--<van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeftTimer" @click-right="onClickRightTimer" id="timer" class="timer">
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="arrow" slot="right" />
      </van-nav-bar> -->
  <!--  </div>-->
    <div >
      <van-row >
        <van-field
          v-bind:value="projectName"
          label="项目名称"
          placeholder="项目名称"
          autosize
          disabled
        />
      </van-row>
    </div>

    <div >
      <van-row >
        <van-field

          label="工作内容"
          placeholder="工作内容"
          autosize
          disabled
        />
        <template>
          <span v-html="workContent"></span>
        </template>
      </van-row>
    </div>

    <div >
      <van-row >
        <van-field
          v-bind:value="sitePicture"
          label="现场照片"
          placeholder="现场照片"
          autosize
          disabled
        />
      </van-row>
    </div>

    <div >
      <van-row >
        <van-field
          v-bind:value="publishPeople"
          label="发布人"
          placeholder="发布人"
          autosize
          disabled
        />
      </van-row>
    </div>

    <div >
      <van-row >
        <van-field
          v-bind:value="createDate"
          label="发布时间"
          placeholder="发布时间"
          autosize
          disabled
        />
      </van-row>
    </div>

    <div >
      <van-row >
        <van-field
          v-bind:value="publishLocation"
          label="发布地点"
          placeholder="发布地点"
          autosize
          disabled
        />
      </van-row>
    </div>

    <!-- 现场施工动态现场动态列表-时间选择框-结束 -->
    <!-- 现场施工动态现场动态列表-list展示数据-开始 --><!-- 代办流程名称 -->
     <!--<v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <table v-for="(plan, index) in SiteList" class="tablelist" @click="toDetail(plan.id)">
          <tr><td style="width:100%;font-size:18px;" colspan="2">发布人:{{plan.publishPeople }}</td></tr>
          <tr>
            <td style="width:30%">发布时间:{{plan.createDate.toString().substring(11,16) }}</td>
            <td style="width:70%">项目名称:{{plan.projectName }}</td>
          </tr>
          <tr><td style="width:100%" colspan="2">工作内容:{{plan.workContent }}</td></tr>
          <tr><td style="width:100%" colspan="2">工作地点:{{plan.publishLocation }}</td></tr>
        </table>
     </v-scroll>-->
      <!-- 现场施工动态现场动态列表-list展示数据-结束 -->
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

// 现场施工动态现场动态列表-迭代动态数据-开始
export default {
   name: "SiteDynamic",
    components: {
      'v-scroll': Scroll
    },
  data() {
    return {
      siteId:'',//建设风采id
      message:'',
      //详情信息
      projectName:'',// 项目名称
      workContent:'',// 工作内容
      sitePicture:'',// 现场照片
      publishPeople:'',// 发布人
      createDate:'',// 发布时间
      publishLocation:'',// 发布地点
      disabled: false

    };
  },


//打开页面是调用此方法，获取代办流程列表数据
  mounted: function() {
    // debugger;
    this.GetSiteId();
    //bus.$on('sDateValue',data=> {
     // this.sDate = data;
     // $('#timer').find("div").eq(1).html(data);
      // alert('onSearchName===='+this.sDate);
      // this.GetToDoWorkflowList();
    //});
   // $('#timer').find("div").eq(1).html(this.sDate);

  //  this.GetSiteDetail();
      },

  methods: {
    // 表头返回按钮事件
    onClickLeft() {
        this.$router.push({path: '/SitStatistical'});
      },
    // 表头关闭按钮事件
    onClickRight() {
        this.$router.push({path: '/SitStatistical'});
      },
   /* toDetail(id){
      //var url = 'http://10.60.1.18:8090/ljmh/siteconstruction/mobile/site!list.action?userId='+this.userId+'&page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      //var url = 'http://whjjgc.r93535.com/login/VerifyLogin.jsp?logintype=1&userpassword=1&loginid=tongshuangguo&gopage=http://whjjgc.r93535.com:89/view.do?module=1&scope=5&detailid=954';
      //console.log(url);
      // axios.get(url);
      console.log(id);
    },*/
   /* getTimer(){
      var day = this.getDay(this.todayNum);
      var date = day.replace(/-/g,".");
      $('#timer').find("div").eq(1).html(date);
    },
    // 表头前一天按钮事件
    onClickLeftTimer() {
      this.todayNum--;
      this.getTimer();
      },
    // 表头后一天按钮事件
    onClickRightTimer() {
      this.todayNum++;
      this.getTimer();
      },
*/
    // 获取建设风采id的值
   GetSiteId(){
      // 变量名为userId
      //debugger
     bus.$on('siteId',data=> {
       this.siteId = data;
      console.log('siteId===='+this.siteId);
       this.GetSiteDetail();
     });
   },

//获取待我审批列表中的总条数
// GetToDoWorkflowCount() {
//         // debugger;
//          this.baseuserId=236807;
//            var url = 'http://whjjgc.r93535.com/GetToDoWorkflowCount?baseuserId='+this.baseuserId+'&workflowTypeId='+this.workflowTypeId
//           axios.get(url)
//             .then(response => {
//               this.ToDoWorkflowCount  = response.data
//               alert(this.ToDoWorkflowCount);
//             }).catch(err => {
//             console.error(err.message)
//           })
//         },


//获取我发起的列表中的总条数

  // 点击搜索按钮跳转到搜索页面
  ToToDoWorkSearch(){
    this.$router.push({path: '/ToDoWorkSearch'});
  },

  // 点击筛选按钮跳转到筛选页面
  ToToDoWorkScreen(){
    this.$router.push({path: '/ToDoWorkScreen'});
  },

  // 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
    GetSiteDetail(){
     // debugger
     // this.userId=333;
     //  this.pageNo = 1;
     // this.startDate='2018-02-05';
      // var date = this.startDate.replace(/\./g,'-');
      //this.sDate = this.startDate+' 00:00';
      //this.eDate = this.startDate+' 23:59';
      //var url = 'http://www.r93535.com/tljggxt/siteconstruction/mobile/site!viewsite.action?siteId='+this.siteId;
      var url = 'http://rails.r93535.com/tljggxt/siteconstruction/mobile/site!viewsite.action?siteId='+this.siteId;
      console.log(url);
      axios.get(url).then(response => {
        // debugger
        var data = response.data;
        /*for(var i in data) {
          this.SiteList.push(data[i]);
        }*/
       // if(data != null && data!= ''){
          this.projectName = data.projectName,// 项目名称
            this.workContent = data.workContent,// 工作内容
            this.sitePicture = data.sitePicture,// 现场照片
            this.publishPeople = data.publishPeople,// 发布人
            this.createDate = data.createDate,// 发布时间
            this.publishLocation = data.publishLocation, // 发布地点
        //}
        console.log(response.data)
        console.log(this.projectName)
      }).catch(err => {
        console.error(err.message)
      });
    },
//下拉页面刷新数据操作
    /*  onRefresh(done) {
        // debugger
        // 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
        this.GetSiteList();
        done() // call done
      },*/

//上拉页面加载更多数据操作
  /*  onInfinite(done) {
      // debugger
      let vm = this;
    //  this.baseuserId=333;
      this.pageNo = 1;
      //this.startDate='2018-02-05';
      //var date = this.startDate.replace(/\./g,'-');
      //this.sDate = this.startDate+' 00:00';
      //this.eDate = this.startDate+' 23:59';
      var url = 'http://10.60.1.18:8090/ljmh/siteconstruction/mobile/site!list.action?userId='+this.userId+'&page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      vm.$http.get(url).then((response) => {
        // debugger
        vm.counter++;
        vm.pageEnd = vm.num * vm.counter;
        vm.pageStart = vm.pageEnd - vm.num;
        let arr = response.data.data;
        if(arr!==''&&arr!==null&&arr!==undefined){
          for(var i=0;i<arr.length;i++){
            vm.SiteList.push();
          }
        }else {
          return;
        }
        done() // call done
      }, (response) => {
        console.log('error');
      });
    },*/

// js获取日期：前天、昨天、今天、明天、后天
/*getDay(day){
  // debugger
       var today = new Date();
       var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
       today.setTime(targetday_milliseconds); //注意，这行是关键代码
       var tYear = today.getFullYear();
       var tMonth = today.getMonth();
       var tDate = today.getDate();
       tMonth = this.doHandleMonth(tMonth + 1);
       tDate = this.doHandleMonth(tDate);
       return tYear+"-"+tMonth+"-"+tDate;
},
doHandleMonth(month){
  // debugger
       var m = month;
       if(month.toString().length == 1){
          m = "0" + month;
       }
       return m;
},*/

  }
};


</script>

<style scoped>
.van-col{
  height:44px;
  text-align: center;
  line-height: 44px;
}
.van-picker{
  position: fixed;
  width: 100%;
}
.van-picker-column {
  font-size: 14px;
  text-align: left;
}
/* 设置头部 style start */
.van-nav-bar{
  background: #2196F3;
  color: #fff;
}
.van-nav-bar .van-icon{
  color: #fff;
}
/* 设置头部 style end */

  /*修改样式*/
span p{
  width: 50%;
  display: inline-block!important;
}
</style>
