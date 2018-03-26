<template>
  <div class="nonBusinessLine">
    <HeaderTest></HeaderTest>
    <van-row>
      <van-col span="8" @click="todowork">
        <img src="../../assets/images/sgrjhImages/dsp.png" alt="" @click="todowork()">
        <p @click="todowork()">待我审批</p>
      </van-col>
      <van-col span="8">
        <img src="../../assets/images/sgrjhImages/ysp.png" alt="" @click="dowork()">
        <p @click="dowork()">我已审批</p>
      </van-col>
      <van-col span="8">
        <img src="../../assets/images/sgrjhImages/fqd.png" alt="" @click="icrate()">
        <p @click="icrate()">我发起的</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import HeaderTest from '../Common/HeaderTest'
export default {
  name: 'nonBusinessLine',// 和组件名称保持一致，只不过是小写的
  data () {
    return {

    }
  },
  components:{
    HeaderTest
  },
  methods:{
    todowork(){
      //跳转到待我审批页面展示
        this.$router.push({path: '/ToDoWork'});
      },
    dowork(){
    //跳转到我已审批页面展示
      this.$router.push({path: '/DoWork'});
    },
    icrate(){
    //跳转到我已审批页面展示
      this.$router.push({path: '/ICreate'});
    }
  }
}
</script>

<style scoped>
  img{
    width:50px;
    height:50px;
  }
  p{
    width:100%;
    height:48px;
    text-align: center;
    line-height:48px;
  }

</style>
