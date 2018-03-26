<template>
  <div class="1">

 <!-- 安全风险管理我已审批筛选-表头-开始 -->
    <van-nav-bar title="我已审批" right-text="关闭"  @click-right="onClickRight" left-text="返回" @click-left="$router.go(-1)">
    </van-nav-bar>
<!-- 安全风险管理我已审批筛选-表头-结束 -->

<!-- 安全风险管理我已审批筛选-状态标题 -->
  <h1 class="van-doc-demo-section__title">状态</h1>

<!-- 安全风险管理我已审批筛选-选择条件-开始 -->
   <button class="van-button van-button--default van-button--normal" @click="onClickStatus('0')">
     <span class="van-button__text">审批中</span>
   </button>
   <button class="van-button van-button--default van-button--normal" @click="onClickStatus('1')">
     <span class="van-button__text">审批完成</span>
   </button><br/>
<!-- 安全风险管理我已审批筛选-选择条件-结束 -->

<!-- 安全风险管理我已审批筛选-类型标题 -->
  <h1 class="van-doc-demo-section__title">类型</h1>

<!-- 安全风险管理我已审批筛选-选择条件-开始 -->
    <van-radio-group v-model="workflowId">
      <van-cell-group>
        <van-cell><van-radio name="54">自轮运转设备基础信息</van-radio></van-cell>
      </van-cell-group>
    </van-radio-group>
<!-- 安全风险管理我已审批筛选-选择条件-结束 -->

  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import bus from '../bus';

export default {
    data() {
      return {
        workflowId:'54',
      }
    },
   methods: {

     // 表头返回按钮事件
    onClickLeft() {
        // Toast('返回');
        this.$router.push({path: '/DoWork'});
      },

    // 表头关闭按钮事件
     onClickRight(){
       RPM.closeApplication();
     },

    //  点击审批状态事件
    onClickStatus(data){
      //向我已审批页面展示-传递流程类型id 变量名van-button--normal
        bus.$emit('van-button--normal-zt-DoWork',data)
        this.$router.push({path: '/DoWork'});
      },

     //
     onClickSearch(data){
      var typeId = '';
      //向我已审批页页面展示-传递流程类型id 变量名van-button--normal
      //流程类型id  51营业线 52临近营业线 53非营业线
        if(data != null && data == '1'){
          typeId = '54';
        }else{
          typeId = '';
        }
        bus.$emit('van-button--normal-DoWork',typeId)
        this.$router.push({path: '/DoWork'});
      },

   }
};
</script>

<style scoped>
/* 安全风险管理我已审批筛选-选择条件-样式 */
 .van-button--default {
margin: 10px 0px 0px 10px;
}
/* 安全风险管理我已审批筛选-类型标题-样式 */
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
