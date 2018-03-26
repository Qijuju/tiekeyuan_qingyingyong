<script src="../../../node_modules/vant/lib/datetime-picker/index.js"></script>
<template>
  <div id="search">
  <van-nav-bar
    title="营业线施工日计划搜索"
    left-text="取消"
    right-text="搜索"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
  </van-nav-bar>
    <van-row>
    <van-col span="8">
      <h4>项目名称</h4>
    </van-col>
    <van-col span="16">
      <van-picker :columns="xmcolumns" @change="onXMChange"
                  visible-item-count=1 v-bind:xmmc="xmmc"
      />
    </van-col>
    </van-row>
    <van-row>
    <van-col span="8">
      <h4>等级</h4>
    </van-col>
    <van-col span="16">
      <van-picker :columns="djcolumns" @change="onDJChange"
        visible-item-count=1 v-bind:dj="dj"
      />
    </van-col>
    </van-row>
    <van-row>
    <van-col span="8">
      <h4>行别</h4>
    </van-col>
    <van-col span="16">
      <van-picker :columns="xbcolumns" @change="onXBChange"
        visible-item-count=1 v-bind:xingbie="xingbie"
      />
    </van-col>
    </van-row>
    <van-row>
    <van-col span="8">
      <h4>施工类型</h4>
    </van-col>
    <van-col span="16">
      <van-picker :columns="sgcolumns" @change="onSGChange"
        visible-item-count=1 v-bind:sglc="sglx"
      />
    </van-col>
    </van-row>
    <van-row>
    <van-col span="8">
      <h4>施工里程</h4>
    </van-col>
    <van-col span="16">
      <van-field
        type="text"
        placeholder="请输入施工里程"
        v-model="sglc"
        rows=1
        autosize
      />
    </van-col>
    </van-row>
    <van-row>
      <van-col span="8">
        <h4>开始日期</h4>
      </van-col>
      <van-col span="16">
       {{ startDay }}
        <van-button size="mini" @click="startPicker()">开始日期</van-button>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="8">
        <h4>结束日期</h4>
      </van-col>
      <van-col span="16">
        {{ endDay }}
        <van-button size="mini" @click="endPicker()">结束日期</van-button>
      </van-col>
    </van-row>
      <van-row v-show="showStartPicker">
        <van-col>
          <van-datetime-picker
            v-model="startDate"
            type="date"
            visible-item-count=3
            @confirm="startConfirm()"
            @cancel="startCancel()"
          />
        </van-col>
      </van-row>
    <van-row v-show="showEndPicker">
        <van-col>
          <van-datetime-picker
            v-model="endDate"
            type="date"
            visible-item-count=3
            @confirm="endConfirm()"
            @cancel="endCancel()"
          />
        </van-col>
      </van-row>
  </div>
</template>

<script>
  import { NavBar,Field,Picker,Radio,Toast,DatetimePicker  } from 'vant';
  import Vue from 'vue';
  import axios from 'axios';
  import bus from '../bus'
  export default {
    name: "BSearch",
    components: {
      NavBar,Field,Picker,Radio,Toast,DatetimePicker
    },
    data() {
      return {
        showStartPicker:false,
        showEndPicker:false,
        isActive:false,
        show: false,
        areaIndex: 0,
        xmcolumns:['不限'],
        djcolumns:['不限','I','II','III'],
        xbcolumns:['不限','上行','下行','上下行','单线','站内','站内上行','站内下行'],
        sgcolumns:['不限','封锁','慢行','封锁+慢行','接触网停电','信号','其他','封锁+停电'],
        xiangmuServlet:[],
        xmmc:'',
        dj:'',
        xingbie:'',
        sglx:'',
        sglc:'',
        startDate:new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        endDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        startDay: new Date().getFullYear()+(new Date().getMonth()>=9?"-":"-0")+(new Date().getMonth()+1)+"-01",
        endDay: new Date().getFullYear()+(new Date().getMonth()>=9?"-":"-0")+(new Date().getMonth()+1)+(new Date().getDate()>=9?"-":"-0")+new Date().getDate()
      };
    },
    mounted: function() {
      this.getXiangmuServlet();
    },
    methods: {
      onClick(item) {
        Toast(item.name);
      },
      onChange(picker, value, index) {
        Toast(`当前值：${value}, 当前索引：${index}`);
      },
      onDJChange(picker, value, index) {
        if(index!=0){
          this.dj=(index-1)
        }
        console.log(this.dj)
       // Toast(`当前值：${value}, 当前索引：${index}`);
      },
      onXBChange(picker, value, index) {
        if(index!=0){
          this.xingbie=(index-1)
        }
        console.log(this.xingbie)
       // Toast(`当前值：${value}, 当前索引：${index}`);
      },
      onSGChange(picker, value, index) {
        if(index!=0){
          this.sglx=(index-1)
        }
        console.log(this.sglx)
       // Toast(`当前值：${value}, 当前索引：${index}`);
      },
      onXMChange(picker, value, index) {
          var temp=value
          var data = this.xiangmuServlet
          for(var i in data) {
            if(data[i].xmmc==temp){

              this.xmmc=data[i].id
            }
          }
      },
      onClickLeft() {
        this.$router.push({path: '/Test'});
        Toast('返回');
      },
      onClickRight() {

        /*console.log(this.xmmc)
        console.log(this.dj)
        console.log(this.xingbie)
        console.log(this.sglx)
        console.log(this.startDay)
        console.log(this.endDay)*/
        bus.$emit('get-day-plan-detail',this)
        this.$router.push({path: '/BusinessLine/DayPlanDetail'});
        //Toast('按钮');
      },
     /* onConfirm(value, index) {
        Toast(`当前值：${value}, 当前索引：${index}`);
      },
      onCancel() {
        Toast('取消');
      },*/
      startPicker(){
          this.showEndPicker = false,
          this.showStartPicker = !this.showStartPicker
      },
      endPicker(){
        this.showStartPicker = false,
        this.showEndPicker = !this.showEndPicker
      },
      getCurrentMonthFirst(){
        var date=new Date();
        date.setDate(1);
        return date;
      },
      startConfirm(){
        //Toast(`当前值：`+this.startDate);
        debugger
        this.startDay = this.startDate.getFullYear()+(this.startDate.getMonth()>=9?"-":"-0")+(this.startDate.getMonth()+1)+(this.startDate.getDate()>9?"-":"-0")+this.startDate.getDate(),
        this.showStartPicker = false
      },
      startCancel(){
        this.showStartPicker = false
      },
      endConfirm(){
        //Toast(`当前值：`+this.startDate);
        debugger
        this.endDay = this.endDate.getFullYear()+(this.endDate.getMonth()>=9?"-":"-0")+(this.endDate.getMonth()+1)+(this.endDate.getDate()>9?"-":"-0")+this.endDate.getDate(),
        this.showEndPicker = false
      },
      endCancel(){
        this.showEndPicker = false
      },
      getXiangmuServlet(){
        // axios.get('http://whjjgc.r93535.com/XiangmuServlet?orgid=265')
        axios.get('http://tljjgxt.r93535.com/XiangmuServlet?orgid=265')
          .then(response => {
            this.xiangmuServlet = response.data
            var data = this.xiangmuServlet
            for(var i in data) {
              console.log(data[i].id)
              console.log(data[i].xmmc)
              this.xmcolumns.push(data[i].xmmc)
            }
            console.log(response.data)
            console.log(this.xiangmuServlet)
            console.log(this.xmcolumns)
          }).catch(err => {
          console.error(err.message)
        })
      }
    }
  }
</script>

<style scoped>
  .van-col{
    height:44px;
    text-align: center;
    line-height: 44px;
  }
  .van-picker{
    position: fixed;
    width: 100%;
  }
  .van-picker-column {
    font-size: 14px;
    text-align: left;
  }
</style>
