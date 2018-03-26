<template>
  <div class="1">
  <!-- 安全风险管理我发起的列表-表头-开始 -->
  <van-nav-bar title="我发起的" right-text="关闭"  @click-right="onClickRight" left-text="返回" @click-left="$router.go(-1)">
  </van-nav-bar>
  <!-- 安全风险管理我已审批列表-表头-结束 -->
<!-- 安全风险管理我发起的筛选-类型标题 -->
  <h1 class="van-doc-demo-section__title">类型</h1>

<!-- 安全风险管理我发起的筛选-选择条件-开始 -->
    <button class="van-button van-button--default van-button--normal" @click="onClickSearch('1')">
      <span class="van-button__text">自轮运转设备基础信息</span>
    </button>
    <br/>
<!-- 安全风险管理我发起的筛选-选择条件-结束 -->
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import bus from '../bus';

export default {
   methods: {
     // 表头返回按钮事件
    onClickLeft() {
        // Toast('返回');
        this.$router.push({path: '/ICreate'});
      },
    // 表头关闭按钮事件
     onClickRight(){
       RPM.closeApplication();
     },
     //
     onClickSearch(data){
      var typeId = '';
      //向我发起的页面展示-传递流程类型id 变量名van-button--normal
      //流程类型id
        if(data != null && data == '1'){
          typeId = '54';
        }else{
          typeId = '';
        }
        bus.$emit('van-button--normal-ICreate',typeId)
        this.$router.push({path: '/ICreate'});
      },

   }
};
</script>

<style scoped>
/* 安全风险管理我发起的筛选-选择条件-样式 */
 .van-button--default {
margin: 10px 0px 0px 10px;
}
/* 安全风险管理我发起的筛选-类型标题-样式 */
 h1{
   /*font: 0.4em sans-serif;*/
   font: 0.9em sans-serif;
   margin: 10px 0px 0px 20px;
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
</style>
