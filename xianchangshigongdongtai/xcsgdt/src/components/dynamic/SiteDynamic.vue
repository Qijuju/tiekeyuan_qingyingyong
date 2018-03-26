<template>
  <div class="1">
    <!-- 现场施工动态现场动态列表-表头-开始 -->
    <div class = "biaotou">
      <van-nav-bar title="建设动态" right-text="关闭"  @click-right="onClickRight">
      <!--<van-nav-bar title="建设动态" left-text="返回" @click-left="onClickLeft" @click-right="onClickRight">-->
        <!--<van-icon name="arrow-left" slot="left" />-->
        <!--<van-icon name="close" slot="right" />--><!--<van-nav-bar title="建设动态" left-text="返回" @click-left="onClickLeft" @click-right="onClickRight">-->
        <!--<van-icon name="arrow-left" slot="left" />-->
        <!--<van-icon name="close" slot="right" />-->
      </van-nav-bar>
      <!-- 现场施工动态现场动态列表-表头-结束 -->
      <!-- 现场施工动态现场动态列表-时间选择框-开始 -->
      <!--<van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeftTimer" @click-right="onClickRightTimer" id="timer" class="timer">-->
        <!--<van-icon name="arrow-left" slot="left" />-->
        <!--<van-icon name="arrow" slot="right" />-->
      <!--</van-nav-bar>-->

    </div>
    <!-- 现场施工动态现场动态列表-时间选择框-结束 -->
    <!-- 现场施工动态现场动态列表-list展示数据-开始 --><!-- 代办流程名称 -->
     <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
         <div class="tablelist" v-for="(plan, index) in SiteList" >
             <div>
                 <p><span v-html="plan.createDate" style="color:rgb(31,80,135);"></span> <span v-html="plan.publishLocation" class="myplace" @click='popupClick(plan.publishLocation)'></span></p>
                 <p><span v-html="plan.projectName" style="margin-right: 8px"></span>(<span v-html="plan.inspaction"></span>)</p>
                 <p><span v-html="plan.workContent"></span></p>
                 <div>
                   <img  v-for="item in plan.attachments" class="contentImg" v-bind:src='item.saveName' v-on:click="showBigImage($event)" alt="">
                 </div>
                 <p class="huicon"><span v-html="plan.userInfo.name"></span></p>
                 <p class="huicon"><span v-html="plan.deptName"></span></p>

                 <!--<p>发布人：<span v-html="plan.userInfo.name"></span></p>-->
                 <!--<p>发布单位：<span v-html="plan.deptName"></span></p>-->
                 <!--<p>发布时间：<span v-html="plan.createDate.toString().substring(11,16)"></span></p>-->
                 <!--<p>项目名称：<span v-html="plan.projectName" style="margin-left: 8px"></span></p>-->
                 <!--<p>检查部位：<span v-html="plan.inspaction" style="margin-left: 8px"></span></p>-->
                 <!--<p>工作内容：<span v-html="plan.workContent"></span></p>-->
                 <!--<div>-->
                   <!--<img  v-for="item in plan.attachments" class="contentImg" v-bind:src='item.saveName' alt="">-->
                 <!--</div>-->
                 <!--<p>工作地点：<span v-html="plan.publishLocation" style="margin-left: 8px"></span></p>-->
             </div>
         </div>
     </v-scroll>

    <van-row>
      <van-col span="24" class="chooseBtn">
        <van-button type="primary">
          <div  class="flex" style="position: absolute;top:0px;left: 0px;">
            <input style="display: inline-block;width:100%;height: 100%;" type="text" @click="openByDrop($event)" v-model="calendar.display" readonly>
          </div>
        </van-button>
      </van-col>
    </van-row>


    <!--弹出层-->
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <p>{{popupTxt}}</p>
    </mt-popup>

    <!--预览图片的盒子-->
    <div id="showBigImage" v-if="showBigImage" @click="showBigImageBox($event)" v-bind:style="{height:setHeight+'px'}">
      <!--<img  src="../../assets/images/sgrjhImages/search.png" alt="">-->
      <img  v-bind:src="previewPicSrc" alt="" style="width:100%;">
    </div>


    <transition name="fade">
      <div class="calendar-dropdown" v-if="calendar.show">
        <calendar :style="{'left':calendar.left+'px','top':calendar.top+'px','z-index':calendar.zIndex,'height':calendar.height+'px'}" :zero="calendar.zero" :lunar="calendar.lunar" :value="calendar.value" :begin="calendar.begin" :end="calendar.end" @select="calendar.select"></calendar>
      </div>
    </transition>


      <!-- 现场施工动态现场动态列表-list展示数据-结束 -->
   <!-- <iframe  style="margin-top:93px;width:100%;height:1000px;display:none" src="http://whjjgc.r93535.com:89/verifyLogin.do?loginid=b8748615-880a-49bc-8136-465a5cc7b983"></iframe>
    <iframe  style="margin-top:93px;width:100%;height:1000px;" src="http://whjjgc.r93535.com:89/view.do?module=1&scope=5&detailid=954"></iframe>-->
  </div>
</template>

<script>
import $ from "jquery";
import { Waterfall } from 'vant';
import { Toast } from 'vant';
import { Sku } from 'vant';
import { Dialog } from 'vant';
import Vue from 'vue';
import axios from 'axios';
import bus from '../bus';
import Scroll from '../Common/PullRefresh';  //引入上拉加载，下拉刷新的插件
import calendar from '../Common/calendar'     //引入日历控价

// 现场施工动态现场动态列表-迭代动态数据-开始
export default {
   name: "SiteDynamic",
    components: {
      'v-scroll': Scroll,
      calendar
    },
  data() {
    return {
      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 10,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数

      count:10,//存放展示条数
      SiteCount:[],//存放获取待办流程条数
      SiteList:[],//存放获取待办流程列表
      requestName:'',//流程名称
      userId:this._GLOBAL.baseUserId,//基础平台用户id
      pageNo:'1',//页数
      nowDayNum : 0,// 当前天
      sgrq: new Date().getFullYear()+(new Date().getMonth()>=9?"-":"-0")+(new Date().getMonth()+1)+(new Date().getDate()>=9?"-":"-0")+new Date().getDate(),
      message:'',
      startDate:'',
      sDate:'',
      eDate:'',
      disabled: false,
      inspaction:'',    //检查部位
      deptName:'',      //发布单位
      createDate:'',
      popupVisible:false,
      popupTxt:'',
      previewPicSrc:'', // 预览图片的src
      setHeight:window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,/// 设置预览图片的盒子的高度=屏幕可视区域的高度
      calendar:{
        display:[new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()],//默认显示当天日期
        show:false, // 显示隐藏
        zero:true, // 是否补零
        test:100,
        value:[new Date().getFullYear(),(new Date().getMonth()+1),new Date().getDate()], //  打开的日历默认选中的时间
        lunar:true, //显示农历
        select:(value)=>{ // 当选中日历上的某一天时，触发的事件
          this.sgrq = value[0]+'-'+value[1]+'-'+value[2];
          this.GetSiteList(); // 选择完日期重新请求数据
          // this.setStore(value); // 将选中的日期存储到store中
          this.calendar.show=false;
          this.calendar.value=value;
          this.calendar.display=value.join("/");
        }
      }
    };
  },
  activated: function() {
    this.GetSiteList(); // 选择完日期重新请求数据
  },
//打开页面是调用此方法，获取代办流程列表数据
  mounted: function() {
    if(window.location.search!=''){

      var userid=this.getQueryVariable('userid')
      if(!this._GLOBAL.isEmptyObject(userid)){
        this._GLOBAL.setBaseUserId(userid)
        /*  this.GetToDoWorkflowCount(userid)
          this.getdata(userid);*/
      }
      console.log("sessionId2===="+this._GLOBAL.sessionId+'baseuserId2===='+this._GLOBAL.baseUserId)
    }
    this.selectDay();

      },
  created:function () {  // 将日历提交到store中
    this.$store.commit('setProjectCount',{count:getDaysInOneMonth(this.calendar.value[0],this.calendar.value[1]),year: this.calendar.value[0],month: this.calendar.value[1],day:this.calendar.value[2]});
    this.$store.commit('setBusinessLineSelectProjectCount',{count:this.projects.length });
//      this.$store.commit('setInfiniteLoading',{infiniteLoading:this.infiniteLoading });
  },
  methods: {
    //  关闭应用程序。调取JSAPI,关闭应用程序
    onClickRight(){
      RPM.closeApplication();
    },
    popupClick(txt) { // popup弹出层点击事件
      this.popupVisible = true;
      this.popupTxt = txt;
    },
    // 预览图片
    showBigImageBox(event){
      var el = event.currentTarget;
      $(el).hide();
    },
    showBigImage(event){
      //获取点击对象
      var el = event.currentTarget;

      // 当前点击的src
      this.previewPicSrc =$(el).attr("src");

      // 显示box
      $('#showBigImage').show();

    },
    //日历控件的事件
    openByDrop(e){
      this.calendar.show=true;

      this.calendar.left=0;
      this.calendar.top=46;
      this.calendar.zIndex=6; // 设置显示层级

      // var h=document.documentElement.clientHeight-280;

      // this.calendar.height=h;

      e.stopPropagation();
      window.setTimeout(()=>{
        document.addEventListener("click",(e)=>{
          this.calendar.show=false;
          document.removeEventListener("click",()=>{},false);
        },false);
      },1000)


    },
    setStore(value){
      this.$store.commit('setProjectCount',{count:getDaysInOneMonth(value[0],value[1]),year: value[0],month: value[1],day:value[2]})
    },
    getQueryVariable(variable){
      // debugger
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
      }
      return('');
    },
    // // 表头返回按钮事件
    // onClickLeft() {
    //     this.$router.push({path: '/SiteDynamic'});
    //   },

    // // 表头关闭按钮事件
    // onClickRight() {
    //     this.$router.push({path: '/SiteDynamic'});
    //   },

    toDetail(id){
      //var url = 'http://10.60.1.18:8090/ljmh/siteconstruction/mobile/site!list.action?userId='+this.userId+'&page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      //var url = 'http://whjjgc.r93535.com/login/VerifyLogin.jsp?logintype=1&userpassword=1&loginid=tongshuangguo&gopage=http://whjjgc.r93535.com:89/view.do?module=1&scope=5&detailid=954';
      // var url2 = 'http://whjjgc.r93535.com:89/verifyLogin.do?loginid=b8748615-880a-49bc-8136-465a5cc7b983';
    //  window.location.href=url2;
      //var url ='http://whjjgc.r93535.com:89/view.do?module=1&scope=5&detailid=954';
      //console.log(url);
      //window.open(url,'top'); //只是表示打开这个页面，并不是打开并刷新index.aspx
     // window.location.href=url; //表示重新定向到新页面，同时刷新打开的这个页面；
     // axios.get(url);
      console.log(id);
      bus.$emit('siteId',id);
      this.$router.push({path: '/SiteDetail'});
    },
    //点击事件获取当前年月日（年月日）
    getDate(dates){
      var dd = new Date();
      dd.setDate(dd.getDate()+dates);
      var y = dd.getFullYear();
      var m = dd.getMonth()+1;
      var d = dd.getDate();
      //debugger
      //console.error('ssss'+m.toString().length);
      if(m.toString().length == 1){
        m ='0'+m;
      }
      if(d.toString().length == 1){
        d ='0'+d;
      }
      return y+"-"+m+"-"+d;

    },

    //选择日
    selectDay(num){
      //判断是否为0，为0则代表为当前日
      if(num == 0){
        this.nowDayNum = 0;
      }
      var nowDay = this.nowDayNum;
      var day = this.getDate(nowDay);
      this.startDate = day;
      $('#timer').find("div").eq(1).html(day);
    },

    // 表头前一天按钮事件
    onClickLeftTimer() {
      this.nowDayNum--;
      this.selectDay();
      this.GetSiteList();
      },
    // 表头后一天按钮事件
    onClickRightTimer() {
      this.nowDayNum++;
      this.selectDay();
      this.GetSiteList();
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

    //获取当前日期（年月日）
   /* getNowDay(){
      var date=new Date();
      var y = date.getFullYear();
      var m = date.getMonth()+1;
      var d = date.getDate();
      var dateS=y+'-'+m +'-'+d;
      return dateS;
   },*/

 // 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
 GetSiteList(){
 // debugger
 //       this.userId=223906;
      let vm = this;
      this.pageNo = 1;
     // this.startDate='2018-02-05';
      // var date = this.startDate.replace(/\./g,'-');
   // debugger
   //     this.sDate = this.startDate+' 00:00';
   //     this.eDate = this.startDate+' 23:59';

   this.sDate = this.sgrq+' 00:00';
   this.eDate = this.sgrq+' 23:59';
   console.log("时间：",this.startDate);
   console.log("时间2：",this.sgrq);

      //var url = 'http://139.129.218.16:9910/extapi/tljggxt/siteconstruction/mobile/site!list.action?page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      //var url = 'http://www.r93535.com/tljggxt/siteconstruction/mobile/site!list.action?page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      var url = 'http://rails.r93535.com/tljggxt/siteconstruction/mobile/site!list.action?page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
     //   var url = 'http://10.60.1.18:8090/ljmh/siteconstruction/mobile/site!list.action?page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
      // var url = 'http://10.60.1.18:8090/ljmh/siteconstruction/mobile/site!list.action?userId=102298&page=1&startDate=2018-03-05%2000:00&endDate=2018-03-11%2023:59';
      console.log(url);
     vm.$http.get(url).then((response) => {
      vm.SiteList = response.data.data.slice(0,10);
         /*  var dat = response.data.data;
           for(var i in dat) {
             this.SiteList.push(dat[i]);
           }*/
           vm.SiteList.forEach(function (value,index) {
             if(value.attachments.length){
               for(var i=0;i<value.attachments.length;i++){
                 // value.attachments[i].saveName = "http://www.r93535.com/tljggxt/xcsgdt/" + value.attachments[i].saveName;
                 value.attachments[i].saveName = "http://rails.r93535.com/tljggxt/xcsgdt/" + value.attachments[i].saveName;
               }
             }
           })
           console.log("列表数据：",response.data.data)
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
       done(); // call done
     },

//上拉页面加载更多数据操作
     onInfinite(done) {
       // debugger
       let vm = this;
       this.pageNo++;
       // this.baseuserId=223906;
     //  this.pageNo = 1;
       //this.startDate='2018-02-05';
       //var date = this.startDate.replace(/\./g,'-');
       this.sDate = this.startDate+' 00:00';
       this.eDate = this.startDate+' 23:59';
        //var url = 'http://www.r93535.com/tljggxt/siteconstruction/mobile/site!list.action?page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
        var url = 'http://rails.r93535.com/tljggxt/siteconstruction/mobile/site!list.action?page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
       // var url = 'http://10.60.1.18:8090/ljmh/siteconstruction/mobile/site!list.action?page='+this.pageNo+'&startDate='+this.sDate+'&endDate='+this.eDate;
       vm.$http.get(url).then((response) => {
         // debugger
        /* this.pageNo++;
         vm.counter++;
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



 }
};


</script>

<style scoped>
/* 表头标题演示 */
.biaotou{
  position: fixed;
  width: 100%;
}
.timer{
  background-color: #e5f2fa;
}
section.inner{
  top: -.5rem;
}
/* 筛选标题样式 */
.van-button--bottom-action{
  top:-3px;
}
/* 列表展示样式 */
.yo-scroll{
  top:46px;
  background-color: #eee;
  font-size: 13px;
}
/* 现场施工动态现场动态列表-搜索筛选框-背景颜色 */
.van-button--bottom-action {
  color:#000;
  background-color: #c9c9c9;
}
/*  现场施工动态现场动态列表-代办列表信息-table样式 */
.tablelist td{
  padding:6px 6px 3px 4px;
  font:Arial, Helvetica, sans-serif;
  text-align:left;
}
.tablelist th{
  padding:6px 6px 3px 4px;
  font:Arial, Helvetica, sans-serif;
  text-align:left;
}


/*修改的样式*/
/* 设置头部 style start */
.van-nav-bar{
  background: #2196F3;
  color: #fff;
}
.van-nav-bar .van-icon{
  color: #fff;
}
/* popup */
.mint-popup{
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
  padding:5px;
}
/*修改卡片样式*/
.tablelist{
  width: 100%;
  margin-bottom: 8px;
  background-color: #fff;
  padding: 8px;
  /*border-radius: 4px;*/
  /*-webkit-box-shadow: 0px 0px 5px 1px #ccc;*/
  /*box-shadow: 0px 0px 5px 1px #ccc;*/
}
.contentImg{
  width: 95px;
  height: 95px;
  margin-right: 5px;
  margin-bottom: 5px;
}
.tablelist p{
  margin-bottom: 3px
}
  p span{
    vertical-align: middle;
    color: #333;
    font-size: 13px;
  }
  .huicon span{
    color: #999;
    font-size: 11px;
  }
  .myplace{
    display: inline-block;
    margin-left: 8px;
    width: 57%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /* 日历插件 start*/
/*日历空间 style  start */
/*demo*/
.flex{
  box-sizing: border-box;

  display: -webkit-box;
  -webkit-box-pack: start;
  -webkit-box-align: start;

  display: -webkit-flex;
  -webkit-justify-content: space-between;
  -webkit-align-items: top;

  display: flex;
  justify-content: space-between;
  align-items: top;
  flex-flow:row wrap
}
.flex>div{
  margin:10px;
  padding:20px;
  width:25%;
  min-width:300px;
  border: 1px solid #eee;
  border-radius: 2px;
  position: relative;
}
.flex>div>span{
  position: absolute;
  left:0px;
  top:0px;
  padding:5px 10px;
  font-family: "PingFang SC","Hiragino Sans GB","STHeiti","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size:10px;
  border-radius:0 0 2px 0;
  background:#ea6151;
  color:#fff;
}
.flex>div>input{
  box-sizing: border-box;
  width:100%;
  margin-top:20px;
  border-radius: 2px;
  border:1px solid #dedede;
  padding:10px;
  font-size: 16px;
  background:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==) no-repeat 8px 10px;
  padding-left: 36px;
  color:#666;
}
/* 优化日期输入框 start */
.flex{
  width:100%;
  height:100%;
}
.flex input{
  border:none;
  background: transparent;
  display: block;
  width:100%;
  height:44px;
  text-align: center;
}
/* 优化日期输入框 start */

/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease-in-out;
}
.fade-enter,.fade-leave-active{
  opacity: 0;
  transform: translateY(-10px);

}

/*下拉框*/
.calendar-dropdown{
  background: rgba(0,0,0,.5);
  position: absolute;
  left:0;
  top:0;
  border: 1px solid #eee;
  border-radius: 2px;
  /*控制日期表格显示的宽度=100%*/
  width:100%;
  height:800px;
}
/*弹出框*/
.calendar-dialog{
  position: absolute;
  left:0;
  top:0;
  right:0;
  bottom:0;
}

.calendar-dialog-mask{
  background:rgba(255,255,255,.5);
  width:100%;
  height:100%;
}

.calendar-dialog-body{
  background: #fff;
  position: absolute;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  padding:20px;
  border: 1px solid #eee;
  border-radius: 2px;
}
/* 日历控件 style end */

  /*日历按钮*/
.van-button{
  width:100px;
  height: 40px;
  text-align: center;
  line-height: 30px;
  margin-left: 3px;
  float: left;
}
</style>
