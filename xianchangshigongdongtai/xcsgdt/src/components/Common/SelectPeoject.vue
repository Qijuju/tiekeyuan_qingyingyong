<template>
  <div class="selectProject">
    <div id="wrapProject">
      <div id="innerWrapProject">
        <div class="scrollProject" v-for="item in projects" @click="changeItem($event)">
          {{item.xmmc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script >
  import { Button } from 'vant';
  import $ from 'jquery'

  // 文档加载完成后设置元素的宽度
  $(function () {
    var screenW = $(window).width(); // 获取屏幕的宽度
    var w=130*7;
    $("#wrapProject").width(screenW);// 设置外层盒子宽度==屏幕宽度
    $("#innerWrapProject").width(w+'px');// 根据现实个数设置innerWrap的宽度
  })

  export default {
    props:{
      projects: Array ,//这样可以指定传入的类型，如果类型不对，会警告
      count:Number
    },
    name: "selectProject",
    components: {
      Button
    },
    data(){
      return{
        show:false,
        proCount:this.count
      }
    },
    methods: {
      changeItem(e) { // 点击项目的触发函数
//        console.log("项目点击事件触发了吗"+$(e.target).index());
        $(e.target).addClass("bg").siblings().removeClass("bg");
      }
    }
  }
</script>

<style scoped>
  #wrapProject{
    position: relative;
    top: 0px;
    left:0;
    /*width:100%;*/
    height:100px;
    margin:0 auto;
    overflow: scroll;
    z-index: 99;
    overflow: scroll;
    background: #E5F2FA;
  }
  #innerWrapProject{
    height:100%;
  }
  #innerWrapProject .scrollProject{
    float: left;
    width:120px;
    height:90px;
    text-align: center;
    margin:0 5px;
    padding:5px;
    border-radius:10px;
    color: #fff;
    background: #59C13A
  }
  #innerWrapProject .scrollProject.bg{
    background-color: #FF4A58;
  }
  /* 隐藏滚动条 */
  ::-webkit-scrollbar{
    display:none;
  }
</style>
