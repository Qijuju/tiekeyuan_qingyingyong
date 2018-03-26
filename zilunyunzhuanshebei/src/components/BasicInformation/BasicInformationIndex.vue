<template>
  <div class="basic-information-search">
    <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" >-->
      <div class="basic-information-search-header" >
        <!--<van-nav-bar-->
          <!--title="自轮运转设备基础信息"-->
          <!--@click-left="onClickLeft"-->
          <!--@click-right="onClickRight">-->
          <!--<van-icon name="arrow-left" slot="left" />-->
          <!--<van-icon name="arrow" slot="right" />-->
        <!--</van-nav-bar>-->
        <van-nav-bar title="自轮运转设备基础信息"></van-nav-bar>
      </div>
      <div class="basic-information-search-search" @click="toSearch" >
        <van-search placeholder="搜索"/>
      </div>
      <div v-waterfall-lower="loadMore" waterfall-disabled="allLoaded">
        <el-table
          :data="baseInfoList"
          style="width: 200%;Z-index:9999"
          row-key="id"
          :expand-row-keys="expands"
          @row-click="handleRowHandle"
          height="528"
        >
          <el-table-column
            fixed
            prop="hgzbh"
            label="合格证编号"
            width="135">
          </el-table-column>
          <el-table-column
            prop="sbxh"
            label="设备型号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="jcsj"
            label="上道日期"
            width="120">
          </el-table-column>
          <el-table-column
            prop="syts"
            label="剩余天数"
            width="80">
          </el-table-column>
          <el-table-column
            prop="sbmc"
            label="设备名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="xmmc"
            label="项目名称"
            width="200">
          </el-table-column>
          <!--<el-table-column
            prop="id"
            label="项目id"
            width="0"
          >
          </el-table-column>-->
        </el-table>
      </div>
    <!--</mt-loadmore>-->
  </div>

</template>

<script>

    import { NavBar,Search,Toast,Waterfall } from 'vant'
    import axios from 'axios';

    export default {
      name: "basic-information-index",
      components: {
      },
      directives: {
        WaterfallLower: Waterfall('lower'),
      },
      data() {
        return {
          //初始化参数
          baseuserid:this._GLOBAL.baseUserId,
          xmmc:'',
          xmgljg:'',
          sbxh:'',
          sbmc:'',
          hgzbh:'',
          ksrq:'',
          jsrq:'',

          count:0,
          page:1,
          allLoaded:false,
          isLoading: false,
          baseInfoList: [],
          num:0,
          expands: []
        }
      },
      /*created(){
        this.getBaseInfo(1)
      },*/
      /*mounted: function() {
        this.getBaseInfo(1)
      },*/
      watch: {
        $route: function (to, from) {
          // debugger
          if(to.path=='/BasicInformation/BasicInformationIndex'){
            var data = to.query;
            if(!this.isEmptyObject(data)){
              this.xmmc=data.xmmc
              this.xmgljg=data.xmgljg
              this.sbxh=data.sbxh
              this.sbmc=data.sbmc
              this.hgzbh=data.hgzbh
              this.ksrq=data.ksrq
              this.jsrq=data.jsrq
            }
            this.allLoaded=false
            this.page=1
            this.baseInfoList=[]
            /*this.loadMore()*/
          }
          /*this.getBaseInfo(1)*/
        },
      },
      methods: {
        isEmptyObject(e) {
          var t;
          for (t in e)
            return !1;
          return !0
        },
        toSearch(){
          this.$router.push({path: '/BasicInformation/BasicInformationSearch'});
        },
        onClickLeft() {
          this.$router.push({path: '/Index'});
        },
        onClickRight() {
          this.$router.push({path: '/OperationCondition/OperationConditionIndex'});
        },
        loadTop(){
          var page=this.page
          if(page>1){
            this.page=page-1
            var url='http://tljjgxt.r93535.com/ZlyzsbBaseInfoListServlet?baseuserid='+this.baseuserid+'&type=1&page='+this.page
            Axios.get(url).then(response => {
              // debugger
                var data= response.data.data
                this.baseInfoList=[]
                for(var i in data) {
                  this.baseInfoList.push(data[i])
                }
                //this.page=this.page+1
                this.count = response.count
                if(page*10>this.count){
                  this.allLoaded=true
                }
              }).catch(err => {
              console.error(err.message)
            })
          }else{
            Toast('已经是第一页了');
          }
        },
        loadBottom(){
          var page=this.page
          this.num=this.num+1
          if(this.num>1){
            if(!(this.allLoaded)){
              this.page=page+1
              var url='http://tljjgxt.r93535.com/ZlyzsbBaseInfoListServlet?baseuserid='+this.baseuserid+'&type=1&page='+this.page
              axios.get(url)
                .then(response => {
                  var data= response.data.data
                  this.baseInfoList=[]
                  for(var i in data) {
                    this.baseInfoList.push(data[i])
                  }
                  //this.page=this.page+1
                  this.count = response.count
                  if(page*10>this.count){
                    this.allLoaded=true
                  }
                }).catch(err => {
                console.error(err.message)
              })
            }else{
              Toast('已经是最后一页了');
            }
          }
        },
        loadMore(){
          var page=this.page
          if(!(this.allLoaded)){
            var url='http://tljjgxt.r93535.com/ZlyzsbBaseInfoListServlet?baseuserid='+this.baseuserid+'&type=1&page='+this.page+'&xmmc='+this.xmmc+'&xmgljg='+this.xmgljg+'&sbxh='+this.sbxh+'&sbmc='+this.sbmc+'&hgzbh='+this.hgzbh+'&ksrq='+this.ksrq+'&jsrq='+this.jsrq
            console.log(url)
            axios.get(url)
              .then(response => {
                var data= response.data.data
                /*this.baseInfoList=[]*/
                for(var i in data) {
                  this.baseInfoList.push(data[i])
                }
                //this.page=this.page+1
                this.count = response.count
                if(page*10>this.count){
                  this.allLoaded=true
                }
                this.page=page+1
              }).catch(err => {
              console.error(err.message)
            })
          }else{
            Toast('已经是最后一页了');
          }
        },
        getBaseInfo(page){
          var url='http://tljjgxt.r93535.com/ZlyzsbBaseInfoListServlet?baseuserid='+this.baseuserid+'&type=1&page='+page+'&xmmc='+this.xmmc+'&xmgljg='+this.xmgljg+'&sbxh='+this.sbxh+'&sbmc='+this.sbmc+'&hgzbh='+this.hgzbh+'&ksrq='+this.ksrq+'&jsrq='+this.jsrq
          axios.get(url)
            .then(response => {
              var data= response.data.data
              this.baseInfoList=[]
              for(var i in data) {
                this.baseInfoList.push(data[i])
              }
              //this.page=this.page+1
              this.count = response.count
              if(page*10>this.count){
                this.allLoaded=true
              }
            }).catch(err => {
            console.error(err.message)
          })
        },
        handleRowHandle(row, event, column) {
          this.$router.push({path: '/BasicInformation/BasicInformationDetail/'+row.id});
        }
      }
    }
</script>

<style scoped>
  .van-search{
    padding: 0px 0px
  }
  .van-field .van-cell__title {
    width: 100%;
    position: absolute;
    top: 10px;
    left: 15px;
  }
  .van-field .van-cell__value {
    width: 100%;
    padding-left: 90px;
  }

  /*修改的样式*/

</style>
