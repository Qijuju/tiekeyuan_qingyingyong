<template>
  <!--<van-tabbar v-model="active">-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/SiteDynamic">动态</van-tabbar-item>-->
    <!--&lt;!&ndash; <van-tabbar-item icon="home" to="/Index">首页</van-tabbar-item> &ndash;&gt;-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/SignIn">签到</van-tabbar-item>-->
    <!--<van-tabbar-item icon="pending-evaluate" to="/SiteStatistical">统计</van-tabbar-item>-->
  <!--</van-tabbar>-->
  <div class="tabbar">
    <van-tabbar v-model="active" android:name=".activity.MainActivity" android:windowSoftInputMode="stateVisible|adjustPan">
      <van-tabbar-item icon="shop" to="/SiteDynamic">
        <span>动态</span>
        <template slot="icon" slot-scope="props" >
          <img src="../../assets/images/sgrjhImages/homeg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/home.png" v-else="">
        </template>
      </van-tabbar-item>
      <van-tabbar-item icon="shop" to="/SignIn">
        <span>签到</span>
        <template slot="icon" slot-scope="props">
          <img src="../../assets/images/sgrjhImages/qdg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/qd.png" v-else="">
        </template>
      </van-tabbar-item>

      <van-tabbar-item icon="shop" to="/SiteStatistical">
        <span>统计</span>
        <template slot="icon" slot-scope="props">
          <img src="../../assets/images/sgrjhImages/tjg.png" alt="" v-if="props.active">
          <img src="../../assets/images/sgrjhImages/tj.png" v-else="">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
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
