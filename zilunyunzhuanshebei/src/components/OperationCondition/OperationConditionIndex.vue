<template>
  <div>
  <div class="basic-information-search-header" style="z-index: 9999">
    <van-nav-bar
      title="自轮运转设备运行情况"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-icon name="arrow-left" slot="left" />
      <van-icon name="arrow" slot="right" />
    </van-nav-bar>
  </div>
  <div class="basic-information-search-search"  @click="toSearch" style="z-index: 9999">
    <van-search placeholder="搜索"/>
  </div>
    <el-container style="height: 360px; border: 1px solid #eee">
   <el-header style="height: 40px; border: 1px solid #eee">
  <el-row justify="space-around">
    <el-col :span="6">合格证编号</el-col>
    <el-col :span="5">设备型号</el-col>
    <el-col :span="11">设备名称</el-col>
    <!--<el-col :span="7">项目名称</el-col>-->
    <!--<el-col :span="1"></el-col>-->
  </el-row>
   </el-header>
      <el-main style="height: 320px; border: 1px solid #eee">
  <el-collapse accordion v-model="activeNames" @change="handleChange">
    <el-collapse-item v-for="(yxqk,index1) in yxqklist">
      <template slot="title">
        <el-row justify="space-around">
          <el-col :span="6">{{yxqk.hgzbh}}</el-col>
          <el-col :span="5">{{yxqk.sbxh}}</el-col>
          <el-col :span="11">{{yxqk.sbmc}}</el-col>
          <!--<el-col :span="7">{{yxqk.xmmc}}</el-col>-->
          <!--<el-col :span="1"></el-col>-->
        </el-row>
      </template>
      <div><el-table
        :data="zlyzsbYxqkList[index1]"
        @row-click="handleRowHandle"
      >
        <!--<el-table-column
          prop="id"
          label="ID"
        ></el-table-column>-->
        <el-table-column
          fixed
          prop="sdsj"
          label="上道日期"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="yxsc"
          label="运行时长"
          width="150"
          >
        </el-table-column>
        <el-table-column
          label="车辆作业地点"
          width="150">
        </el-table-column>
      </el-table>
        <div v-show="hasnext(zlyzsbYxqkList[index1])"><!--因为上线时间，暂时屏蔽查看更多记录功能
        <div v-show="false">-->
          <van-button size="large" type="primary" style="z-index: 100000" @click="getHistory(yxqk.hgzbh,yxqk.id,yxqk.xmmc,yxqk.sbxh,yxqk.sbmc)">查看更多记录</van-button></div>
        </div>
    </el-collapse-item>
  </el-collapse>
      </el-main>
    </el-container>
    <div @click="save()" v-show="createstatus">
    <mt-palette-button content="+" @expand="" @expanded="" @collapse=""
                       direction="rt" class="pb" :radius="80" ref="target_1" mainButtonStyle="color:#fff;background-color:#26a2ff;"
                       style="right:32px;">
      <div class="my-icon-button indexicon icon-popup" @touchstart="sub_log(1)"></div>
    </mt-palette-button>
    </div>
  </div>
</template>

<script>
  import { NavBar,Search,Toast,Waterfall,Badge } from 'vant'
  import axios from 'axios';
  import ElHeader from "element-ui/packages/header/src/main";
  export default {
    components: {ElHeader},
    name: "operation-condition-index",
    data() {
      return {
        page:1,
        allLoaded:false,
        count:0,
        createstatus:false,
        hgzlist:[],
        yxqklist:[],
        zlyzsbYxqkList:[],
        xmgljg:'',
        xmmc:'',
        sbxh:'',
        sbmc:'',
        hgzbh:'',
        clzydd:'',
        ksrq:'',
        jsrq:'',
        activeNames: ['1'],
        tableData: []
      }
    },
    created(){
      this.allLoaded=false
      this.page=1
      this.hgzlist=[]
      this.yxqklist=[]
      this.zlyzsbYxqkList=[]
      this.loadMore()
    },
    watch: {
      $route: function (to, from) {

        if(to.path=='/OperationCondition/OperationConditionIndex'){
          var data = to.query;
          if(!this.isEmptyObject(data)){
            this.xmmc=data.xmmc
            this.xmgljg=data.xmgljg
            this.sbxh=data.sbxh
            this.sbmc=data.sbmc
            this.hgzbh=data.hgzbh
            this.ksrq=data.ksrq
            this.jsrq=data.jsrq
            this.clzydd=data.clzydd
          }
          this.allLoaded=false
          this.page=1
          this.hgzlist=[]
          this.yxqklist=[]
          this.zlyzsbYxqkList=[]
          this.loadMore()
        }
      },
    },
    methods: {
      save() {
        this.$router.push({path: '/OperationCondition/OperationConditionSave'});
      },
      handleChange(val) {

        console.log(val);
      },
      isEmptyObject(e) {
        var t;
        for (t in e)
          return !1;
        return !0
      },
      toSearch(){
        this.$router.push({path: '/OperationCondition/OperationConditionSearch'});
      },
      onClickLeft() {
        this.$router.push({path: '/BasicInformation/BasicInformationIndex'});
      },
      onClickRight() {
        this.$router.push({path: '/Index'});
        /*Toast('运行情况');*/
      },
      loadMore(){
        var url='http://tljjgxt.r93535.com/ZlyzsbBaseInfoListServlet?baseuserid='+this._GLOBAL.baseUserId+'&page='+this.page+'&type=1&xmmc='+this.xmmc+'&sbmc='+this.sbmc+'&sbxh='+this.sbxh+'&hgzbh='+this.hgzbh+'&clzydd='+this.clzydd+'&kssj='+this.ksrq+'&jssj='+this.jsrq
        console.log(url)
        axios.get(url)
            .then(response => {
              var data= response.data.data
              if(data.createstatus==='1'){
                this.createstatus=true
              }else{
                this.createstatus=false
              }
              /*调试用*/
              this.createstatus=true
              for(var i in data) {
                this.yxqklist.push(data[i])
                this.hgzlist.push(data[i].id)
              }
              //this.page=this.page+1
              this.count = response.data.count
              if(this.page*10>this.count){
                this.allLoaded=true
              }
              this.page=this.page+1
              if(!this.allLoaded){
                this.loadMore()
              }else{
                this.getyxqkList(this.hgzlist)
              }
            }).catch(err => {
            console.error(err.message)
          })
      },
      getyxqkList(list){
        if(list.length>0){
          var url='http://tljjgxt.r93535.com/ZlyzsbYxqkListServlet?page=1&hgzbh='+list.shift()
          axios.get(url)
            .then(response => {
              var data= response.data.data
              this.zlyzsbYxqkList.push(data)
              console.log(this.zlyzsbYxqkList)
              this.getyxqkList(list)
            }).catch(err => {
            console.error(err.message)
          })
        }
      },
      handleRowHandle(row, event, column) {
        var id=row.id
        var query={
          id:id
        }
        this.$router.push({path: '/OperationCondition/OperationConditionDetail',query});
      },
      getHistory(hgzbh,id,xmmc,sbxh,sbmc){
        // debugger
        var query={
          hgzbh:hgzbh,
          id:id,
          xmmc:xmmc,
          sbxh:sbxh,
          sbmc:sbmc
        }
        this.$router.push({path: '/OperationCondition/OperationConditionHistory',query});
      },
      hasnext(row){
        if(!this.isEmptyObject(row)&&row.length>1){
          return true
        }else{
          return false
        }
      }
    }
  }
</script>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .van-search{
    padding: 0px 0px
  }
  .mint-palette-button{
    position: fixed;
  }
  .el-row {
    height: 40px;
    line-height: 40px;
    color: #303133;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    -webkit-transition: border-bottom-color .3s;
    transition: border-bottom-color .3s;
    outline: 0;
  }

  /*修改运行情况表格*/
  .el-main{
    padding-top: 0;
    margin-top: -1px;
  }
  .el-main .el-collapse-item{
    /*padding: 0 20px;*/
    /*border-bottom: 1px solid #ccc;*/
  }
</style>
