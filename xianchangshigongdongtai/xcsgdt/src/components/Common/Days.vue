<template>
  <div class="days">
    <div id="wrap">
      <div id="innerWrap">
        <div class="scroll" v-for="(item ,index) in days2" @click="dayClick(index)">
          <p class="dateDetail">
            <span class="num">{{item.day}}</span>
            <span class="china">{{item.weekDay}}</span>
          </p>
          <p class="dateDetail">
            <span class="china">{{item.monthDay}}</span>
          </p>
          <p class="scrollBar bg" v-if="item.showBg"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
  import { Button } from 'vant';
  import $ from 'jquery'

    export default {
      name: "days",
      components: {
        Button
      },
      data(){
        return{
          show:false,
          days:[],
          projectCount:0,
          year:0,
          month:0,
          day:0
        }
      },
      computed:{
        days2() {
          return this.$store.getters.daysObj// 时时获取变化的数据
        }
      },
      methods:{
        // 点击事件
        dayClick(index) {
          var screenW = $(window).width(); // 获取屏幕的宽度
          var w=this.days.length*66;
          var maxScrollD=screenW-w;
          $("#wrap").width(screenW);// 设置外层盒子宽度==屏幕宽度
          $("#innerWrap").width(w+'px');// 根据现实个数设置innerWrap的宽度

          // 1.获取触屏的位置
          var e=e||window.event;
          var touchPosition=e.pageX; // 触点位置为：距离屏幕最左边的距离

          var leftD=$('#innerWrap').offset().left-(touchPosition-parseInt(screenW/2));

          $("#innerWrap").offset({top:90,left:leftD}); // 设置innerWrap的左偏移量

          if ($('#innerWrap').offset().left >0){
            $("#innerWrap").offset({top:90,left:0});
          }

          if ($('#innerWrap').offset().left < maxScrollD){
            $("#innerWrap").offset({top:90,left:maxScrollD});
          }

          // 选中的添加滑条，其他的删除滑条
          for(var i=0;i<this.days.length;i++){
            this.days[i].showBg = i===index?true:false;
          }
        },
        getParams(){
          this.days=this.$store.getters.daysObj // 获取store中的变量值
        }
      },
      mounted:function () {
       this.getParams();
      }
    }
</script>

<style scoped>
  #wrap{
    position: relative;
    top: 0px;
    left:0;
    /*width:100%;*/
    height:46px;
    margin:0 auto;
    overflow: scroll;
    z-index: 99;
    overflow: scroll;
    background: #E5F2FA;
  }
  #innerWrap{
    position: absolute;
    height:100%;
  }
  #innerWrap .scroll{
    position: relative;
    display: inline-block;
    width:66px;
    height:44px;
    text-align: left;
    line-height:44px;
  }
  #innerWrap .scroll:first-child{
    margin-left:0px;
  }
  #innerWrap .scroll > .daysList{
    display: inline-block;
    color: #2196F3;
    width:56px;
    height:100%;
  }
  p.dateDetail{
    width:100%;
    height:22px;
    text-align: center;
    line-height:22px;
    padding:3px;
    color: #2196F3;
  }
  p.dateDetail > .num{
    font-size:16px;
  }
  p.dateDetail > .china{
    font-size:12px;
  }
  /* 隐藏滚动条 */
  ::-webkit-scrollbar{
    display:none;
  }
  #innerWrap .scroll .bg{
    position: absolute;
    left:0;
    bottom:-2px;
    width:100%;
    height:2px;
    background: #2196F3;
  }

</style>
