<template>
  <div class="1">
    <!-- 安全风险管理我发起的列表-表头-开始 -->
    <div class = "biaotou">
      <van-nav-bar title="我发起的" right-text="关闭"  @click-right="onClickRight" left-text="返回" @click-left="$router.go(-1)">
      </van-nav-bar>
      <!-- 安全风险管理我已审批列表-表头-结束 -->
      <!-- 安全风险管理我发起的列表-搜索筛选框-开始 -->
      <van-row>
        <van-col span="12">
          <van-button bottom-action @click="ToICreateSearch()" class="todoWorkSearch">
            <!--<van-icon name="search" />-->
            <img class="seachimg" v-if="searchTab1" src="../../assets/images/sgrjhImages/searchg.png" alt="searchLogo">
            <img class="seachimg" v-else="false" src="../../assets/images/sgrjhImages/search.png" alt="searchLogo">
            搜索</van-button>
        </van-col>
        <van-col span="12">
          <van-button bottom-action @click="ToICreateScreen()" class="todoWorkScreen">
            <!--<van-icon name="search" />-->
            <img class="seachimg" v-if="searchTab2" src="../../assets/images/sgrjhImages/sxg.png" alt="searchLogo">
            <img class="seachimg" v-else="false" src="../../assets/images/sgrjhImages/sx.png" alt="searchLogo">
            筛选</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 安全风险管理我发起的列表-搜索筛选框-结束 -->

    <!-- 安全风险管理我发起的列表-list展示数据-开始 --><!-- 代办流程名称 -->
     <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <table v-for="(plan, index) in ICreateflowList" class="tablelist" @click="toDetail(plan.url)">
            <tr><td style="width:20%">流程标题:</td><td style="width:80%">{{plan.requestName }}</td></tr>
            <tr><td style="width:20%">流程类型:</td><td style="width:80%">{{plan.workflowName }}</td></tr>
            <tr><td style="width:20%">流程状态:</td><td style="width:80%">{{plan.currentNodeName }}</td></tr>
        </table>
      </v-scroll>
    <!--<iframe  style="margin-top:46px;width:100%;height:1000px;display:none" src="http://tljjgxt.r93535.com:89/verifyLogin.do?loginid=419448de-aaa3-44d4-99b8-8002a5efe029"></iframe>-->
    <!-- 安全风险管理我发起的列表-list展示数据-结束 -->
  </div>
</template>

<script>
import { Waterfall } from 'vant';
import Vue from 'vue';
import axios from 'axios';
import bus from '../bus';
import Scroll from '../Common/PullRefresh';  //引入上拉加载，下拉刷新的插件

// 安全风险管理我发起的列表-迭代动态数据-开始
export default {
  name: "ICreate",
    components: {
      'v-scroll': Scroll
    },
  data() {
    return {
      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 10,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数

      count:0,//存放展示条数
      //ICreateflowCount:[],//存放获取待办流程条数
      ICreateflowList:[],//存放获取待办流程列表
      requestName:'',//流程名称
      userId:this._GLOBAL.baseUserId,//基础平台用户id
      pageNo:'1',//页数
      workflowTypeId:this._GLOBAL.workflowTypeId,//流程分类id
      pageSize:'10',//每页条数
      workflowId:this._GLOBAL.workflowId,//流程类型id
      disabled: false,
      searchTab1:false,
      searchTab2:false,
    };
  },

//打开页面是调用此方法，获取代办流程列表数据
  mounted: function() {
  // 安全风险管理我发起的搜索-获取流程名称值
      this.GetOnSearch();
   //安全风险管理我发起的筛选-获取流程类型id
      this.GetOnClickSgrjh();
  //  刷新页面加载初始化数据
        this.GetICreateflowList();
      },

  methods: {
    toDetail(url){
      var query={
        url:url
      }
      this.$router.push({path:'/Index/Detail',query:query});
    },
    // 表头返回按钮事件
    onClickLeft() {
        this.$router.push({path: '/Index'});
        // Toast('返回');
      },
    // 表头关闭按钮事件
    onClickRight(){
      RPM.closeApplication();
    },

// 点击搜索按钮跳转到搜索页面
  ToICreateSearch(){
    this.searchTab1 = true;
    this.searchTab2 = false;
    $(".todoWorkSearch").css("color","rgb(0, 135, 232)");
    $(".todoWorkScreen").css("color","rgb(0,0,0)");
    this.$router.push({path: '/ICreateSearch'});
  },
  // 点击筛选按钮跳转到筛选页面
  ToICreateScreen(){
    this.searchTab1 = false;
    this.searchTab2 = true;
    $(".todoWorkSearch").css("color","rgb(0, 0, 0)");
    $(".todoWorkScreen").css("color","rgb(0, 135, 232)");
    this.$router.push({path: '/ICreateScreen'});
  },

  // 获取点击搜索按钮跳转事件的值
  GetOnSearch(){
      //我发起的页面展示-传递流程名称 变量名为v-model
     bus.$on('v-model-ICreate',data=> {
      this.requestName = data;
      // alert('onSearchName===='+data);
       this.ICreateflowList = []
      this.GetICreateflowList();
     });
    },

 //
    GetOnClickSgrjh(){
      //获取我发起的页面展示-传递流程类型id 变量名van-button--normal
      bus.$on('van-button--normal-ICreate',data=> {
        this.workflowId = data;
        // alert('workflowId===='+data);
        this.ICreateflowList = []
        this.GetICreateflowList();
      });
    },

// GetToDoWorkflowCount(data) {
//           //debugger
//           this.xmmc=data.xmmc
//           this.dj=data.dj
//           this.xingbie=data.xingbie
//           this.sglc=data.sglc
//           this.sglx=data.sglx
//           this.sgksrq=data.startDay
//           this.sgjsrq=data.endDay
//           var url='http://tljjgxt.r93535.com/MyWorkflowRequestList?userId=236807&workflowTypeId=18&workflowId=59'
//           axios.get(url)
//             .then(response => {
//               //debugger
//               this.ToDoWorkflowCount  = response.data
//             }).catch(err => {
//             console.error(err.message)
//           })
//         },

// 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
    GetICreateflowList(){
        var url = 'http://tljjgxt.r93535.com/MyWorkflowRequestList?userId='+this.userId+'&pageNo='+this.pageNo+'&workflowTypeId='+this.workflowTypeId+'&pageSize='+this.pageSize+'&workflowId='+this.workflowId+'&requestName='+this.requestName
        axios.get(url)
          .then(response => {
            var data = response.data
            for(var i in data) {
              console.log(data[i].requestId)
              this.ICreateflowList.push(data[i])
            }
            console.log(response.data)
            console.log(this.ICreateflowList)
          }).catch(err => {
          console.error(err.message)
        })
      },

//下拉页面刷新数据操作
      onRefresh(done) {
        // 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
        this.GetICreateflowList();
        done() // call done
      },

//上拉页面加载更多数据操作
      onInfinite(done) {
        let vm = this;
        this.pageNo = 1;
        var url = 'http://tljjgxt.r93535.com/MyWorkflowRequestList?userId='+this.userId+'&pageNo='+this.pageNo+'&workflowTypeId='+this.workflowTypeId+'&pageSize='+this.pageSize+'&workflowId='+this.workflowId+'&requestName='+this.requestName
        vm.$http.get(url).then((response) => {
          vm.counter++;
          vm.pageEnd = vm.num * vm.counter;
          vm.pageStart = vm.pageEnd - vm.num;
          let arr = response.data;
          if(arr!==''&&arr!==null&&arr!==undefined){
            for(var i=0;i<arr.length;i++){
              vm.ICreateflowList.push();
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

/* 设置头部 style start */
.van-nav-bar{
  background: #2196F3;
  color: #fff;
}
.van-nav-bar .van-icon{
  color: #fff;
}
/* 设置头部 style end */

/* 筛选标题样式 */
.van-button--bottom-action{
  top:-3px;
}
/* 列表展示样式 */
.yo-scroll{
  top:1.8rem;
}
/* 施工日计划我发起的列表-搜索筛选框-字体样式 */
/* .van-col-12 {
  font-size: 0px;
} */
/* 施工日计划我发起的列表-搜索筛选框-背景颜色 */
.van-button--bottom-action {
  color:#000;
  /*background-color: #c9c9c9;*/
  background-color: rgb(229, 242, 250);
}
/*  施工日计划我发起的列表-代办列表信息-table样式 */
/* html5 list页面的中间table标签样式  */
.tablelist{
  /*width:100%;*/
  border-collapse:collapse;
  border:1px solid #efeff4;
  margin-top: 3px;
  /*background-color: #efeff4;*/
  /*修改列表内容区域样式*/
  width: 95%;
  margin: 10px;
  border-radius: 4px;
  padding: 5px;
  -webkit-box-shadow: 0px 0px 5px 1px #ccc;
  box-shadow: 0px 0px 5px 1px #ccc;
}
.tablelist td{
  padding:6px 6px 3px 4px;text-align:left;}
.tablelist th{
  padding:6px 6px 3px 4px;text-align:left;}
/*修改施工日计划搜索和筛选的样式*/
.van-col-12 button{
  border: 1px solid #ccc;
}
.van-button--bottom-action{
  height: 44px;
  line-height: 44px;
}
.seachimg{
  width: 20px;
  height: 20px;
}
</style>
