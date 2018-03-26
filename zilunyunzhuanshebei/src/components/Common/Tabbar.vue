<template>
  <!--<van-tabbar v-model="active">-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/Index">首页</van-tabbar-item>-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/BasicInformation/BasicInformationIndex">基础信息</van-tabbar-item>-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/OperationCondition/OperationConditionIndex">运行情况</van-tabbar-item>-->
    <!--&lt;!&ndash;<van-tabbar-item icon="pending-evaluate" to="/Test/TestInterface">开工标准化</van-tabbar-item>-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/Test/SGRJHInterface">施工日计划</van-tabbar-item>&ndash;&gt;-->
  <!--</van-tabbar>-->

    <van-tabbar v-model="active" android:name=".activity.MainActivity" android:windowSoftInputMode="stateVisible|adjustPan">
      <van-tabbar-item icon="shop" to="/Index">
        <span>首页</span>
        <template slot="icon" slot-scope="props" >
          <img src="../../assets/images/sgrjhImages/homeg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/home.png" v-else="">
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shop" to="/BasicInformation/BasicInformationIndex">
        <span>基础信息</span>
        <template slot="icon" slot-scope="props">
          <img src="../../assets/images/sgrjhImages/jcxxg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/jcxx.png" v-else="">
        </template>
      </van-tabbar-item>

      <van-tabbar-item icon="shop" to="/OperationCondition/OperationConditionIndex">
        <span>运行情况</span>
        <template slot="icon" slot-scope="props">
          <img src="../../assets/images/sgrjhImages/yxqkg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/yxqk.png" v-else="">
        </template>
      </van-tabbar-item>
    </van-tabbar>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant';
    export default {
      name: "Tabbar",
      data() {
        return {
          active: 0,
          icon: {
            normal: '//img.yzcdn.cn/1.png',
            active: '//img.yzcdn.cn/2.png'
          }
        }
      }
    }
</script>

<style scoped>
  .van-tabbar{
    z-index: 8;
  }

</style>
