<template>
  <div class="1">
    <!-- 现场施工动态现场动态列表-表头-开始 -->
    <div class = "biaotou">
      <van-nav-bar title="" left-text="返回" @click-left="onClickLeft" right-text="关闭"  @click-right="onClickRight" id="timer">
        <!--<van-icon name="arrow-left" slot="left" />-->
        <!--<van-icon name="close" slot="right" />-->
      </van-nav-bar>
      <!-- 现场施工动态现场动态列表-表头-结束 -->
      <!-- 现场施工动态现场动态列表-时间选择框-开始 -->
       <!--<van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeftTimer" @click-right="onClickRightTimer" id="timer" class="timer">
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="arrow" slot="right" />
      </van-nav-bar> -->
    </div>
    <!-- 现场施工动态现场动态列表-时间选择框-结束 -->

    <!-- 现场施工动态现场动态列表-list展示数据-开始 --><!-- 代办流程名称 -->
     <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <!--<table v-for="(plan, index) in SiteList" class="tablelist">-->
          <!--<tr><td style="width:100%;font-size:18px;" colspan="2">发布人:{{plan.publishPeople }}</td></tr>-->
          <!--<tr>-->
            <!--<td style="width:30%">发布时间:{{plan.createDate.toString().substring(11,16) }}</td>-->
            <!--<td style="width:70%">项目名称:{{plan.projectName }}</td>-->
          <!--</tr>-->
          <!--<tr><td style="width:100%" colspan="2">工作内容:{{plan.workContent }}</td></tr>-->
          <!--<tr><td style="width:100%" colspan="2">工作地点:{{plan.publishLocation }}</td></tr>-->
        <!--</table>-->
       <div class="tablelist" v-for="(plan, index) in SiteList" >
         <div>
           <p>发布人：<span v-html="plan.userInfo.name"></span></p>
           <p>发布时间：<span v-html="plan.createDate.toString().substring(11,16)"></span></p>
           <p>项目名称：<span v-html="plan.projectName" style="margin-left: 8px"></span></p>
           <p>工作内容：<span v-html="plan.workContent"></span></p>
           <p>工作地点：<span v-html="plan.publishLocation" style="margin-left: 8px"></span></p>
         </div>
       </div>
     </v-scroll>
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
      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 10,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数

      sDay:'',
      sDate:'',
      eDate:'',
      count:10,//存放展示条数
      SiteCount:'',//存放获取待办流程条数
      SiteList:[],//存放获取待办流程列表
      requestName:'',//流程名称
      userId:this._GLOBAL.baseUserId,//基础平台用户id
      pageNo:'1',//页数
      workflowTypeId:'18',//流程分类id  15代表现场施工动态
      pageSize:'100',//每页条数
      workflowId:'59',//流程类型id  51营业线 52临近营业线 53非营业线
      todayNum : 0,// 当前天
      message:'',
      disabled: false

    };
  },

 /* watch: {
    $route: function (to, from) {
      console.log('to====='+to.path+'from===='+from.path);
      console.log("watch............");
     debugger
      if(to.path=='/SiteDetails'){
        var data = to.query;
        if(data != null && data != ''){
          //debugger
          this.userId=data.userIdValue;
          this.sDay=data.sDateValue;
          this.sDate=data.startDateValue;
          this.eDate=data.endDateValue;
          // this.q_nf=data.q_nf
          // this.q_yf=data.q_yf
          // this.q_type=data.q_type

          // this.allLoaded=false
          // this.page=1
          $('#timer').find("div").eq(1).html(this.sDay);
          this.SiteList=[];
          this.GetSiteList();
          //this.loadMore()
        }
      }
    },
  },
*/

//打开页面是调用此方法，获取代办流程列表数据
  mounted: function() {
    console.log(this.$route.query);
    var data = this.$route.query;
    if(data != null && data != ''){
      //debugger
      this.userId=data.userIdValue;
      this.sDay=data.sDateValue;
      this.sDate=data.startDateValue;
      this.eDate=data.endDateValue;
      // this.q_nf=data.q_nf
      // this.q_yf=data.q_yf
      // this.q_type=data.q_type

      // this.allLoaded=false
      // this.page=1
      $('#timer').find("div").eq(1).html(this.sDay);
      this.SiteList=[];
      this.GetSiteList();
      //this.loadMore()
    }
    // debugger;
    //this.GetSDate();
    //bus.$on('sDateValue',data=> {
     // this.sDate = data;
     // $('#timer').find("div").eq(1).html(data);
      // alert('onSearchName===='+this.sDate);
      // this.GetToDoWorkflowList();
    //});
   // $('#timer').find("div").eq(1).html(this.sDate);

    //this.GetToDoWorkflowList();
      },

  methods: {
    // 表头返回按钮事件
    onClickLeft() {
        this.$router.push({path: '/SiteStatistical'});
      },
    //  关闭应用程序。调取JSAPI,关闭应用程序
    onClickRight(){
      RPM.closeApplication();
    },
    toDetail(id){
      //var url = 'http://10.60.1.18:8090/ljmh/siteconstruction/mobile/site!list.action?userId='+this.userId+'&page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      //var url = 'http://whjjgc.r93535.com/login/VerifyLogin.jsp?logintype=1&userpassword=1&loginid=tongshuangguo&gopage=http://whjjgc.r93535.com:89/view.do?module=1&scope=5&detailid=954';
      //console.log(url);
      // axios.get(url);
      console.log(id);
      bus.$emit('siteId',id);
      this.$router.push({path: '/SiteDetail'});
    },
    getTimer(){
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

    // 获取点击搜索按钮跳转事件的值
   // GetSDate(){
      //待我审批页面展示-传递流程名称 变量名为v-model
      //debugger
    //  bus.$on('sDateValue',data=> {
  //      this.sDate = data;
      // alert('onSearchName===='+this.sDate);
       // this.GetToDoWorkflowList();
    //  });
  //  },

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
    GetSiteList(){
     // debugger
     // this.userId=333;
      let vm = this;
      this.pageNo = 1;
      console.log("id",vm.baseUserId);
      console.log("id",this._GLOBAL.baseUserId);

     // this.startDate='2018-02-05';
      // var date = this.startDate.replace(/\./g,'-');
      //this.sDate = this.startDate+' 00:00';
      //this.eDate = this.startDate+' 23:59';
      // var url = 'http://http://www.r93535.com/tljggxt/siteconstruction/mobile/site!list.action?userId='+this._GLOBAL.baseUserId+'&page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      var url = 'http://rails.r93535.com/tljggxt/siteconstruction/mobile/site!list.action?userId='+this._GLOBAL.baseUserId+'&page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      console.log(url);
     /* axios.get(url).then(response => {
        // debugger
        var data = response.data.data.slice(0,10);
        for(var i in data) {
          this.SiteList.push(data[i]);
        }*/
      vm.$http.get(url).then((response) => {
        // debugger
        vm.SiteList = response.data.data.slice(0,10);
        console.log(response.data)
        console.log(this.SiteList)
      }).catch(err => {
        console.error(err.message)
      });
    },
//下拉页面刷新数据操作
      onRefresh(done) {
        // debugger
        // 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
        this.GetSiteList();
        done() // call done
      },

//上拉页面加载更多数据操作
    onInfinite(done) {
      // debugger
      let vm = this;
    //  this.baseuserId=333;
      this.pageNo++;
      //this.startDate='2018-02-05';
      //var date = this.startDate.replace(/\./g,'-');
      //this.sDate = this.startDate+' 00:00';
      //this.eDate = this.startDate+' 23:59';
      // var url = 'http://http://www.r93535.com/tljggxt/siteconstruction/mobile/site!list.action?userId='+this._GLOBAL.baseUserId+'&page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      var url = 'http://rails.r93535.com/tljggxt/siteconstruction/mobile/site!list.action?userId='+this._GLOBAL.baseUserId+'&page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      vm.$http.get(url).then((response) => {
        // debugger
       /* vm.counter++;
        vm.pageEnd = vm.num * vm.counter;
        vm.pageStart = vm.pageEnd - vm.num;*/
        let arr = response.data.data;
        if(arr!==''&&arr!==null&&arr!==undefined){
          for(var i=0;i<arr.length;i++){
            vm.SiteList.push(arr[i]);
          }
        }else {
          return;
        }
        done() // call done
      }, (response) => {
        console.log('error');
      });
    },

// js获取日期：前天、昨天、今天、明天、后天
getDay(day){
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
},

  }
};


</script>

<style scoped>
/* 表头标题演示 */
.biaotou{
  position: fixed;
  width: 100%;
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
  /*top:0.9rem;*/
  top: 46px;
}
/* 现场施工动态现场动态列表-搜索筛选框-字体样式 */
/* .van-col-12 {
  font-size: 0px;
} */
/* 现场施工动态现场动态列表-搜索筛选框-背景颜色 */
.van-button--bottom-action {
  color:#000;
  background-color: #c9c9c9;
}
/*  现场施工动态现场动态列表-代办列表信息-table样式 */
/* html5 list页面的中间table标签样式  */
/*.tablelist{*/
  /*width:100%;border-collapse:collapse;border:1px solid #efeff4; margin-top: 3px;background-color: #efeff4;}*/
.tablelist td{
  padding:6px 6px 3px 4px;font:Arial, Helvetica, sans-serif;text-align:left;}
.tablelist th{
  padding:6px 6px 3px 4px;font:Arial, Helvetica, sans-serif;text-align:left;}

/*修改的样式*/
.van-nav-bar{
  background-color: #2196F3;
  color: #fff;
}
/*修改卡片样式*/
.tablelist{
  width: 95%;
  margin: 10px;
  border-radius: 4px;
  padding: 5px;
  -webkit-box-shadow: 0px 0px 5px 1px #ccc;
  box-shadow: 0px 0px 5px 1px #ccc;
}
</style>
