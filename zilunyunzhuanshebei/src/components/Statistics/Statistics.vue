<template>
  <div class="statistics">
   <h1>统计</h1>
    <button @click="textCommit">按钮提交</button>
    <A></A>
    <B></B>
  </div>
</template>

<script>
  import A from '../Common/A'
  import B from '../Common/B'
  export default{
    name:'statistics',
    data(){
      return {
        testArr:'1'
      }
    },
    components:{
      A,B
    },
    methods: {
      increment () {
        this.count++
      },
      textCommit(){
        this.$store.commit('setBusinessLineSearch',{xmmc:'aaaaaaa'})
      }
    },
    created:function () {
      this.$store.commit('setBusinessLineSearch',{xmmc:'1234'})
      console.log("获取父组件的值22："+this.$store.getters.businessLineSearch.xmmc);

    }
  }
</script>

<style>

</style>
