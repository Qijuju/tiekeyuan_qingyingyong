<template>
  <div class="1">
    <!-- 安全风险管理待我审批筛选-表头-开始 -->
    <van-nav-bar title="待我审批" left-text="返回" right-text="关闭"  @click-right="onClickRight"  @click-left="$router.go(-1)">
    </van-nav-bar>
    <!-- 安全风险管理待我审批筛选-表头-结束 -->
    <!-- 安全风险管理待我审批筛选-类型标题 -->
    <h1 class="van-doc-demo-section__title">类型</h1>

    <!-- 施安全风险管理待我审批筛选-选择条件-开始 -->
    <button class="van-button van-button--default van-button--normal" @click="onClickSearch('1')">
      <span class="van-button__text">自轮运转设备基础信息</span>
    </button>
    <br/>
    <!-- 安全风险管理待我审批筛选-选择条件-结束 -->
  </div>
</template>

<script>
  import {Toast} from 'vant';
  import Vue from 'vue';
  import axios from 'axios';
  import bus from '../bus';

  export default {
    methods: {
      // 表头返回按钮事件
      onClickLeft() {
        // Toast('返回');
        this.$router.push({path: '/ToDoWork'});
      },
      // 表头关闭按钮事件
      onClickRight(){
        RPM.closeApplication();
      },
      //
      onClickSearch(data) {
        var typeId = '';
        //向待我审批页面展示-传递流程类型id 变量名van-button--normal
        //流程类型id
        if (data != null && data == '1') {
          typeId = '54';
        }  else {
          typeId = '';
        }
        bus.$emit('van-button--normal-toDoWork', typeId)
        this.$router.push({path: '/ToDoWork'});
      },

    }
  };
</script>

<style scoped>
  /* 设置头部 style start */
  .van-nav-bar {
    background: #2196F3;
    color: #fff;
  }

  .van-nav-bar .van-icon {
    color: #fff;
  }

  /* 设置头部 style end */
  /* 安全风险管理待我审批筛选-选择条件-样式 */
  .van-button--default {
    margin: 10px 0px 0px 10px;
  }

  /* 安全风险管理待我审批筛选-类型标题-样式 */
  h1 {
    /*font: 1.0em sans-serif;*/
    font: 0.9em sans-serif;
    margin: 10px 0px 0px 20px;
  }
</style>
