<template>
  <div class="1">
    <!-- 施工日计划我已审批列表-表头-开始 -->
    <div class = "biaotou">
      <van-nav-bar title="我已审批" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="arrow-left" slot="left" />
        <van-icon name="close" slot="right" />
      </van-nav-bar>
      <!-- 施工日计划我已审批列表-表头-结束 -->
      <!-- 施工日计划我已审批列表-搜索筛选框-开始 -->
      <van-row>
        <van-col span="12">
          <van-button bottom-action @click="ToDoWorkSearch()"><van-icon name="search" />     搜索</van-button>
        </van-col>
        <van-col span="12">
          <van-button bottom-action @click="ToDoWorkScreen()"><van-icon name="search" />     筛选</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 施工日计划我已审批列表-搜索筛选框-结束 -->

    <!-- 施工日计划我已审批列表-list展示数据-开始 --><!-- 代办流程名称 -->
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <div class="neirong">
      <table v-for="(plan, index) in DoWorkflowList" class="tablelist" @click="toDetail(plan.url)">
        <tr><td style="width:20%">流程标题:</td><td style="width:80%"><span v-html="plan.requestName"></span></td></tr>
          <tr><td style="width:20%">流程类型:</td><td style="width:80%"><span v-html="plan.workflowName"></span></td></tr>
          <tr><td style="width:20%">流程状态:</td><td style="width:80%"><span v-html="plan.currentNodeName"></span></td></tr>
      </table>
      </div>
    </v-scroll>
    <!-- 施工日计划我已审批列表-list展示数据-结束 -->
  </div>
</template>

<script>
import { Waterfall } from 'vant';
import Vue from 'vue';
import axios from 'axios';
import bus from '../bus';
import Scroll from '../Common/PullRefresh';  //引入上拉加载，下拉刷新的插件

// 施工日计划我已审批列表-迭代动态数据-开始
export default {
  name: "DoWork",
    components: {
      'v-scroll': Scroll
    },
  data() {
    return {
      counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num : 10,  // 一次显示多少条
      pageStart : 0, // 开始页数
      pageEnd : 0, // 结束页数

      count:10,//存放展示条数
      DoWorkflowCount:[],//存放获取待办流程条数
      DoWorkflowList:[],//存放获取待办流程列表
      requestName:'',//流程名称
      baseuserId:'',//基础平台用户id
      pageNo:'1',//页数
      workflowTypeId:'18',//流程分类id  15代表施工日计划
      pageSize:'10',//每页条数
      workflowId:'59',//流程类型id  51营业线 52临近营业线 53非营业线
      status:'1', // 0审批中 ，1审批完成
      disabled: false

    };
  },

//打开页面是调用此方法，获取代办流程列表数据
  mounted: function() {
      // // 施工日计划待我审批搜索-获取流程名称值
      //   bus.$on('v-model',data=> {
      //     this.workflowId = data;
      //      this.GetDoWorkflowList();
      //   });
      // //施工日计划待我审批筛选-获取流程类型id
      // bus.$on('van-button--normal',data=> {
      //   this.workflowId = data;
      //    this.GetDoWorkflowList();
      //   });
        this.GetDoWorkflowList();
      },

  methods: {
    // 表头返回按钮事件
    onClickLeft() {
      this.$router.push({path: '/NonBusinessLine'});
        // Toast('返回');
      },
    // 表头关闭按钮事件
      onClickRight() {
        this.$router.push({path: '/NonBusinessLine'});
        // Toast('关闭');
      },
  toDetail(url){
      alert(url);
    bus.$emit('detailUrl',url);
    this.$router.push({path: '/DoWorkSearch'});
  },
    // 点击搜索按钮跳转到搜索页面
  ToDoWorkSearch(){
    this.$router.push({path: '/DoWorkSearch'});
  },
  // 点击筛选按钮跳转到筛选页面
  ToDoWorkScreen(){
    this.$router.push({path: '/DoWorkScreen'});
  },

// 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
    GetDoWorkflowList(){
      // debugger
      this.baseuserId=236807;
      debugger
      /*if(this.status != null && this.status == '1'){//审批完成
        var url = 'http://whjjgc.r93535.com/YiDoWorkflowListPCServlet?baseuserId='+this.baseuserId+'&pageNo='+this.pageNo+'&workflowTypeId='+this.workflowTypeId+'&pageSize='+this.pageSize+'&workflowId='+this.workflowId+'&requestName='+this.requestName
      }else{//审批中
        var url = 'http://whjjgc.r93535.com/DoWorkflowListPCServlet?baseuserId='+this.baseuserId+'&pageNo='+this.pageNo+'&workflowTypeId='+this.workflowTypeId+'&pageSize='+this.pageSize+'&workflowId='+this.workflowId+'&requestName='+this.requestName
      }*/
      // var url = 'http://whjjgc.r93535.com/GetToDoWorkflowList?baseuserId=102300&pageNo=1&workflowTypeId=18&pageSize=100&workflowId=59&requestName=';
      var url = 'http://tljjgxt.r93535.com/GetToDoWorkflowList?baseuserId=102300&pageNo=1&workflowTypeId=18&pageSize=100&workflowId=59&requestName=';
      // alert(url);
      console.log(url);
        axios.get(url)
          .then(response => {
            var data = response.data
            for(var i in data) {
              console.log(data[i].requestId)
              this.DoWorkflowList.push(data[i])
            }
            console.log(response.data)
            console.log(this.DoWorkflowList)
          }).catch(err => {
          console.error(err.message)
        })
      },

//下拉页面刷新数据操作
      onRefresh(done) {
        // debugger
        // 获取代办流程列表数据-拼接url，发送请求获取待办流程列表数据
        this.GetDoWorkflowList();
        done() // call done
      },

//上拉页面加载更多数据操作
      onInfinite(done) {
        // debugger
        let vm = this;
        this.baseuserId=236807;
        this.pageNo = 1;
        if(status != null && status == '1'){//审批完成
          // var url = 'http://whjjgc.r93535.com/YiDoWorkflowListPCServlet?baseuserId='+this.baseuserId+'&pageNo='+this.pageNo+'&workflowTypeId='+this.workflowTypeId+'&pageSize='+this.pageSize+'&workflowId='+this.workflowId+'&requestName='+this.requestName
          var url = 'http://tljjgxt.r93535.com/YiDoWorkflowListPCServlet?baseuserId='+this.baseuserId+'&pageNo='+this.pageNo+'&workflowTypeId='+this.workflowTypeId+'&pageSize='+this.pageSize+'&workflowId='+this.workflowId+'&requestName='+this.requestName
        }else{//审批中
          // var url = 'http://whjjgc.r93535.com/DoWorkflowListPCServlet?baseuserId='+this.baseuserId+'&pageNo='+this.pageNo+'&workflowTypeId='+this.workflowTypeId+'&pageSize='+this.pageSize+'&workflowId='+this.workflowId+'&requestName='+this.requestName
          var url = 'http://tljjgxt.r93535.com/DoWorkflowListPCServlet?baseuserId='+this.baseuserId+'&pageNo='+this.pageNo+'&workflowTypeId='+this.workflowTypeId+'&pageSize='+this.pageSize+'&workflowId='+this.workflowId+'&requestName='+this.requestName
        }
        vm.$http.get(url).then((response) => {
          // debugger
          vm.counter++;
          vm.pageEnd = vm.num * vm.counter;
          vm.pageStart = vm.pageEnd - vm.num;
          let arr = response.data;
          if(arr!==''&&arr!==null&&arr!==undefined){
            for(var i=0;i<arr.length;i++){
              vm.DoWorkflowList.push();
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
/* 标题样式 */
.van-nav-bar{
  background-color: #e5f2fa;
}
/* 筛选标题样式 */
.van-button--bottom-action{
  top:-3px;
}
/* 列表展示样式 */
.yo-scroll{
  top:1.8rem;
}
/* 施工日计划我已审批列表-搜索筛选框-字体样式 */
/* .van-col-12 {
  font-size: 0px;
} */
/* 施工日计划我已审批列表-搜索筛选框-背景颜色 */
.van-button--bottom-action {
  color:#000;
  background-color: #c9c9c9;
}
/*  施工日计划我已审批列表-代办列表信息-table样式 */
/* html5 list页面的中间table标签样式  */
.tablelist{
  width:100%;border-collapse:collapse;border:1px solid #efeff4; margin-top: 3px;background-color: #efeff4;}
.tablelist td{
  padding:6px 6px 3px 4px;font:Arial, Helvetica, sans-serif;text-align:left;}
.tablelist th{
  padding:6px 6px 3px 4px;font:Arial, Helvetica, sans-serif;text-align:left;}
</style>
