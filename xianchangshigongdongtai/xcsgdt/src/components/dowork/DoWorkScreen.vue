<template>
  <div class="1">

 <!-- 施工日计划我已审批筛选-表头-开始 -->
    <van-nav-bar title="我已审批" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="arrow-left" slot="left" />
      <van-icon name="close" slot="right" />
    </van-nav-bar>
<!-- 施工日计划我已审批筛选-表头-结束 -->

<!-- 施工日计划我已审批筛选-状态标题 -->
  <h1 class="van-doc-demo-section__title">状态</h1>

<!-- 施工日计划我已审批筛选-选择条件-开始 -->
   <button class="van-button van-button--default van-button--normal" @click="onClickSpz()">
     <span class="van-button__text">审批中</span>
   </button>
   <button class="van-button van-button--default van-button--normal" @click="onClickSpwc()">
     <span class="van-button__text">审批完成</span>
   </button><br/>
<!-- 施工日计划我已审批筛选-选择条件-结束 -->

<!-- 施工日计划我已审批筛选-类型标题 -->
  <h1 class="van-doc-demo-section__title">类型</h1>

<!-- 施工日计划我已审批筛选-选择条件-开始 -->
   <button class="van-button van-button--default van-button--normal" @click="onClickAll()">
     <span class="van-button__text">全部</span>
   </button><br/>
   <button class="van-button van-button--default van-button--normal" @click="onClickYyx()">
     <span class="van-button__text">营业线施工日计划</span>
   </button><br/>
   <button class="van-button van-button--default van-button--normal" @click="onClickLjyyx()">
     <span class="van-button__text">邻近营业线施工日计划</span>
   </button><br/>
   <button class="van-button van-button--default van-button--normal" @click="onClickFyyx()">
     <span class="van-button__text" >非营业线施工日计划</span>
   </button>
<!-- 施工日计划我已审批筛选-选择条件-结束 -->

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
        this.$router.push({path: '/DoWork'});
      },
    // 表头关闭按钮事件
      onClickRight() {
        this.$router.push({path: '/DoWork'});
      },
    //  点击审批中事件
    onClickSpz(){
      //向我已审批页面展示-传递流程类型id 变量名van-button--normal
        bus.$emit('van-button--normal-zt','')
        this.$router.push({path: '/DoWork'});
      },
    //  点击审批完成事件
    onClickSpwc(){
      //向我已审批页面展示-传递流程类型id 变量名van-button--normal
        bus.$emit('van-button--normal-zt','')
        this.$router.push({path: '/DoWork'});
      },
    //  点击全部跳转事件
    onClickAll(){
      //向我已审批页面展示-传递流程类型id 变量名van-button--normal
        bus.$emit('van-button--normal','')
        this.$router.push({path: '/DoWork'});
      },
    //  点击营业线施工日计划跳转事件
    onClickYyx(){
      //向我已审批页面展示-传递流程类型id 变量名van-button--normal
      bus.$emit('van-button--normal','51')
      this.$router.push({path: '/DoWork'});
    },
    //  点击邻近营业线施工日计划跳转事件
     onClickLjyyx(){
      //向我已审批页面展示-传递流程类型id 变量名van-button--normal
      bus.$emit('van-button--normal','52')
      this.$router.push({path: '/DoWork'});
    },
    //  点击非营业线施工日计划事件
     onClickFyyx(){
      //向我已审批页面展示-传递流程类型id 变量名van-button--normal
      bus.$emit('van-button--normal','53')
      this.$router.push({path: '/DoWork'});
    }

   }
};
</script>

<style scoped>
/* 施工日计划我已审批筛选-选择条件-样式 */
 .van-button--default {
margin: 10px 0px 0px 10px;
}
/* 施工日计划我已审批筛选-类型标题-样式 */
 h1{
   font: 0.4em sans-serif;
   margin: 10px 0px 0px 20px;
 }
</style>
